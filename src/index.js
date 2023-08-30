import {downloadXMLFile} from "./downloadXMLFileModule.js";
import {takeBuffer} from "./takeBuffer.js";
import {parseData} from "./parseXMLFileModule.js";

const url = "http://www.cbr.ru/vfs/mcirabis/BIKNew/20230830ED01OSBR.zip";

const buffer = await takeBuffer(url);

downloadXMLFile(buffer);

console.log(parseData());














