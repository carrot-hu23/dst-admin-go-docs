---
outline: deep
---

# 快速开始

## 简介

DST Admin Go 是一个使用 Golang 开发的饥荒联机版（Don't Starve Together）服务器管理面板。它提供了一个图形化界面，让用户能够更方便地管理自己的饥荒服务器，而无需记忆复杂的命令行指令。

## 功能特性

- **服务器管理**: 启动、停止、重启服务器。
- **世界管理**: 创建、配置和管理游戏世界。
- **玩家管理**: 查看在线玩家、踢人、封禁等。
- **MOD管理**: 方便地添加、删除和配置游戏MOD。
- **备份与回档**: 自动备份游戏存档，并支持回档到指定时间点。
- **日志查看**: 实时查看服务器运行日志。
- **跨平台**: 支持 Windows, Linux, MacOS 等操作系统。

## 安装

### 1. 下载

前往 [GitHub Releases](https://github.com/carrot-hu23/dst-admin-go/releases) 页面下载适用于您操作系统的最新版本。

### 2. 运行

解压下载的文件，然后运行可执行文件 `dst-admin-go` (Linux/Mac) 或 `dst-admin-go.exe` (Windows)。

### 3. 访问

在浏览器中打开 `http://localhost:8082` 即可访问管理面板。

## 配置

首次运行时，调整配置文件 `config.yaml`来修改启动端口

```yaml
#启动端口
port: 8082
#数据库
database: dst-db
```

在 Windows 环境下，您需要手动配置这些路径或通过管理面板的系统设置进行配置。在 Linux 环境下，如果使用安装脚本，这些路径通常会自动配置。

更多配置项请参考 [配置说明](/guide/configuration)。

## 使用

启动管理面板后，您就可以通过图形界面来管理您的饥荒服务器了。

1. **服务器状态**: 首页会显示服务器的当前状态。
2. **世界配置**: 在"世界"页面可以创建和配置游戏世界。
3. **MOD管理**: 在"MOD"页面可以管理游戏MOD。
4. **玩家管理**: 在"玩家"页面可以查看和管理在线玩家。
5. **存档管理**: 在"存档"页面可以查看备份和进行回档操作。

## 环境准备

在使用 DST Admin Go 之前，您需要安装 SteamCMD 和饥荒专用服务器：

### Windows 环境

1. 下载并安装 SteamCMD
2. 使用 SteamCMD 安装饥荒专用服务器
3. 在管理面板的"系统设置"中配置相关路径

### Linux 环境

1. 使用系统包管理器安装 SteamCMD，或手动下载安装
2. 使用 SteamCMD 安装饥荒专用服务器
3. 或者使用项目提供的安装脚本自动完成环境配置

详细部署步骤请参考 [部署指南](/guide/deployment)。

## 常见问题

- **Q: 如何修改管理面板的端口？**
  A: 修改配置文件 `config.yaml` 中的 `port` 项，然后重启程序。

- **Q: 无法启动服务器？**
  A: 请检查 `dst_config` 文件中的路径配置是否正确，以及饥荒游戏是否已正确安装。

- **Q: 如何添加MOD？**
  A: 在"MOD"页面点击"添加MOD"，输入MOD的ID即可。记得在世界配置中启用MOD。

- **Q: MOD 无法加载或失效？**
  A: 这通常与游戏服务器使用的 `steamclient.so` 文件版本有关。请参考 [模组失效问题](/guide/mod-issues) 获取解决方案。

如果您遇到其他问题，欢迎提交 [Issue](https://github.com/carrot-hu23/dst-admin-go/issues) 或在 [Discussion](https://github.com/carrot-hu23/dst-admin-go/discussions) 中讨论。