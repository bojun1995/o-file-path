import * as vscode from 'vscode'
import * as pathUtil from './pathUtil'
import * as clipboardUtil from './clipboardUtil'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('o-file-path.getAliasPath', (uri: vscode.Uri | undefined) => {
    const realUri = pathUtil.getRealPath(uri)
    clipboardUtil.writeText2Clipboard(realUri)
    // vscode.window.showInformationMessage(`realUri = ${realUri}`)
  })
  context.subscriptions.push(disposable)
}

export function deactivate() {
  vscode.window.showInformationMessage('exit')
}
