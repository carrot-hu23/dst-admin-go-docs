# 使用 FRP 进行内网穿透

当你的 Don't Starve Together (DST) 服务器运行在内网环境中时，为了让外部玩家能够连接到你的服务器，你需要使用内网穿透工具。FRP (Fast Reverse Proxy) 是一个高性能的反向代理应用，可以帮助你轻松地将内网服务暴露到公网。

本指南将详细介绍如何使用 FRP 为 DST 服务器配置内网穿透，特别是处理“森林”（地面世界）和“洞穴”（地下世界）这两个世界的端口映射。

## 前提条件

- 一台具有公网 IP 的服务器（用于部署 FRP 服务端）
- 本地运行 DST 服务器的机器（FRP 客户端）
- 已安装并配置好 DST 服务器
- 下载并安装 FRP 工具

## FRP 配置

FRP 配置分为服务端和服务客户端两部分。

### 服务端配置 (frps.toml)

在你的公网服务器上，配置 FRP 服务端。

```toml
bindPort = 7000
token = "your_token_here"
```

- `bindPort`: FRP 服务端监听的端口，用于与客户端通信。
- `token`: 用于客户端和服务端之间身份验证的令牌。

启动 FRP 服务端：

```bash
./frps -c ./frps.toml
```

### 客户端配置 (frpc.toml)

在运行 DST 服务器的本地机器上，配置 FRP 客户端。

```toml
serverAddr = "x.x.x.x"
serverPort = 7000
token = "your_token_here"

[[proxies]]
name = "dst-master"
type = "tcp"
localIP = "127.0.0.1"
localPort = 10999
remotePort = 10999

[[proxies]]
name = "dst-caves"
type = "tcp"
localIP = "127.0.0.1"
localPort = 10998
remotePort = 10998
```

- `serverAddr`: 公网服务器的 IP 地址。
- `serverPort`: FRP 服务端监听的端口 (与服务端 `bindPort` 一致)。
- `token`: 与服务端相同的令牌。
- `[[proxies]]`: 代理配置部分，可以定义多个代理。
  - `name`: 代理的名称，用于标识不同的服务。
  - `type`: 代理类型，DST 使用 TCP。
  - `localIP`: 本地 DST 服务器的 IP 地址。
  - `localPort`: 本地 DST 世界的端口。
  - `remotePort`: 公网服务器上映射的端口，外部玩家将通过此端口连接。

启动 FRP 客户端：

```bash
./frpc -c ./frpc.toml
```

## DST 服务器配置

确保你的 DST 服务器配置文件 `cluster.ini` 中的端口设置与 FRP 客户端配置中的 `localPort` 一致。

### cluster.ini

```ini
[NETWORK]
server_port = 10999
```

### caves.ini (如果使用独立洞穴)

```ini
[NETWORK]
server_port = 10998
```

## 防火墙设置

确保你的本地防火墙允许 FRP 客户端和 DST 服务器的端口通过。

- DST “森林”端口 (默认 10999/TCP)
- DST “洞穴”端口 (默认 10998/TCP)
- FRP 客户端与服务端通信端口 (默认 7000/TCP)

## 连接服务器

外部玩家可以通过以下方式连接到你的服务器：

- **服务器地址**: 你的公网服务器 IP 地址
- **端口**: 
  - 连接“森林”世界: 你在 `frpc.toml` 中为 `dst-master` 设置的 `remotePort` (例如 10999)
  - 连接“洞穴”世界: 你在 `frpc.toml` 中为 `dst-caves` 设置的 `remotePort` (例如 10998)

## 克雷IP中转站设置

在使用 FRP 进行内网穿透后，你可能会遇到以下情况：
- 通过 `c_connect("服务器IP", 端口)` 命令直接连接服务器时网络流畅。
- 但通过游戏大厅列表进入房间时会出现卡顿或连接不稳定的问题。

这是由于通过大厅连接时，数据传输路径与直接连接不同。为了解决这个问题，你可以使用克雷官方提供的 IP 中转服务。

### 设置步骤

1. 访问克雷IP中转站网站：[https://server.dstapi.com/server/](https://server.dstapi.com/server/)
2. 在网站上注册并登录你的账户。
3. 按照网站指引，将你的服务器信息（公网IP地址和端口）提交到中转站。
4. 提交后，网站会为你生成一个中转服务器地址。
5. 玩家通过游戏大厅连接时，会自动使用这个中转服务器，从而改善连接质量。

### 注意事项

- 使用克雷IP中转站服务是免费的。
- 该服务可以显著改善通过游戏大厅连接的体验。
- 如果你已经有稳定的直接连接方式，不一定需要使用此服务。
- 提交服务器信息后，可能需要等待一段时间才能生效。

## 注意事项

- `remotePort` 在 FRP 服务端必须是唯一的，不能与其他服务冲突。
- 如果你的公网服务器有防火墙，请确保 `remotePort` 是开放的。
- FRP 服务端和客户端的 `token` 必须一致，以确保安全连接。
- 如果你只有一个公网端口可用，可以考虑使用 FRP 的端口复用功能，但这通常会增加配置的复杂性。

通过以上配置，你就可以成功地使用 FRP 将你的 DST 服务器暴露到公网，让外部玩家能够连接到你的“森林”和“洞穴”世界了。