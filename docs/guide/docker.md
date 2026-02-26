---
outline: deep
---

# Docker 部署

> [docker仓库地址](https://hub.docker.com/r/hujinbo23/dst-admin-go)

如果您的服务器支持 Docker，可以使用 Docker 来部署 `dst-admin-go`。

## 使用 docker-compose (推荐)

### 前置文件
```bash
# 创建 first 文件
touch ~/dstsave/first
touch ~/dstsave/dst-db

# 创建 ~/dstsave/password.txt 文件
echo "username = admin
password = 123456
displayName = admin
photoURL = 
email = xxx" > ~/dstsave/password.txt
```
如果你挂载了 password.txt，那么登录账号密码就是上面的 admin/123456
### docker-compose.yml
```yaml
version: '3'

services:
  dst-admin-go:
    image: hujinbo23/dst-admin-go:latest
    container_name: dst-admin-go
    ports:
      - "8082:8082"
      - "10999:10999/udp"
      - "10998:10998/udp"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
      - ${PWD}/dstsave:/root/.klei/DoNotStarveTogether
      - ${PWD}/dstsave/back:/app/backup
      - ${PWD}/steamcmd:/app/steamcmd
      - ${PWD}/dst-dedicated-server:/app/dst-dedicated-server
      - ${PWD}/dstsave/password.txt:/app/password.txt
      - ${PWD}/dstsave/dst-db:/app/dst-db
      - ${PWD}/dstsave/first:/app/first
    restart: unless-stopped
```

## 使用 Docker Hub 镜像

`dst-admin-go` 提供了官方 Docker 镜像，您可以直接从 Docker Hub 拉取并运行：


```bash
# 创建目录
mkdir -p ~/steamcmd
mkdir -p ~/dst-dedicated-server
mkdir -p ~/dstsave
```
如果你需要挂载 password.txt、dst-db 和 first 文件，请提前创建好

```bash

docker pull hujinbo23/dst-admin-go:latest

# 运行容器
docker run -d \
  --name dst-admin-go \
  -p 8082:8082 \
  -p 10999:10999/udp \
  -p 10998:10998/udp \
  -v ~/dstsave:/root/.klei/DoNotStarveTogether \
  -v ~/dstsave/back:/app/backup \
  -v ~/steamcmd:/app/steamcmd \
  -v ~/dst-dedicated-server:/app/dst-dedicated-server \
  hujinbo23/dst-admin-go:latest
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

下面三个参数都是文件，如果需要挂载请自行创建好

- `-v ~/dstsave/dst-db:/app/dst-db`: 挂载玩家日志文件
  ```shell
  touch dst-db
  ``` 
- `-v ~/dstsave/password.txt:/app/password.txt`: 挂载密码文件
  ```shell
  cat > password.txt << EOF
  username = admin
  password = 123456
  displayName = admin
  photoURL =
  email = xxx
  EOF
  ``` 
- `-v ~/dstsave/first:/app/first`: 挂载初始化标识文件
  ```shell
  touch first
  ``` 

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


## 首次运行初始化

首次运行容器时，由于缺少 `first` 文件，系统会跳转到初始化界面要求设置管理员账号和密码。您可以通过以下方式创建该文件以跳过初始化：

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