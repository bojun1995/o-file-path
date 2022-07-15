import * as vscode from 'vscode'
import * as pathUtil from './pathUtil'
import * as clipboardUtil from './clipboardUtil'

export function activate(context: vscode.ExtensionContext) {
  // 别名路径
  const aliasPath = vscode.commands.registerCommand('o-file-path.getAliasPath', (uri: vscode.Uri | undefined) => {
    const ret = {
      relativePath: '',
      aliasPath: '',
    }
    ret.relativePath = pathUtil.getRealPath(uri)
    if (ret.relativePath === '') {
      vscode.window.showErrorMessage('未能获取到文件路径')
      return
    }
    try {
      ret.aliasPath = pathUtil.replaceAlias(ret.relativePath)
      clipboardUtil.writeText2Clipboard(ret.aliasPath)
      vscode.window.showInformationMessage('已经复制别名路径', ret.aliasPath)
    } catch (err) {
      const error = err as Error
      vscode.window.showErrorMessage(error.message)
    }
  })

  // import 别名路径
  const importAliasPath = vscode.commands.registerCommand(
    'o-file-path.getAliasImportPath',
    (uri: vscode.Uri | undefined) => {
      const ret = {
        relativePath: '',
        aliasPath: '',
        importPath: '',
      }
      ret.relativePath = pathUtil.getRealPath(uri)
      if (ret.relativePath === '') {
        vscode.window.showErrorMessage('未能获取到文件路径')
        return
      }
      try {
        ret.aliasPath = pathUtil.replaceAlias(ret.relativePath)
        ret.importPath = pathUtil.getImportPath(ret.relativePath, ret.aliasPath)
        clipboardUtil.writeText2Clipboard(ret.importPath)
        vscode.window.showInformationMessage('已经复制导入别名路径', ret.importPath)
      } catch (err) {
        const error = err as Error
        vscode.window.showErrorMessage(error.message)
      }
    }
  )

  // 相对路径
  const relativePath = vscode.commands.registerCommand('o-file-path.getRelativePath', (uri: vscode.Uri | undefined) => {
    const ret = {
      selectedPath: '',
      activePath: '',
      relativePath: '',
    }
    ret.selectedPath = pathUtil.getRealPath(uri)
    ret.activePath = pathUtil.getActivePath()
    if (ret.selectedPath === '' || ret.activePath === '') {
      vscode.window.showErrorMessage('未能获取到文件路径')
      return
    }
    try {
      ret.relativePath = pathUtil.getRelativePath(ret.selectedPath, ret.activePath)
      clipboardUtil.writeText2Clipboard(ret.relativePath)
      vscode.window.showInformationMessage('已经复制相对路径', ret.relativePath)
    } catch (err) {
      const error = err as Error
      vscode.window.showErrorMessage(error.message)
    }
  })
  // 相对导入路径
  const relativeImportPath = vscode.commands.registerCommand(
    'o-file-path.getRelativeImportPath',
    (uri: vscode.Uri | undefined) => {
      const ret = {
        selectedPath: '',
        activePath: '',
        relativePath: '',
      }
      ret.selectedPath = pathUtil.getRealPath(uri)
      ret.activePath = pathUtil.getActivePath()
      if (ret.selectedPath === '' || ret.activePath === '') {
        vscode.window.showErrorMessage('未能获取到文件路径')
        return
      }
      try {
        ret.relativePath = pathUtil.getRelativePath(ret.selectedPath, ret.activePath)
        ret.relativePath = pathUtil.getImportPath(ret.selectedPath, ret.relativePath)
        clipboardUtil.writeText2Clipboard(ret.relativePath)
        vscode.window.showInformationMessage('已经复制导入相对路径', ret.relativePath)
      } catch (err) {
        const error = err as Error
        vscode.window.showErrorMessage(error.message)
      }
    }
  )
  context.subscriptions.push(aliasPath, importAliasPath, relativePath, relativeImportPath)
}

export function deactivate() {
  vscode.window.showInformationMessage('exit')
}
