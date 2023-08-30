import fs from "fs";
import path from "path";
import {fileURLToPath} from 'url';
import {XMLParser} from "fast-xml-parser";
import {Buffer} from "buffer";
import iconv from "iconv-lite";

export function parseData() {
    const xmlFile = path.dirname(fileURLToPath(import.meta.url));
    const newNameForXMLFile = xmlFile + "\\" + "info.xml";

    while(!(fs.existsSync("src/info.xml"))) {}

    let readXMLFile = fs.readFileSync(Buffer.from(newNameForXMLFile), null);

    const decodeXMLFileString = iconv.decode(readXMLFile, "cp1251").toString().replaceAll("&quot;", "'");
    const options = {
        ignoreAttributes : false
    };
    const parser = new XMLParser(options);
    let obj = parser.parse(decodeXMLFileString).ED807.BICDirectoryEntry;

    const infoArray = [];

    for(let i = 0; i < obj.length; i++) {
        if(obj[i].hasOwnProperty("Accounts")) {
            let BIC = obj[i]['@_BIC'];
            let NameP = obj[i]['ParticipantInfo']['@_NameP'];
            if(typeof obj[i].Accounts.length === "undefined") {
                let accountId = obj[i].Accounts['@_Account'];
                let finalObj = {}
                finalObj.bic = BIC;
                finalObj.name = NameP;
                finalObj.corrAccount = accountId;
                infoArray.push(finalObj);
            }else {
                for(let j = 0; j < obj[i].Accounts.length; j++) {
                    let accountId = obj[i].Accounts[j]['@_Account'];
                    let finalObj = {}
                    finalObj.bic = BIC;
                    finalObj.name = NameP;
                    finalObj.corrAccount = accountId;
                    infoArray.push(finalObj);
                }
            }
        }
    }
    fs.unlinkSync("src/info.xml");
    return infoArray;
}

