---
outline: deep
---

# Docker 部署

> [docker仓库地址](https://hub.docker.com/r/hujinbo23/dst-admin-go)

如果您的服务器支持 Docker，可以使用 Docker 来部署 `dst-admin-go`。

## 使用 Docker Hub 镜像

`dst-admin-go` 提供了官方 Docker 镜像，您可以直接从 Docker Hub 拉取并运行：

```bash
# 创建必要的目录
mkdir -p ~/dstsave
mkdir -p ~/steamcmd
mkdir -p ~/dst-dedicated-server

# 拉取指定版本的镜像（推荐使用具体版本而不是 latest）
docker pull hujinbo23/dst-admin-go:1.5.0

# 运行容器
docker run -d \\
  --name dst-admin-go \\
  -p 8082:8082 \\
  -p 10999:10999/udp \\
  -p 10998:10998/udp \\
  -v ~/dstsave:/root/.klei/DoNotStarveTogether \\
  -v ~/dstsave/back:/app/backup \\
  -v ~/steamcmd:/app/steamcmd \\
  -v ~/dst-dedicated-server:/app/dst-dedicated-server \\
  -v ~/dstsave/dst-db:/app/dst-db \\
  -v ~/dstsave/password.txt:/app/password.txt \\
  -v ~/dstsave/first:/app/first \\
  hujinbo23/dst-admin-go:1.5.0
```

## 参数说明

- `-d`: 后台运行容器
- `--name`: 指定容器名称
- `-p 8082:8082`: 管理面板端口映射
- `-p 10999:10999/udp`: 游戏服务器主端口映射
- `-p 10998:10998/udp`: 游戏服务器次端口映射
- `-v ~/dstsave:/root/.klei/DoNotStarveTogether`: 挂载游戏存档目录
- `-v ~/dstsave/back:/app/backup`: 挂载存档备份目录
- `-v ~/steamcmd:/app/steamcmd`: 挂载 SteamCMD 目录
- `-v ~/dst-dedicated-server:/app/dst-dedicated-server`: 挂载饥荒专用服务器目录
- `-v ~/dstsave/dst-db:/app/dst-db`: 挂载玩家日志文件
- `-v ~/dstsave/password.txt:/app/password.txt`: 挂载密码文件
- `-v ~/dstsave/first:/app/first`: 挂载初始化标识文件

## 路径说明

容器内各组件的路径如下：

- 容器存档启动路径: `/root/.klei/DoNotStarveTogether`
- 容器存档备份路径: `/app/backup`
- 容器存档模组路径: `/app/mod`
- 容器玩家日志路径: `/app/dst-db` （这是一个文件）
- 容器服务日志路径: `/app/dst-admin-go.log` （这是一个文件）
- 容器启动饥荒路径: `/app/dst-dedicated-server`
- 容器启动steamcmd：`/app/steamcmd`
- `first` 文件: 代表是否第一次登录，如果没有这个文件会跳转到初始化界面设置账号

## 使用 docker-compose (推荐)

创建 `docker-compose.yml` 文件：

```yaml
version: '3'

services:
  dst-admin-go:
    image: hujinbo23/dst-admin-go:1.5.0
    container_name: dst-admin-go
    ports:
      - "8082:8082"
      - "10999:10999/udp"
      - "10998:10998/udp"
    volumes:
      - ${PWD}/dstsave:/root/.klei/DoNotStarveTogether
      - ${PWD}/dstsave/back:/app/backup
      - ${PWD}/steamcmd:/app/steamcmd
      - ${PWD}/dst-dedicated-server:/app/dst-dedicated-server
      - ${PWD}/dstsave/dst-db:/app/dst-db
      - ${PWD}/dstsave/password.txt:/app/password.txt
      - ${PWD}/dstsave/first:/app/first
    restart: unless-stopped
```

然后运行以下命令启动服务：

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## 安装 SteamCMD 和饥荒专用服务器

在宿主机上安装 SteamCMD 并下载饥荒专用服务器：

```bash
# 创建目录
mkdir -p ~/steamcmd
mkdir -p ~/dst-dedicated-server

# 下载并安装 SteamCMD
cd ~/steamcmd
wget http://media.steampowered.com/installer/steamcmd_linux.tar.gz
tar -xvzf steamcmd_linux.tar.gz

# 使用 SteamCMD 安装饥荒专用服务器
./steamcmd.sh +login anonymous +force_install_dir ~/dst-dedicated-server +app_update 343050 validate +quit
```

## 管理容器

```bash
# 查看运行状态
docker ps

# 查看日志
docker logs dst-admin-go

# 实时查看日志
docker logs -f dst-admin-go

# 停止容器
docker stop dst-admin-go

# 启动容器
docker start dst-admin-go

# 重启容器
docker restart dst-admin-go

# 删除容器
docker rm dst-admin-go
```

## 首次运行初始化

首次运行容器时，由于缺少 `first` 文件，系统会跳转到初始化界面要求设置管理员账号和密码。您可以通过以下方式创建该文件以跳过初始化：

```bash
# 创建 first 文件
touch ~/dstsave/first

# 创建 password.txt 文件（格式：用户名:密码）
echo "admin:your_password" > ~/dstsave/password.txt
```

## 文件权限问题

在 Linux 系统上，可能会遇到文件权限问题。可以通过以下方式解决：

1. 确保挂载目录的权限正确：
   ```bash
   # 设置正确的所有者（将 1000 替换为您运行 Docker 的用户 ID）
   sudo chown -R 1000:1000 ~/dstsave
   sudo chown -R 1000:1000 ~/steamcmd
   sudo chown -R 1000:1000 ~/dst-dedicated-server
   ```


## 配置 dst-admin-go 面板

1. 打开浏览器访问 `http://IP:8082`
2. 注册用户并登录（各个选项均可随意填写）
3. 进入"房间设置"并配置令牌

## 注意事项

1. 防火墙需要开放相应的端口（默认 8082 端口用于管理面板，UDP 10999 和 10998 端口用于游戏服务器）。
2. 如果需要持久化数据，请确保正确挂载所有数据卷。
3. 饥荒服务器文件需要在主机上通过 SteamCMD 下载，并挂载到容器中。
4. 推荐使用具体版本号而不是 `latest` 标签，以确保环境一致性。