---
outline: deep
---

# 🐳 Docker 部署指南

本文档介绍如何使用 Docker 部署 DST-Admin-Go 饥荒服务器管理面板。

## ✨ 特性

- ✅ 一键部署（适合新手）
- ✅ 复用已有资源（适合老手）
- ✅ 自动初始化管理员账号
- ✅ 自动下载 SteamCMD
- ✅ 自动下载 DST Dedicated Server

---

## 📋 部署方式选择

根据您的实际情况选择合适的部署方式：

| 部署方式 | 适用场景 | 特点 |
|---------|---------|------|
| **新手快速部署** | 首次使用，无现有资源 | 一条命令启动，自动下载所有依赖 |
| **进阶复用部署** | 已有 SteamCMD/服务器 | 复用现有资源，避免重复下载 |
| **Docker Compose** | 需要便捷管理和维护 | 配置文件化，易于版本控制 |

---

## 🟢 方案一：新手快速部署

### 适用对象

- 从未安装过 SteamCMD
- 从未安装过 DST Dedicated Server
- 希望一条命令快速启动

### 部署步骤

#### 1. 创建数据目录

```bash
mkdir -p ~/dstsave
```

#### 2. 运行容器

```bash
docker run -d \
  --name dst-admin-go \
  --restart=always \
  -p 8082:8082 \
  -p 10888:10888/udp \
  -p 10998:10998/udp \
  -p 10999:10999/udp \
  -v ~/dstsave:/data \
  hujinbo23/dst-admin-go:latest
```

#### 3. 等待自动初始化

首次启动容器会自动完成以下操作：

- 下载 SteamCMD
- 下载 DST Dedicated Server
- 初始化管理员账号
- 创建数据库文件

整个过程需要 5-15 分钟（取决于网络速度），可通过以下命令查看日志：

```bash
docker logs -f dst-admin-go
```

#### 4. 访问管理后台

浏览器访问：`http://服务器IP:8082`

**默认账号信息：**
- 用户名：`admin`
- 密码：`123456`

::: warning 安全提示
首次登录后请立即修改默认密码！
:::

---

## 🔵 方案二：进阶复用部署

### 适用对象

- 已安装 SteamCMD
- 已安装 DST Dedicated Server
- 希望复用现有资源，避免重复下载

### 前置条件

确保您的系统中已存在以下目录：

```
~/steamcmd
~/dst-dedicated-server
~/dstsave
```

### 部署步骤

运行容器并挂载现有目录：

```bash
docker run -d \
  --name dst-admin-go \
  --restart=always \
  -p 8082:8082 \
  -p 10888:10888/udp \
  -p 10998:10998/udp \
  -p 10999:10999/udp \
  -v ~/dstsave:/data \
  -v ~/steamcmd:/app/steamcmd \
  -v ~/dst-dedicated-server:/app/dst-dedicated-server \
  hujinbo23/dst-admin-go:latest
```

### 智能检测机制

容器启动时会自动检测：

- 如果已挂载 `/app/steamcmd` → 跳过 SteamCMD 下载
- 如果已挂载 `/app/dst-dedicated-server` → 跳过服务器下载

---

## 🐋 方案三：Docker Compose 部署

### 适用对象

- 不喜欢长命令行参数
- 需要便捷的服务管理
- 希望配置文件化
- 服务器长期运行

### 新手版 Docker Compose

#### 1. 创建数据目录

```bash
mkdir -p ~/dstsave
```

#### 2. 创建配置文件

创建 `docker-compose.yml` 文件：

```yaml
version: "3.8"

services:
  dst-admin-go:
    image: hujinbo23/dst-admin-go:1.6.1
    container_name: dst-admin-go
    restart: always

    ports:
      - "8082:8082"
      - "10888:10888/udp"
      - "10998:10998/udp"
      - "10999:10999/udp"

    volumes:
      - ${PWD}/dstsave:/data
```

#### 3. 启动服务

```bash
docker compose up -d
```

#### 4. 访问后台

浏览器访问：`http://服务器IP:8082`

**默认账号：**
- 用户名：`admin`
- 密码：`123456`

### 进阶版 Docker Compose

如果您已有 SteamCMD 和服务器文件，可使用以下配置：

```yaml
version: "3.8"

services:
  dst-admin-go:
    image: hujinbo23/dst-admin-go:1.6.1
    container_name: dst-admin-go
    restart: always

    ports:
      - "8082:8082"
      - "10888:10888/udp"
      - "10998:10998/udp"
      - "10999:10999/udp"

    volumes:
      - ${PWD}/dstsave:/data
      - ${PWD}/steamcmd:/app/steamcmd
      - ${PWD}/dst-dedicated-server:/app/dst-dedicated-server
```

### 常用管理命令

```bash
# 启动服务
docker compose up -d

# 停止服务
docker compose down

# 查看日志
docker compose logs -f

# 重启服务
docker compose restart

# 更新服务
docker compose pull
docker compose up -d
```

---

## 📁 数据目录说明

### 目录结构

所有数据统一存放在 `~/dstsave` 目录下：

