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
    console.log(__dirname);
    this.dataFolderPath = path.join(__dirname, '../../../src/oop/data');
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
    console.log(readFile);
    const ID = readFile.length + 1;
    console.log(ID);
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
