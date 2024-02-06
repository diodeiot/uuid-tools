import * as vscode from "vscode";

import * as UUID from "./uuid";
import { getConfig } from "./config";

type NameSpaceTarget = "v3" | "v5";
type NameTarget = NameSpaceTarget;

export function activate(context: vscode.ExtensionContext) {
	console.log("activated");

	const getDomain = async () => {
		const config = getConfig();
		if (config.v2.domain != null) {
			return config.v2.domain;
		}

		const domain = vscode.window.showInputBox({
			title: "Domain",
			prompt: "Enter Domain",
			placeHolder: "Enter domain",
			validateInput: (value: string) => {
				return null;
			}
		});

		return domain;
	};

	const getIdentifier = async () => {
		const config = getConfig();
		if (config.v2.identifier != null) {
			return config.v2.identifier;
		}

		const domain = vscode.window.showInputBox({
			title: "Identifier",
			prompt: "Enter Identifier",
			placeHolder: "Enter identifier",
			validateInput: (value: string) => {
				return null;
			}
		});

		return domain;
	};

	const getUUIDNamespace = async (target: NameSpaceTarget) => {
		const config = getConfig();
		try {
			if (target === "v3") {
				return UUID.UUIDNamespaceSchema.parse(config.v3.namespace);
			}
			else if (target === "v5") {
				return UUID.UUIDNamespaceSchema.parse(config.v5.namespace);
			}
		}
		catch (error) {
		}

		const ret = await vscode.window.showQuickPick([
			{
				label: "DNS",
				description: UUID.NAMESPACE_DNS.toLowerCase(),
			},
			{
				label: "URL",
				description: UUID.NAMESPACE_URL.toLowerCase(),
			},
			{
				label: "ISO OID",
				description: UUID.NAMESPACE_ISO_OID.toLowerCase(),
			},
			{
				label: "X.500 DN",
				description: UUID.NAMESPACE_X500_DN.toLowerCase(),
			},
			{
				label: "Custom",
				description: "specify custom namespace",
			},
		], {
			title: "Namespace",
			placeHolder: "Select a namespace",
			canPickMany: false,
		});
		console.log("selected namespace=", ret);
		if (ret == null) {
			return ret;
		}

		try {
			return UUID.UUIDNamespaceSchema.parse(ret.description);
		}
		catch (error) {
		}

		const custom_namespace = vscode.window.showInputBox({
			title: "Custom Namespace",
			prompt: "Enter custom namespace",
			placeHolder: "Enter custom namespace",
			validateInput: (value: string) => {
				try {
					UUID.UUIDNamespaceSchema.parse(value);
				} catch (error) {
					return "invalid namepace";
				}
				return null;
			}
		});

		return custom_namespace;
	};

	const getUUIDName = async (target: NameTarget) => {
		const config = getConfig();
		try {
			if (target === "v3") {
				return UUID.UUIDName.parse(config.v3.name);
			}
			else if (target === "v5") {
				return UUID.UUIDName.parse(config.v5.name);
			}
		}
		catch (error) {
		}

		const custom_namespace = vscode.window.showInputBox({
			title: "UUID Name",
			prompt: "Enter UUID name",
			placeHolder: "Enter UUID name",
			validateInput: (value: string) => {
				try {
					UUID.UUIDName.parse(value);
				} catch (error) {
					return "invalid UUID name";
				}
				return null;
			}
		});

		return custom_namespace;
	};

	const placeUUID = (uuid: string) => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(editBuilder => {
				const selection = editor.selection;
				if (selection.isEmpty) {
					editBuilder.insert(editor.selection.start, uuid);
				}
				else {
					editBuilder.replace(selection, uuid);
				}
			});
		}
		else {
			console.warn("edit not found");
		}
	};

	const uuidv1genHandler = () => {
		const uuid = UUID.uuidv1gen();
		console.log("uuidv1gen: uuid=", uuid);
		placeUUID(uuid);
	};

	const uuidv2genHandler = async () => {
		const domain = await getDomain();
		if (domain == null) {
			return;
		}

		const identifier = await getIdentifier();
		if (identifier == null) {
			return;
		}

		const uuid = UUID.uuidv2gen(domain, identifier);
		console.log("uuidv2gen: uuid=", uuid);
		placeUUID(uuid);
	};

	const uuidv3genHandler = async () => {
		const namespace = await getUUIDNamespace("v3");
		if (namespace == null) {
			return;
		}
		const name = await getUUIDName("v3");
		if (name == null) {
			return;
		}
		const uuid = UUID.uuidv3gen(namespace, name);
		console.log("uuidv3gen: namespace=", namespace, "name=", name, "uuid=", uuid);
		placeUUID(uuid);
	};

	const uuidv4genHandler = () => {
		const uuid = UUID.uuidv4gen();
		console.log("uuidv4gen: uuid=", uuid);
		placeUUID(uuid);
	};

	const uuidv5genHandler = async () => {
		const namespace = await getUUIDNamespace("v5");
		if (namespace == null) {
			return;
		}
		const name = await getUUIDName("v5");
		if (name == null) {
			return;
		}
		const uuid = UUID.uuidv5gen(namespace, name);
		console.log("uuidv5gen: namespace=", namespace, "name=", name, "uuid=", uuid);
		placeUUID(uuid);
	};

	const uuidv6genHandler = () => {
		const uuid = UUID.uuidv6gen();
		console.log("uuidv6gen: uuid=", uuid);
		placeUUID(uuid);
	};

	const uuidv7genHandler = () => {
		const uuid = UUID.uuidv7gen();
		console.log("uuidv7gen: uuid=", uuid);
		placeUUID(uuid);
	};

	const uuidgenHandler = () => {
		const config = getConfig();
		if (config.uuid_version === "v1") {
			uuidv1genHandler();
		}
		else if (config.uuid_version === "v2") {
			uuidv2genHandler();
		}
		else if (config.uuid_version === "v3") {
			uuidv3genHandler();
		}
		else if (config.uuid_version === "v4") {
			uuidv4genHandler();
		}
		else if (config.uuid_version === "v5") {
			uuidv5genHandler();
		}
		else if (config.uuid_version === "v6") {
			uuidv6genHandler();
		}
		else if (config.uuid_version === "v7") {
			uuidv7genHandler();
		}
	};

	const extractUUID = (str: string) => {
		str = str.trim();
		if (str.startsWith("\"") || str.startsWith("\'")) {
			str = str.slice(1);
		}
		if (str.endsWith("\"") || str.endsWith("\'")) {
			str = str.slice(0, str.length - 1);
		}
		str = str.trim();
		return UUID.UUIDSchema.parse(str);
	};

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuidNilGen", () => {
		const uuid = UUID.uuidNil();
		console.log("uuidNilGen: uuid=", uuid);
		placeUUID(uuid);
	}));

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuidv1gen", uuidv1genHandler));

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuidv2gen", uuidv2genHandler));

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuidv3gen", uuidv3genHandler));

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuidv4gen", uuidv4genHandler));

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuidv5gen", uuidv5genHandler));

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuidv6gen", uuidv6genHandler));

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuidv7gen", uuidv7genHandler));

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuidgen", uuidgenHandler));

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuid2hex", () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			console.log("selected text=\"", selectedText, "\"");
			editor.edit(editBuilder => {
				if (selection.isEmpty) {
					vscode.window.showErrorMessage("please select an uuid");
					return;
				}

				let uuid;
				try {
					uuid = extractUUID(selectedText);
				} catch (error) {
					vscode.window.showErrorMessage("invalid uuid");
					return;
				}
				const hex = UUID.uuid2Hex(uuid);
				editBuilder.replace(selection, hex);
			});
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuid2arrc", () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			console.log("selected text=\"", selectedText, "\"");
			editor.edit(editBuilder => {
				if (selection.isEmpty) {
					vscode.window.showErrorMessage("please select an uuid");
					return;
				}

				let uuid;
				try {
					uuid = extractUUID(selectedText);
				} catch (error) {
					vscode.window.showErrorMessage("invalid uuid");
					return;
				}
				const hex = UUID.uuid2Hex(uuid);
				const bytes = Buffer.from(hex, "hex");

				let arrStr = "";
				bytes.forEach(b => arrStr += "0x" + b.toString(16).toUpperCase() + ", ");
				arrStr = arrStr.substring(0, arrStr.length - 2);

				editBuilder.replace(selection, arrStr);
			});
		}
	}));
}

export function deactivate() {
	console.log("deactivated");
}