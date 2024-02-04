import * as vscode from "vscode";

import * as UUID from "./uuid";

export function activate(context: vscode.ExtensionContext) {
	console.log("activated");

	context.subscriptions.push(vscode.commands.registerCommand("uuid-tools.uuidgen", () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const uuid = UUID.uuidgen();
			console.log("generated uuid=", uuid);
			editor.edit(editBuilder => {
				const uuidStr = "\"" + uuid + "\"";
				if (selection.isEmpty) {
					editBuilder.insert(editor.selection.start, uuidStr);
				}
				else {
					editBuilder.replace(selection, uuidStr);
				}
			});
		}
	}));

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
					uuid = UUID.valid(selectedText);
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
					uuid = UUID.valid(selectedText);
				} catch (error) {
					vscode.window.showErrorMessage("invalid uuid");
					return;
				}
				const hex = UUID.uuid2Hex(uuid);
				const bytes = Buffer.from(hex, "hex");

				let arrStr = "const uint8_t uuid[16]={";
				bytes.forEach(b => arrStr += "0x" + b.toString(16).toUpperCase() + ", ");
				arrStr = arrStr.substring(0, arrStr.length - 2);
				arrStr += "};";

				editBuilder.replace(selection, arrStr);
			});
		}
	}));
}

export function deactivate() {
	console.log("deactivated");
}