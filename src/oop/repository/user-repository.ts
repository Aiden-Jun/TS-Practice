import User from '../domain/user';
import {BaseRepository} from './base-repository';

export interface IUserRepository {
  createUser(email: string, password: string, name: string, userType: string): void;
  findUserByEmail(email: string): any;
}

export class UserRepository extends BaseRepository implements IUserRepository {
  public createUser(email: string, password: string, name: string, userType: string) {
    this.db.appendCSV('users.csv', `${email},${password},${name},${userType},0`);
  }

  public async findUserByEmail(email: string) {
    const userRows = await this.db.readCSV('users.csv');
    for (let i = 0; i < userRows.length; i++) {
      let userRow = userRows[i];

      if (userRow[1] == email) {
        return this.convertUserFromRowToObject(userRow);
      }
    }
  }

  public convertUserFromRowToObject(userRow: string[]) {
    return new User(
      userRow[0],
      userRow[1],
      userRow[2],
      userRow[3],
      parseInt(userRow[4]),
      userRow[5],
    );
  }
}