```
~/dstsave/
├── klei/                    # 世界存档目录
├── backup/                  # 备份目录
├── steamcmd/                # SteamCMD 程序目录
├── dst-dedicated-server/    # DST 服务器程序目录
├── dst-db                   # 数据库文件
├── password.txt             # 管理员账号信息
└── first                    # 初始化标记文件
```

### 目录说明

| 名称 | 类型 | 说明 |
|------|------|------|
| `klei/` | 目录 | 饥荒世界存档和配置文件 |
| `backup/` | 目录 | 自动备份的存档文件 |
| `steamcmd/` | 目录 | Steam 命令行工具 |
| `dst-dedicated-server/` | 目录 | 饥荒专用服务器程序 |
| `dst-db` | 文件 | SQLite 数据库文件 |
| `password.txt` | 文件 | 初始管理员账号密码 |
| `first` | 文件 | 初始化完成标记 |

::: warning 注意
- `dst-db` 和 `first` 是**文件**，不是目录
- `first` 文件由程序自动创建，无需手动创建
:::

---

## 🔄 版本升级

### 升级步骤

#### 1. 停止并删除旧容器

```bash
docker stop dst-admin-go
docker rm dst-admin-go
```

#### 2. 拉取新版本镜像

```bash
docker pull hujinbo23/dst-admin-go:latest
```

#### 3. 重新运行容器

使用之前的 `docker run` 命令重新创建容器即可。

::: tip 提示
数据目录 `~/dstsave` 中的所有数据不会丢失！
:::

### Docker Compose 升级

如果使用 Docker Compose 部署，升级更简单：

```bash
docker compose pull
docker compose up -d
```

---

## ⚙️ 初始配置

### 配置服务器令牌

1. 浏览器访问 `http://服务器IP:8082`
2. 使用默认账号登录（admin/123456）
3. 进入「房间设置」页面
4. 配置 Klei 服务器令牌

::: tip 获取令牌
访问 [Klei 官网](https://accounts.klei.com/account/game/servers?game=DontStarveTogether) 生成服务器令牌
:::

### 防火墙配置

确保以下端口已开放：

| 端口 | 协议 | 用途 |
|------|------|------|
| 8082 | TCP | 管理面板 |
| 10888 | UDP | 游戏服务器（可选） |
| 10998 | UDP | 洞穴服务器 |
| 10999 | UDP | 地面服务器 |

---

## 🛠️ 常见问题

### 1. 出现 `ln: failed to create symbolic link` 错误

**原因：** 未正确挂载 `/data` 目录

**解决方案：** 确保运行命令中包含以下参数：

```bash
-v ~/dstsave:/data
```

### 2. 管理面板端口无法访问

**排查步骤：**

1. 检查容器是否正常运行：
   ```bash
   docker ps
   ```

2. 检查端口映射是否正确：
   ```bash
   docker port dst-admin-go
   ```

3. 检查防火墙是否开放 8082 端口

4. 查看容器日志：
   ```bash
   docker logs dst-admin-go
   ```

### 3. 游戏服务器无法连接

**可能原因：**

- UDP 端口未正确映射
- 防火墙未开放游戏端口
- 服务器令牌配置错误

**解决方案：**

1. 确认端口映射：
   ```bash
   docker ps | grep dst-admin-go
   ```

2. 检查防火墙规则

3. 在管理面板中重新配置服务器令牌

### 4. 想完全重置所有数据

```bash
# 停止并删除容器
docker stop dst-admin-go
docker rm dst-admin-go

# 删除所有数据
rm -rf ~/dstsave

# 重新创建目录并运行容器
mkdir -p ~/dstsave
# 然后执行原来的 docker run 命令
```

::: danger 危险操作
此操作会删除所有存档、配置和数据，请谨慎操作！
:::

### 5. 如何查看实时日志

```bash
# 查看实时日志
docker logs -f dst-admin-go

# 查看最近 100 行日志
docker logs --tail 100 dst-admin-go
```

### 6. 容器无法启动或反复重启

**排查步骤：**

1. 查看容器状态：
   ```bash
   docker ps -a | grep dst-admin-go
   ```

2. 查看详细日志：
   ```bash
   docker logs dst-admin-go
   ```

3. 检查数据目录权限：
   ```bash
   ls -la ~/dstsave
   ```

---

## 📝 补充说明

### 关于版本号

建议使用 `latest` 标签来自动获取最新版本，或使用具体版本号（如 `1.6.1`）以确保：

- 环境一致性
- 可重现部署
- 避免意外更新

### 关于数据持久化

只要正确挂载了 `~/dstsave:/data`，以下数据都会持久保存：

- 世界存档
- 服务器配置
- 管理员账号
- 数据库文件

即使删除容器，数据也不会丢失。

### 关于服务器文件下载

- 新手部署：容器内自动下载到 `/data/steamcmd` 和 `/data/dst-dedicated-server`
- 进阶部署：使用主机上已有的文件，通过 Volume 挂载到容器内

---

## 🔗 相关链接

- [项目 GitHub 仓库](https://github.com/hujinbo23/dst-admin-go)
- [Klei 官方服务器文档](https://forums.kleientertainment.com/forums/topic/64441-dedicated-server-quick-setup-guide-linux/)
- [Docker Hub](https://hub.docker.com/r/hujinbo23/dst-admin-go)
