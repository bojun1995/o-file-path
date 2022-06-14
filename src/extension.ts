import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  var disposable = vscode.commands.registerCommand('o-relative-path.getRelativePath', function (uri) {
    if (typeof uri === 'undefined') {
      if (vscode.window.activeTextEditor) {
        uri = vscode.window.activeTextEditor.document.uri;
      }
    }
    if (!uri) {
      vscode.window.showErrorMessage('error path');
      return;
    }
    var path = vscode.workspace.asRelativePath(uri);
    path = path.replace(/\\/g, '/');
    vscode.window.showInformationMessage(path);
  });
  context.subscriptions.push(disposable);
}

export function deactivate() { }
