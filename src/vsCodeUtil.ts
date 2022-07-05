import * as vscode from 'vscode'

/**
 * @description : 获取别名配置
 */
export const getAliasConfig = (): vscode.WorkspaceConfiguration => {
  return vscode.workspace.getConfiguration('o-file-path.alias')
}
