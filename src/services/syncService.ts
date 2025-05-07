import crypto from 'node:crypto';
import { ispClient } from '../clients/ispClient';
import { ozmapClient } from '../clients/ozmapClient';
import { EntityType } from '../entities/EntityMap';
import { logger } from '../config/logger';
import { EntityMapRepo } from '../repositories/entityMapRepo';
import { SyncMetaRepo } from '../repositories/syncMetaRepo';

const entityMapRepo = new EntityMapRepo();
const syncMetaRepo = new SyncMetaRepo();

const sha = (o: unknown) => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex');

export async function runSync(): Promise<void> {
  const lastCursor = await syncMetaRepo.getCursor();
  logger.info('sync:start', { lastCursor });

  const { data } = await ispClient.get('/');
  const promises: Promise<unknown>[] = [];

  for (const cable of data.cables) {
    const ispId = `cable:${cable.id}`;
    const hash = sha(cable);
    const existing = await entityMapRepo.findByIspId(ispId);
    if (existing?.lastHash === hash) continue; // unchanged

    const payload = {
      name: cable.name,
      capacity: cable.capacity,
      geometry: {
        type: 'LineString',
        coordinates: cable.path.map((p: any) => [p.lng, p.lat])
      }
    };

    promises.push(
      ozmapClient
        .upsertCable(payload)
        .then((res: any) => entityMapRepo.saveMap({ ispId, ozmapId: res.data.id ?? payload.name, type: EntityType.CABLE, hash }))
    );
  }

  await Promise.all(promises);
  await syncMetaRepo.setCursor(new Date());
  logger.info('sync:done');
}