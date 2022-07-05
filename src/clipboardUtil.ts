import * as vscode from 'vscode'

export const writeText2Clipboard = (text: string) => {
  vscode.env.clipboard.writeText(text)
}
