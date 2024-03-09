import Database, {IDatabase} from '../database/database.js';

export interface IBaseRepository {
  save(domain: any): void;
}

export class BaseRepository implements IBaseRepository {
  protected fileName: string;
  protected db: IDatabase;
  constructor(fileName: string) {
    this.fileName = fileName;
    this.db = Database.Instance;
  }
  save(domain: any): void {
    throw new Error('Method not implemented.');
  }
}
