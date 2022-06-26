import * as vscode from 'vscode'

export const getRelativePath = (uri: any) => {
  if (typeof uri === 'undefined') {
    if (vscode.window.activeTextEditor) {
      uri = vscode.window.activeTextEditor.document.uri
    }
  }
  if (!uri) {
    vscode.window.showErrorMessage('未能获取到文件路径')
    return
  }
  const path = vscode.workspace.asRelativePath(uri)
}
