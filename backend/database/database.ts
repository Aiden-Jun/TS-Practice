import fs from 'fs';
import csvParser from 'csv-parser';
import * as path from 'path';

export interface IDatabase {
  readCSV<T>(filename: string): Promise<T[]>;
  appendCSV(filename: string, content: string): Promise<boolean>;
}

export default class Database implements IDatabase {
  private readonly dataFolderPath: string;

  public static instance: Database;

  private constructor() {
    const __dirname = path.resolve();
    this.dataFolderPath = path.join(__dirname, '../backend/data/');
  }

  static get Instance() {
    if (Database.instance === undefined) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  readCSV = <T>(filename: string) => {
    return new Promise<T[]>((resolve) => {
      const results: T[] = [];
      fs.createReadStream(path.join(this.dataFolderPath, filename))
        .pipe(csvParser())
        .on('data', (data: T) => {
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', () => {
          resolve([]);
        });
    });
  };
  appendCSV = async (filename: string, content: string) => {
    const readFile = await this.readCSV(filename);
    const ID = readFile.length + 1;
    return new Promise<boolean>((resolve) => {
      const fileStream = fs.createWriteStream(path.join(this.dataFolderPath, filename), {
        flags: 'a',
      });
      fileStream.write(`${ID},${content}\n`);
      fileStream.end(() => {
        resolve(true);
      });
    });
  };
}
