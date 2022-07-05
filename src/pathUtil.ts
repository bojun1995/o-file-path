import * as vscode from 'vscode'
import type { CONFIG_ALIAS } from './type'

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
    ret.path = vscode.window.activeTextEditor.document.uri.toString()
  }
  return ret.path
}

/**
 * @description : 替换别名
 * @param {CONFIG_ALIAS} aliasConfig
 * @param {string} path
 */
export const replaceAlias = (aliasConfig: CONFIG_ALIAS, path: string): string => {
  aliasConfig
  return ''
}

/**
 * @description : 替换反斜杠
 * @param {string} uri
 */
export const replacePath = (uri: string) => {
  return uri.replace(/\\/g, '/')
}
