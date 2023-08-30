import {parseData} from "./parseXMLFileModule.js";
import fetch from "node-fetch";

export async function takeBuffer(url) {
    const response = await fetch(url);
    const body = await response.buffer();
    return body;
}