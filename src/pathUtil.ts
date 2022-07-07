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
    ret.path = vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.uri)
  }
  return ret.path
}

/**
 * @description : 替换别名
 * @param {vscode.WorkspaceConfiguration} aliasConfig
 * @param {string} path
 */
export const replaceAlias = (aliasConfigList: CONFIG_ALIAS[], path: string): string => {
  const ret = {
    path: '',
    isParsed: false,
  }
  try {
    ret.isParsed = aliasConfigList.some((cfg) => {
      if (cfg.alias && cfg.path) {
        if (path.search(cfg.path) === 0) {
          ret.path = path.replace(cfg.path, cfg.alias)
          return true
        } else {
          return false
        }
      } else {
        throw new Error('别名配置错误')
      }
    })
  } catch (err) {
    const error = err as Error
    throw new Error(error.message)
  }
  if (ret.isParsed === false) {
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

/**
 * @description : 获取import path
 * @param {string} uri
 */
export const getImportPath = (relativePath: string, aliasPath: string): string => {
  return `import XXXX from "${aliasPath}"`
}
