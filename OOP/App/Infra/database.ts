import fs from 'fs';
import csvParser from 'csv-parser';
import * as path from 'path';

export interface IDatabase {
  readCSV(filename: string): Promise<unknown>;
  writeCSV(filename: string, content: string): Promise<unknown>;
}

export default class Database implements IDatabase {
  private readonly dataFolderPath: string;

  public static instance: Database;

  private constructor() {
    this.dataFolderPath = path.join(__dirname, '../../OOP/Data');
  }

  static get Instance() {
    if (Database.instance === undefined) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  readCSV = (filename: string) => {
    return new Promise((resolve) => {
      const results: string[] = [];
      fs.createReadStream(path.join(this.dataFolderPath, filename))
        .pipe(csvParser())
        .on('data', (data: string) => results.push(data))
        .on('end', () => {
          resolve(results);
        });
    });
  };
  writeCSV = (filename: string, content: string) => {
    return new Promise((resolve) => {
      const fileStream = fs.createWriteStream(path.join(this.dataFolderPath, filename), {
        flags: 'a',
      });
      fileStream.write(`${content}\n`);
      fileStream.end(() => {
        resolve(true);
      });
    });
  };
}
