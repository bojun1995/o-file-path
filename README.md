<p align="center">
  <a href="https://github.com/bojun1995/o-json-crx" target="_blank">
    <img width="180" src="https://github.com/bojun1995/o-json-crx/blob/master/backup/LOGO PNG/o-tools%20%E7%99%BD%E5%BA%95.png" alt="logo">
  </a>
</p>

> VS Code插件，快捷复制别名路径、导入别名路径、相对路径、导入相对路径

![GitHub last commit](https://img.shields.io/github/last-commit/bojun1995/o-file-path?style=for-the-badge)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/bojun1995/o-file-path?style=for-the-badge)
![GitHub Release Date](https://img.shields.io/github/release-date/bojun1995/o-file-path?style=for-the-badge)

# o-file-path

 [中文](https://github.com/bojun1995/o-file-path/blob/main/README-CN.md)

## 使用方式

#### 下载
[VS Code插件商店](https://chrome.google.com/webstore/detail/o-json/pjgmamaikjfkchcapppciiabhcgihaha)

#### 如何使用
- 侧边栏文件菜单 右键
- 文件顶部菜单 右键
- F1呼出命令执行面板 输入命令

*相对路径、导入相对路径
```
例如：
├── src
│   ├── index.js
│   ├── util
│   │   ├── test.js

1.打开index.js
2.侧边栏文件菜单右键选择a.js，选择 [复制导入相对路径]

得到：
import Test from './util/test.js'
```

#### 功能入口兼容
|  | 侧边栏文件菜单 | 文件顶部菜单 | 直接运行命令 |
| --- | --- | --- | --- |
| 别名路径 | √ | √ | √ |
| 导入别名路径 | √ | √ | √ |
| 相对路径 | √ | x | x |
| 导入相对路径 | √ | x | x |

#### 配置说明
##### 别名配置 o-file-path.alias
```
*配置应为数组形式
*为防止同路径别名冲突，排在前面的配置会优先读取

[
  {
    "alias": "#",
    "path": "src/assets"
  },
  {
    "alias": "@",
    "path": "src"
  }
]
```

## 开发方式
#### 安装依赖
```
#yarn
yarn i

#npm
npm i
```
#### 本地开发
```
1. 使用VS Code打开源码
2. F5 运行插件
```
#### 本地打包插件
参考：[如何开发一款vscode插件](https://zhuanlan.zhihu.com/p/386196218)

## 技术栈
- Typscript
- ESLint + Prettier + Husky

## 致谢
- 开发教程 [VS-Code-Extension-Doc-ZH](https://github.com/Liiked/VS-Code-Extension-Doc-ZH)
