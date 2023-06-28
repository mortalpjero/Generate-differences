import { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = (file) => {
  const absolutePath = path.resolve(__dirname, '..', `${file}`);
  const result = fs.readFileSync(absolutePath, 'utf8');
  return result;
};

export default readFile;
