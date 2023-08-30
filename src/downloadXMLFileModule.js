import AdmZip from "adm-zip";
import fs from "fs";
import {fileURLToPath} from 'url';
import path from "path";
import {Buffer} from "buffer";


export function downloadXMLFile(buffer) {
    fs.writeFileSync("src/data.zip", buffer);
    const zip = new AdmZip("src/data.zip");
    zip.extractAllTo("src", true);
    fs.unlinkSync("src/data.zip")
    const xmlFile = path.dirname(fileURLToPath(import.meta.url));
    const fileName = fs.readdirSync(xmlFile)[0];
    const pathFromRename = xmlFile + "\\" + fileName;
    const newNameForXMLFile = xmlFile + "\\" + "info.xml";
    fs.rename(pathFromRename, newNameForXMLFile, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    return newNameForXMLFile;
}