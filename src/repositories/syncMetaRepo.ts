import { Repository } from 'typeorm';
import { AppDataSource } from '../config/dataSource';
import { SyncMeta } from '../entities/SyncMeta';

export class SyncMetaRepo {
  private readonly repo: Repository<SyncMeta> = AppDataSource.getRepository(SyncMeta);
  private readonly KEY = 'cursor';

  getCursor() {
    return this.repo.findOne({ where: { key: this.KEY } }).then(m => m?.lastCursor ?? null);
  }

  setCursor(date: Date) {
    return this.repo.save({ key: this.KEY, lastCursor: date });
  }
}