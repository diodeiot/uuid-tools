import z from "zod";
import * as uuid from "uuid";
import * as uuidwv6 from "uuid-with-v6";
import { uuidv7 } from "uuidv7";
const Aekatva = require('@logmedaily/aekatva');

export const NAMESPACE_DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
export const NAMESPACE_URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
export const NAMESPACE_ISO_OID = "6ba7b812-9dad-11d1-80b4-00c04fd430c8";
export const NAMESPACE_X500_DN = "6ba7b814-9dad-11d1-80b4-00c04fd430c8";

export const REGEXP = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;

export const UUIDSchema = z
    .string()
    .trim()
    .toLowerCase()
    .uuid();

export const UUIDNamespaceSchema = UUIDSchema;

export const UUIDName = z
    .string();

export function uuidNil(): string {
    return uuid.NIL;
}

export function uuidv1gen(): string {
    return uuid.v1();
}

export function uuidv2gen(domain: any, identifier: any): string {
    return new Aekatva().uuid_v2(domain, identifier);
}

export function uuidv3gen(namepace: string, name: string): string {
    return uuid.v3(name, namepace);
}

export function uuidv4gen(): string {
    return uuid.v4();
}

export function uuidv5gen(namepace: string, name: string): string {
    return uuid.v5(name, namepace);
}

export function uuidv6gen(): string {
    return uuidwv6.v6();
}

export function uuidv7gen(): string {
    return uuidv7();
}

export function uuid2Hex(uuid: string): string {
    return uuid.replaceAll("-", "");
}

export function fromHexBytes(str: string): string {
    const uuidStr = str.slice(0, 8) + "-" + str.slice(8, 12) + "-" + str.slice(12, 16) + "-" + str.slice(16, 20) + "-" + str.slice(20);
    return UUIDSchema.parse(uuidStr);
}

export function fromText(str: string): string[] {
    str = str.replace(/0x/gi, "");
    str = str.replace(/[^0-9a-fA-F]+/g, "");

    const matches = str.match(/[0-9a-fA-F]{32}/g) ?? [];
    let foundUUIDs: string[] = [];
    for (const match of matches) {
        try {
            const uuid = fromHexBytes(match);
            foundUUIDs.push(uuid);
        } catch (error) {
            break;
        }
    }
    return foundUUIDs;
}