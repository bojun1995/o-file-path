import * as vscode from 'vscode'
import type { CONFIG_ALIAS, CONFIG_IMPORT_IDX } from './type'

/**
 * @description : 获取别名配置
 */
export const getAliasConfigList = (): CONFIG_ALIAS[] => {
  const config = vscode.workspace.getConfiguration('o-file-path')
  const aliasConfig = config.get('alias') as CONFIG_ALIAS[]
  return aliasConfig
}

export const getImportNameConfig = (): CONFIG_IMPORT_IDX => {
  const config = vscode.workspace.getConfiguration('o-file-path')
  const startIdx = config.get('importNameStartIndex') as number
  const endIdx = config.get('importNameEndIndex') as number
  if (startIdx >= endIdx) {
    throw new Error('结束下标应小于开始下标')
  } else {
    return {
      startIdx,
      endIdx,
    } as CONFIG_IMPORT_IDX
  }
}
