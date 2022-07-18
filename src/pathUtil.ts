import * as vscode from 'vscode'
import * as vsCodeUtil from './vsCodeUtil'

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
 * @description : 从TextEditor中获取当前访问文件路径
 * @param {vscode} textEditor
 */
export const getActivePathByTextEditor = (textEditor: vscode.TextEditor): string => {
  const ret = {
    path: '',
  }
  if (vscode.window.activeTextEditor) {
    ret.path = vscode.workspace.asRelativePath(textEditor.document.uri)
  }
  return ret.path
}

/**
 * @description : 替换别名
 * @param {vscode.WorkspaceConfiguration} aliasConfig
 * @param {string} path
 */
export const replaceAlias = (path: string): string => {
  const aliasConfigList = vsCodeUtil.getAliasConfigList()
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
 * @description : 获取大驼峰单词名
 * @param {string} fileName
 */
export const getUpperCamelCaseName = (fileName: string): string => {
  const firstChar = fileName.charAt(0).toUpperCase()
  const ret = `${firstChar}${fileName.slice(1, fileName.length)}`
  return ret
}

/**
 * @description : 获取import path
 * @param {string} relativePath
 * @param {string} fromPath
 */
export const getImportPath = (relativePath: string, fromPath: string): string => {
  const pathList = relativePath.split('/')
  const fileNameList = pathList[pathList.length - 1].split('.')
  let fileNameWithoutType = ''
  if (fileNameList.length == 1) {
    // 如：test 没有文件格式
    fileNameWithoutType = fileNameList[0]
  } else if (fileNameList.length > 1) {
    // 如：matrix.module.scss 多个点
    // 如：theme.scss 单个点
    fileNameList.forEach((nameStr, nameIdx) => {
      if (nameIdx !== fileNameList.length - 1) {
        fileNameWithoutType += getUpperCamelCaseName(nameStr)
      }
    })
  }
  const importName = getUpperCamelCaseName(fileNameWithoutType)
  return `import ${importName} from '${fromPath}'`
}

export const getRelativePath = (selectedPath: string, activePath: string): string => {
  // 'src/views/ops/task/manage/components/TaskItemByStation.vue'
  // 'src/views/ops/task/manage/taskAndItem/List/index.vue'
  const ret = {
    relativePath: '',
    importPath: '',
    importPathList: [] as string[],
    sameIdx: -1,
  }

  const selectPathList = selectedPath.split('/')
  const activePathList = activePath.split('/')

  if (selectedPath === activePath) {
    throw new Error('请勿选中当前窗口打开的文件')
  }

  if (selectPathList.length === 0) {
    throw new Error('请选中正确的文件路径')
  }

  for (let idx = 0; idx < selectPathList.length; idx++) {
    const selectPath = selectPathList[idx]
    const activatePath = activePathList[idx]
    if (selectPath !== activatePath) {
      ret.sameIdx = idx
      break
    }
  }

  // 同目录
  if (ret.sameIdx === activePathList.length - 1) {
    ret.importPathList.push('.')
  } else {
    for (let index = 0; index < activePathList.length - ret.sameIdx - 1; index++) {
      ret.importPathList.push('..')
    }
  }
  for (let index = ret.sameIdx; index < selectPathList.length; index++) {
    ret.importPathList.push(selectPathList[index])
  }

  ret.importPath = ret.importPathList.join('/')
  return ret.importPath
}
