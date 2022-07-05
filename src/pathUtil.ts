import * as vscode from 'vscode'

/**
 * @description : 获取菜单选中路径或当前打开文件路径
 * @param {vscode} uri
 */
export const getRealPath = (uri: vscode.Uri | undefined): string => {
  const ret = {
    path: '',
  }
  // 通过command直接调用
  if (typeof uri === 'undefined') {
    ret.path = getActivePath()
  }

  // 通过左侧文件栏菜单或文件顶部菜单调用
  if (uri instanceof vscode.Uri) {
    ret.path = vscode.workspace.asRelativePath(uri)
  }

  if (ret.path === '') {
    vscode.window.showErrorMessage('未能获取到文件路径')
  }
  return ret.path
}

/**
 * @description : 获取当前访问文件路径
 */
export const getActivePath = (): string => {
  const ret = {
    path: '',
  }
  if (vscode.window.activeTextEditor) {
    ret.path = vscode.window.activeTextEditor.document.uri.toString()
  }
  return ret.path
}

/**
 * @description : 替换反斜杠
 * @param {string} uri
 */
export const replacePath = (uri: string) => {
  return uri.replace(/\\/g, '/')
}
