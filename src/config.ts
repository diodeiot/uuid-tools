import * as vscode from "vscode";

export type UUIDVersion = "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7";

export type Config = {
    uuid_version: UUIDVersion
    v2: {
        domain?: string
        identifier?: string
    }
    v3: {
        namespace?: string
        name?: string
    }
    v5: {
        namespace?: string
        name?: string
    }
};

export function getConfig(): Config {
    const c = vscode.workspace.getConfiguration("uuid-tools");
    const config: Config = {
        uuid_version: c.get("uuid-version") as UUIDVersion,
        v2: {
            domain: c.get("v2.domain") as string,
            identifier: c.get("v2.identifier") as string,
        },
        v3: {
            namespace: c.get("v3.namespace") as string,
            name: c.get("v3.name") as string,
        },
        v5: {
            namespace: c.get("v5.namespace") as string,
            name: c.get("v5.name") as string,
        }
    };
    return config;
}