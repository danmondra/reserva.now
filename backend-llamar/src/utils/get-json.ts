import path from "path";
import fs from "fs";

export const getParsedJSON = <T extends any = any>(file: string): T => JSON.parse(fs.readFileSync(path.join(process.cwd(), file), 'utf-8'));
