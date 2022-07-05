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
      const aliasConfig = vsCodeUtil.getAliasConfig()
      ret.parsedPath = pathUtil.replaceAlias(aliasConfig, ret.relativePath)
      clipboardUtil.writeText2Clipboard(ret.parsedPath)
      // vscode.window.showInformationMessage(`realUri = ${realUri}`)
    }
  })
  context.subscriptions.push(disposable)
}

export function deactivate() {
  vscode.window.showInformationMessage('exit')
}
