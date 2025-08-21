---
outline: deep
---

# NAT VPS 部署

> [使用NAT VPS搭建饥荒游戏服务器](https://www.nodeseek.com/post-53609-1)

如果您使用的是 NAT VPS（网络地址转换虚拟私有服务器），需要注意一些特殊的配置要求。

## NAT VPS 的特点

NAT VPS 通常具有以下特点：
- 共享公网 IP 地址
- 端口需要手动映射
- 无法直接绑定公网 IP

## 配置要求

### 端口映射

需要在 VPS 控制面板中映射以下端口：

| VPS 端口 | 饥荒服务器端口 | 协议 | 用途 |
|--------|---------------|------|------|
| 10082  | 8082 | TCP | Web 管理面板 |
| 40999  | 10999 | UDP | 游戏服务器主端口（NAT映射） |
| 40998  | 10998 | UDP | 游戏服务器次端口 |

注意，映射端口后，虽然在饥荒游戏中可以搜索到房间，但是无法直接加入，需要在游戏中按下键盘左上角的~键调用控制台，并输入直连命令：c_connect("ip",40999,"12345")即可直接加入游戏。其中ip为vps的ip，40999为10999对应的NAT映射的外部端口，12345为房间密码。直连命令也可在dst-admin-go开服面板的操作面板中复制，注意更改端口。

## 安装和运行 dst-admin-go 开服面板

### 创建安装文件夹

```shell
mkdir /root/data/docker_data/dst   #创建dst文件夹
cd /root/data/docker_data/dst      #进入dst文件夹
```

### 编辑 docker-compose 配置文件

```shell
vim docker-compose.yml
```

```yaml
version: '3'
services:
  dst-admin-go:
    image: kairlec/dst-admin-go:${TAG:-latest}
    deploy:
      restart_policy:
        condition: always
        delay: 5s
        window: 60s
    container_name: dst-admin-go
    volumes:
      - ./dst-admin-go/saves:/root/.klei/DoNotStarveTogether # 游戏存档
      - ./dst-admin-go/backup:/app/backup # 游戏备份
      - ./dst-admin-go/mods:/app/mod # 游戏mod
    ports:
      - 8082:8082/tcp # for web dashboard
      - 10999:10999/udp # NAT mapped port for main game server
      - 10998:10998/udp # secondary game server port
```

### 运行

```shell
docker-compose up -d
```

## 注意事项

- 确保在 NAT VPS 控制面板中正确映射了 UDP 端口
- 使用正确的公网 IP 和端口信息分享给玩家
- 定期检查端口映射是否正常工作
- 如果遇到连接问题，检查防火墙设置和端口映射

饥荒服务器的集群配置和世界配置可以通过 DST Admin Go 的 Web 界面进行配置，无需手动编辑配置文件。

## 常见问题

### 端口映射后仍无法连接

1. 检查 VPS 控制面板中的端口映射是否已正确应用
2. 确认防火墙规则允许相应端口的流量
3. 验证饥荒服务器是否正在运行并监听正确端口

### 玩家无法加入游戏

1. 确认分享给玩家的连接信息（IP 和端口）是否正确
2. 检查集群配置中的 `cluster_key` 是否设置正确
3. 验证玩家是否有网络连接问题