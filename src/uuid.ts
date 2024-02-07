import z from "zod";
import * as uuid from "uuid";
import * as uuidwv6 from "uuid-with-v6";
import { uuidv7 } from "uuidv7";
const Aekatva = require('@logmedaily/aekatva');

export const NAMESPACE_DNS = "6BA7B810-9DAD-11D1-80B4-00C04FD430C8";
export const NAMESPACE_URL = "6BA7B811-9DAD-11D1-80B4-00C04FD430C8";
export const NAMESPACE_ISO_OID = "6BA7B812-9DAD-11D1-80B4-00C04FD430C8";
export const NAMESPACE_X500_DN = "6BA7B814-9DAD-11D1-80B4-00C04FD430C8";

export const REGEXP = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;

export const UUIDSchema = z
    .string()
    .trim()
    .toUpperCase()
    .uuid();

export const UUIDNamespaceSchema = UUIDSchema;

export const UUIDName = z
    .string();

export function uuidNil(): string {
    return uuid.NIL;
}

export function uuidv1gen(): string {
    return uuid.v1().toUpperCase();
}

export function uuidv2gen(domain: any, identifier: any): string {
    return new Aekatva().uuid_v2(domain, identifier).toUpperCase();
}

export function uuidv3gen(namepace: string, name: string): string {
    return uuid.v3(name, namepace).toUpperCase();
}

export function uuidv4gen(): string {
    return uuid.v4().toUpperCase();
}

export function uuidv5gen(namepace: string, name: string): string {
    return uuid.v5(name, namepace).toUpperCase();
}

export function uuidv6gen(): string {
    return uuidwv6.v6().toUpperCase();
}

export function uuidv7gen(): string {
    return uuidv7().toUpperCase();
}

export function uuid2Hex(uuid: string): string {
    uuid = uuid.toUpperCase();
    return uuid.replaceAll("-", "");
}