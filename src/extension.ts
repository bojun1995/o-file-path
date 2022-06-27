import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'o-relative-path.getRelativePath',
    (uri: vscode.Uri | undefined) => {
      if (typeof uri === 'undefined') {
        if (vscode.window.activeTextEditor) {
          uri = vscode.window.activeTextEditor.document.uri
        }
      }
      if (!uri) {
        vscode.window.showErrorMessage('未能获取到文件路径')
        return
      }
      let path = vscode.workspace.asRelativePath(uri)
      path = path.replace(/\\/g, '/')
      vscode.window.showInformationMessage(path)
    }
  )
  context.subscriptions.push(disposable)
}

export function deactivate() {
  vscode.window.showInformationMessage('exit')
}
