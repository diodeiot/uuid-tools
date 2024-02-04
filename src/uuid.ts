import { randomUUID } from "crypto";
import z from "zod";

export const UUIDSchema = z
    .string()
    .trim()
    .toUpperCase()
    .uuid();

export function uuidgen(): string {
    return randomUUID().toString().toUpperCase();
}

export function valid(uuid: string): string {
    return UUIDSchema.parse(uuid);
}

export function uuid2Hex(uuid: string): string {
    uuid = uuid.toUpperCase();
    return uuid.replaceAll("-", "");
}