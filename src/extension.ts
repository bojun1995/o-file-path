import * as vscode from 'vscode'
import * as pathUtil from './pathUtil'
import * as clipboardUtil from './clipboardUtil'
import * as vsCodeUtil from './vsCodeUtil'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('o-file-path.getAliasPath', (uri: vscode.Uri | undefined) => {
    const ret = {
      relativePath: '',
      parsedPath: '',
    }
    ret.relativePath = pathUtil.getRealPath(uri)

    if (ret.relativePath === '') {
      vscode.window.showErrorMessage('未能获取到文件路径')
    } else {
      try {
        const aliasConfigList = vsCodeUtil.getAliasConfigList()
        ret.parsedPath = pathUtil.replaceAlias(aliasConfigList, ret.relativePath)
        clipboardUtil.writeText2Clipboard(ret.parsedPath)
        vscode.window.showInformationMessage('已经复制对应路径', ret.parsedPath)
      } catch (err) {
        const error = err as Error
        vscode.window.showErrorMessage(error.message)
      }
    }
  })
  context.subscriptions.push(disposable)
}

export function deactivate() {
  vscode.window.showInformationMessage('exit')
}
