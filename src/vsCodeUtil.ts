import * as vscode from 'vscode'

/**
 * @description : 获取别名配置
 */
export const getAliasConfig = () => {
  return vscode.workspace.getConfiguration('o-file-path.test')
}
