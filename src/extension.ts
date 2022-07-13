import * as vscode from 'vscode'
import * as pathUtil from './pathUtil'
import * as clipboardUtil from './clipboardUtil'

export function activate(context: vscode.ExtensionContext) {
  const aliasPath = vscode.commands.registerCommand('o-file-path.getAliasPath', (uri: vscode.Uri | undefined) => {
    const ret = {
      relativePath: '',
      aliasPath: '',
    }
    ret.relativePath = pathUtil.getRealPath(uri)

    if (ret.relativePath === '') {
      vscode.window.showErrorMessage('未能获取到文件路径')
    } else {
      try {
        ret.aliasPath = pathUtil.replaceAlias(ret.relativePath)
        clipboardUtil.writeText2Clipboard(ret.aliasPath)
        vscode.window.showInformationMessage('已经复制别名路径', ret.aliasPath)
      } catch (err) {
        const error = err as Error
        vscode.window.showErrorMessage(error.message)
      }
    }
  })

  const importAliasPath = vscode.commands.registerCommand(
    'o-file-path.getImportAliasPath',
    (uri: vscode.Uri | undefined) => {
      const ret = {
        relativePath: '',
        aliasPath: '',
        importPath: '',
      }
      ret.relativePath = pathUtil.getRealPath(uri)

      if (ret.relativePath === '') {
        vscode.window.showErrorMessage('未能获取到文件路径')
      } else {
        try {
          ret.aliasPath = pathUtil.replaceAlias(ret.relativePath)
          ret.importPath = pathUtil.getImportPath(ret.relativePath, ret.aliasPath)
          clipboardUtil.writeText2Clipboard(ret.importPath)
          vscode.window.showInformationMessage('已经复制import别名路径', ret.importPath)
        } catch (err) {
          const error = err as Error
          vscode.window.showErrorMessage(error.message)
        }
      }
    }
  )
  context.subscriptions.push(aliasPath, importAliasPath)
}

export function deactivate() {
  vscode.window.showInformationMessage('exit')
}
