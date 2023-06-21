import { cwd } from "node:process";
import path from "path";
import fs from "fs";

const getFile = (file) => {
    const absolutePath = path.resolve(cwd(), "./__fixtures__", `./${file}`);
    const result = fs.readFileSync(absolutePath, "utf8");
    return result;
  };

export default getFile;