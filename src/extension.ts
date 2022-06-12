import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "o-relative-path" is now active!');

  let disposable = vscode.commands.registerCommand('o-relative-path.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from o-relative-path!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
