---
outline: deep
---

# 快速开始

## 简介

DST Admin Go 是一个使用 Golang 开发的饥荒联机版（Don't Starve Together）服务器管理面板。它提供了一个图形化界面，让用户能够更方便地管理自己的饥荒服务器，而无需记忆复杂的命令行指令。

[在线预览](https://carrot-hu23.github.io/dst-admin-go-preview)
## 功能特性

- **服务器管理**: 启动、停止、重启服务器。
- **世界管理**: 创建、配置和管理游戏世界。
- **玩家管理**: 查看在线玩家、踢人、封禁等。
- **MOD管理**: 方便地添加、删除和配置游戏MOD。
- **备份与回档**: 自动备份游戏存档，并支持回档到指定时间点。
- **日志查看**: 实时查看服务器运行日志。
- **跨平台**: 支持 Windows, Linux, MacOS 等操作系统。

## Docker 部署

如果您的服务器支持 Docker，可以使用 Docker 来部署 `dst-admin-go`。详情请参考 [Docker 部署](/guide/docker) 文档。


## Linux 服务器部署

### 1. 下载 RELEASE 文件

前往 [GitHub Releases](https://github.com/carrot-hu23/dst-admin-go/releases) 下载适用于 Linux 的最新版本。

```bash
# 示例：下载 1.6.1 版本（请替换为最新版本）
wget https://github.com/carrot-hu23/dst-admin-go/releases/download/1.6.1/dst-admin-go.1.6.1.tar.gz
```

### 2. 解压文件

使用 `tar` 命令解压下载的文件：

```bash
tar -zvxf dst-admin-go.1.6.1.tar.gz
```

### 3. 进入目录

解压后，切换到解压出的目录中：

```bash
cd dst-admin-go.1.6.1
```

### 4. 安装环境（可选）

如果服务器上尚未安装饥荒 Dedicated Server 环境，可以运行脚本自动安装：

```bash
# CentOS 系统
chmod +x install_dst_centos.sh
./install_dst_centos.sh

# Ubuntu 系统
chmod +x install_dst_ubuntu.sh
./install_dst_ubuntu.sh
```

#### 手动安装 SteamCMD（如果需要）

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install lib32gcc-s1 # 32位库支持
sudo add-apt-repository multiverse
sudo apt update
sudo apt install steamcmd

# CentOS 环境问题: 如果手动安装或遇到问题，可能需要手动安装依赖库
# sudo yum -y update
# sudo yum -y install glibc.i686 libstdc++.i686 screen libcurl.i686
```

#### 64位启动问题解决

如果遇到64位系统启动问题，可能需要创建库链接：

```bash
ln -s /usr/lib64/libcurl.so.4 ~/dst-dedicated-server/bin64/lib64/libcurl-gnutls.so.4
```

### 5. 启动面板

给启动脚本添加执行权限并运行：

```bash
chmod +x start.sh
./start.sh
```

通常选择选项 1 启动。面板默认会在 `8082` 端口启动。

### 6. 初始化面板

在浏览器中访问 `http://你的服务器IP:8082`。

按照提示初始化管理员账号信息。

### 7. 配置面板

登录后，等待面板完成必要的初始化（如检测或安装饥荒服务）。

进入"系统设置"，配置 `备份路径` 和 `mod下载路径`。如果之前通过脚本安装了环境，这些路径通常会自动填充。

如果需要更改面板默认端口 (8082)，可以修改项目目录下的 `config.yml` 文件中的 `port` 配置项。

### 8. 创建并启动房间

修改或创建存档信息（世界配置、房间设置等）。

完成配置后，即可启动游戏房间。

## Windows 平台部署

### 1. 下载文件

前往 [GitHub Releases](https://github.com/carrot-hu23/dst-admin-go/releases) 下载适用于 Window 的最新版本。

### 2. 解压文件

将下载的文件解压到目标目录。最好是在C盘，其他盘可能存在权限不足问题

### 3. 启动面板

直接运行解压目录下的 `dst-admin-go.exe` 文件启动面板。

### 4. 访问面板

在浏览器中访问面板地址（通常为 `http://localhost:8082` 或根据提示），并进行初始化设置。

### 5. 安装steamcmd 和 饥荒

1. 访问 [SteamCMD 官方页面](https://developer.valvesoftware.com/wiki/SteamCMD) 下载适用于 Windows 的 SteamCMD。
2. 下载完成后，将 `steamcmd.zip` 解压到您希望安装的目录，例如 `C:\steamcmd\`。
3. 进入解压目录，双击运行 `steamcmd.exe`。
4. 等待 SteamCMD 更新完成，完成后会出现 `Steam>` 提示符。
5. 输入以下命令安装饥荒专用服务器：
   ```
   login anonymous
   force_install_dir C:\dst-dedicated-server
   app_update 343050 validate
   quit
   ```
   这会将饥荒专用服务器安装到 `C:\dst-dedicated-server` 目录。

### 6. 配置路径

在面板的设置中，指定 `steamcmd` 和饥荒 Dedicated Server 的安装路径：
- SteamCMD 路径：例如 `C:\steamcmd`
- 饥荒服务器路径：例如 `C:\dst-dedicated-server`

您也可以直接编辑 `dst_config` 文件来配置这些路径，请参考 [配置说明](/guide/configuration) 了解详细信息。

### 7. 创建并启动房间

配置存档信息并启动房间。


## 防火墙配置

确保防火墙允许 `dst-admin-go` 和饥荒服务器的端口通过。

```bash
# Ubuntu/Debian ufw
sudo ufw allow 8082/tcp # dst-admin-go 管理面板端口
sudo ufw allow 10999/udp # 饥荒服务器默认 UDP 端口
sudo ufw allow 10998/udp # 饥荒服务器备用 UDP 端口
# 根据您的 cluster.ini 配置开放其他端口
```

## 反向代理 (可选)

为了通过域名访问管理面板或添加 SSL 证书，您可以使用 Nginx 或 Apache 等反向代理服务器。

### Nginx 示例配置

```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:8082;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

配置完成后，重启 Nginx 服务。

## 常见问题

- **Q: 服务启动失败，提示权限不足？**

  A: 确保运行 `dst-admin-go` 的用户对饥荒服务器目录和集群配置目录有读写权限。

- **Q: 无法通过 IP 访问管理面板？**

  A: 检查面板是否在 `8082` 端口启动，并确认防火墙规则已放行端口。

- **Q: 饥荒服务器无法启动？**

  A: 检查集群配置文件（如 `cluster.ini`, `cluster_token.txt`）是否存在且配置正确。

- **Q: 如何修改管理面板的端口？**

  A: 修改配置文件 `config.yaml` 中的 `port` 项，然后重启程序。

- **Q: 无法启动服务器？**

  A: 请检查 `dst_config` 文件中的路径配置是否正确，以及饥荒游戏是否已正确安装。

- **Q: 如何添加MOD？**

  A: 在"MOD"页面点击"添加MOD"，输入MOD的ID即可。记得在世界配置中启用MOD。

- **Q: MOD 无法加载或失效？**

  A: 这通常与游戏服务器使用的 `steamclient.so` 文件版本有关。请参考 [模组失效问题](/guide/mod-issues) 获取解决方案。

如果您遇到其他问题，欢迎提交 [Issue](https://github.com/carrot-hu23/dst-admin-go/issues) 或在 [Discussion](https://github.com/carrot-hu23/dst-admin-go/discussions) 中讨论。