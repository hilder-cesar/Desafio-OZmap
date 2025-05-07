import { Repository } from 'typeorm';
import { AppDataSource } from '../config/dataSource';
import { EntityMap, EntityType } from '../entities/EntityMap';

export class EntityMapRepo {
  private repo: Repository<EntityMap> = AppDataSource.getRepository(EntityMap);

  findByIspId(ispId: string) {
    return this.repo.findOne({ where: { ispId } });
  }

  saveMap(p: { ispId: string; ozmapId: string; type: EntityType; hash: string }) {
    return this.repo.save({ ispId: p.ispId, ozmapId: p.ozmapId, type: p.type, lastHash: p.hash });
  }
}