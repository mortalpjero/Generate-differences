import { dirname } from "path";
import path from 'path';
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = (file) => {
    const absolutePath = path.resolve(__dirname, '..', "__fixtures__", `${file}`);
    const result = fs.readFileSync(absolutePath, "utf8");
    return result;
  };

export default readFile;