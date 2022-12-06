import * as vscode from 'vscode'
import type { CONFIG_ALIAS } from './type'

/**
 * @description : 获取别名配置
 */
export const getAliasConfigList = (): CONFIG_ALIAS[] => {
  const config = vscode.workspace.getConfiguration('o-file-path')
  const aliasConfig = config.get('alias') as CONFIG_ALIAS[]
  return aliasConfig
}

/**
 * @description : 获取split配置
 */
export const getSplitConfigList = (): string[] => {
  const config = vscode.workspace.getConfiguration('o-file-path')
  const splitConfig = (config.get('splitFileName') as string[]) || []
  return splitConfig
}
