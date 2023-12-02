export interface IBaseRepository {
  save(domain: any): void;
}

export class BaseRepository implements IBaseRepository {
  constructor() {}

  save(domain) {}
}
