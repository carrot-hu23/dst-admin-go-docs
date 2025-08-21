---
outline: deep
---

# 配置说明

`dst-admin-go` 的配置文件位于程序运行目录下的 `config.yaml`。

## config.yaml 配置项

```yaml
#启动端口
port: 8082
#数据库
database: dst-db
```

+ password.txt

  存储用户登录的账号和密码（明文），所以不要泄漏自己的ip
  ```text
  username = admin
  password = 123456
  displayName = admin
  photoURL= 
  email = xxx
  ```
+ fist

  代表了是否第一次初始化

## dst_config 配置文件

`dst_config` 文件包含了饥荒服务器的核心配置信息，这些配置项在 Linux 环境下通常通过安装脚本自动设置，而在 Windows 环境下需要手动配置或通过管理面板的系统设置进行配置。

### 配置项说明

```ini
steamcmd=/root/steamcmd
force_install_dir=/root/dst-dedicated-server
donot_starve_server_directory=
persistent_storage_root=
cluster=MyDediServer
backup=/root/.klei/DoNotStarveTogether
mod_download_path=/root/.klei/DoNotStarveTogether
bin=32
beta=0
```

#### 详细说明

- `steamcmd`: SteamCMD 的安装路径
  - Linux 示例: `/root/steamcmd`
  - Windows 示例: `C:\steamcmd\steamcmd.exe`

- `force_install_dir`: 饥荒专用服务器的安装路径
  - Linux 示例: `/root/dst-dedicated-server`
  - Windows 示例: `C:\dst-dedicated-server`

- `donot_starve_server_directory`: (可选) 饥荒服务器目录，通常与 `force_install_dir` 相同

- `persistent_storage_root`: (可选) 存档存储根目录

- `cluster`: 集群名称，对应存档目录下的子目录名
  - 默认值: `MyDediServer`

- `backup`: 存档备份路径
  - Linux 示例: `/root/.klei/DoNotStarveTogether`
  - Windows 示例: `C:\Users\[用户名]\Documents\Klei\DoNotStarveTogether`

- `mod_download_path`: MOD 下载路径
  - Linux 示例: `/root/.klei/DoNotStarveTogether`
  - Windows 示例: `C:\Users\[用户名]\Documents\Klei\DoNotStarveTogether`

- `bin`: 服务器架构
  - `32`: 使用 32 位版本
  - `64`: 使用 64 位版本

- `beta`: 是否使用测试版本
  - `0`: 使用稳定版本
  - `1`: 使用测试版本

### Windows 环境配置

在 Windows 环境下，您需要手动配置这些路径或通过管理面板的系统设置进行配置：

1. 启动 `dst-admin-go.exe` 后，访问管理面板 (http://localhost:8082)
2. 登录后，进入"系统设置"页面
   - SteamCMD 路径: 例如 `C:\steamcmd\steamcmd.exe`
   - 饥荒服务器路径: 例如 `C:\dst-dedicated-server`
   - 存档备份路径: 例如 `C:\Users\[你的用户名]\Documents\Klei\DoNotStarveTogether`
   - MOD 下载路径: 通常与存档备份路径相同

请根据您的实际环境修改这些配置项。