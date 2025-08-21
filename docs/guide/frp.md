# Frp转发饥荒中转站

在某些网络环境下（例如内网、NAT、无公网IP），直接将饥荒联机版服务器暴露到公网供玩家连接可能会遇到困难。这时可以使用 FRP (Fast Reverse Proxy) 这样的内网穿透工具，将内网的服务器端口映射到具有公网IP的中转服务器上，从而让外部玩家能够连接到您的游戏服务器。

## 什么是 FRP？

FRP 是一个高性能的反向代理应用，可以帮助您轻松地进行内网穿透，对外网暴露内网服务。它支持 TCP、UDP、HTTP、HTTPS 等多种协议。

## 基本原理

1.  **FRP 服务端 (frps)**: 运行在一台具有公网 IP 的服务器上，负责监听来自客户端的连接请求。
2.  **FRP 客户端 (frpc)**: 运行在您的本地机器或内网服务器上，与 FRP 服务端建立连接，并将本地的饥荒服务器端口转发出去。
3.  **数据流**:
    *   玩家连接到 FRP 服务端的公网 IP 和指定端口。
    *   FRP 服务端将请求转发给 FRP 客户端。
    *   FRP 客户端再将请求转发给本机的饥荒服务器。
    *   饥荒服务器的响应则按相反路径返回给玩家。

## 配置步骤

### 1. 准备工作

*   一台具有公网 IP 的服务器（作为 FRP 服务端）。
*   您的本地饥荒服务器（作为 FRP 客户端）。
*   下载对应您系统和架构的 FRP 程序。可以从 [FRP GitHub Releases](https://github.com/fatedier/frp/releases) 页面下载。

### 2. 配置 FRP 服务端 (frps)

在您的公网服务器上：

1.  解压 FRP 程序包。
2.  编辑 `frps.ini` 配置文件：
    ```ini
    [common]
    # 服务端监听的端口，用于与客户端通信
    bind_port = 7000

    # 用于身份验证的 token，客户端需要配置相同的值
    token = your_strong_token

    # (可选) 仪表盘，用于查看 frp 的状态以及代理统计信息
    dashboard_port = 7500
    dashboard_user = admin
    dashboard_pwd = admin
    ```
3.  启动 FRP 服务端：
    ```bash
    ./frps -c ./frps.ini
    ```
    建议使用 `systemd` 或 `supervisor` 等工具将其作为后台服务运行。

### 3. 配置 FRP 客户端 (frpc)

在您的本地饥荒服务器上：

1.  解压 FRP 程序包。
2.  编辑 `frpc.ini` 配置文件。由于饥荒需要转发多个端口（主世界和洞穴世界），我们需要为每个世界配置一个 TCP 代理：
    ```ini
    [common]
    # FRP 服务端的公网 IP 地址
    server_addr = x.x.x.x
    # FRP 服务端监听的端口，与 frps.ini 中的 bind_port 一致
    server_port = 7000
    # 与服务端相同的 token
    token = your_strong_token

    # 饥荒主世界 TCP 代理
    [dst-master]
    type = tcp
    # 本地饥荒主世界监听的端口 (例如 11000)
    local_port = 11000
    # FRP 服务端对外暴露的端口，玩家连接时使用此端口
    remote_port = 11000

    # 饥荒洞穴世界 TCP 代理 (如果启用了洞穴)
    [dst-caves]
    type = tcp
    # 本地饥荒洞穴世界监听的端口 (例如 11001)
    local_port = 11001
    # FRP 服务端对外暴露的端口，玩家连接时使用此端口
    remote_port = 11001
    ```
    注意：`local_port` 需要与您在饥荒服务器配置文件中设置的 `server_port` 一致。`remote_port` 是外部玩家连接时使用的端口，您可以自定义，但需要确保它没有被其他服务占用且在服务端防火墙中开放。

3.  启动 FRP 客户端：
    ```bash
    ./frpc -c ./frpc.ini
    ```
    同样建议使用后台服务方式运行。

### 4. 防火墙配置

确保您的公网服务器防火墙允许以下端口的入站连接：
*   FRP 服务端通信端口（如 `7000`）。
*   您为饥荒服务器映射的所有 `remote_port`（如 `11000`, `11001`）。
*   (可选) FRP 仪表盘端口（如 `7500`）。

### 5. 玩家连接

玩家在饥荒游戏中添加服务器时，需要填写：
*   **IP**: 您的 FRP 服务端公网 IP 地址。
*   **端口**: 您在 `frpc.ini` 中为对应世界设置的 `remote_port`（例如 `11000` for Master, `11001` for Caves）。

## 注意事项

*   **安全性**: 强烈建议为 FRP 配置强密码或 Token 进行身份验证，并考虑启用 TLS 加密。
*   **性能**: 中转服务器的带宽和延迟会直接影响玩家的游戏体验。
*   **稳定性**: 确保 FRP 服务端和客户端稳定运行。
*   **端口冲突**: 确保映射的 `remote_port` 在公网服务器上没有冲突。

通过 FRP，您可以轻松地将内网的饥荒服务器分享给公网玩家，解决无公网 IP 的问题。