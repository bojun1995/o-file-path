import * as vscode from 'vscode'

export const getRealPath = (uri: vscode.Uri | undefined): string => {
  const ret = {
    path: '',
  }
  // 通过command直接调用
  if (typeof uri == undefined) {
    if (vscode.window.activeTextEditor) {
      ret.path = vscode.window.activeTextEditor.document.uri as unknown as string
    }
  }

  // 通过左侧文件栏菜单或文件顶部菜单调用
  if (uri instanceof vscode.Uri) {
    ret.path = vscode.workspace.asRelativePath(uri)
  }
  return ret.path
}
