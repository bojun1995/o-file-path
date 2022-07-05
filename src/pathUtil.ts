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
    ret.path = vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.uri)
  }
  return ret.path
}

/**
 * @description : 替换别名
 * @param {vscode.WorkspaceConfiguration} aliasConfig
 * @param {string} path
 */
export const replaceAlias = (aliasConfig: vscode.WorkspaceConfiguration, path: string): string => {
  const ret = {
    path: '',
    isParsed: false,
  }
  if (typeof aliasConfig === 'object') {
    const copyConfig = JSON.parse(JSON.stringify(aliasConfig))
    const keys = Object.keys(copyConfig)
    if (keys.length > 0) {
      ret.isParsed = keys.some((key) => {
        const val = aliasConfig[key]
        if (path.search(val) === 0) {
          ret.path = path.replace(val, key)
          return true
        } else {
          return false
        }
      })
    }
  }
  if (ret.isParsed === false) {
    // vscode.window.showErrorMessage('没有对应别名配置')
    throw new Error('没有对应别名配置')
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
