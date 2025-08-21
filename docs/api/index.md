---
outline: deep
---

# API 文档

::: warning
API 接口可能会在后续版本中发生变化，请注意兼容性。
:::

本文档提供了 `dst-admin-go` 管理面板的核心 API 接口说明，包括认证、服务器管理、世界管理、玩家管理等。

## 认证

大部分 API 接口需要通过 JWT Token 进行认证。您需要在请求头中添加 `Authorization: Bearer <token>`。

## 服务器管理

### 获取服务器状态

- **URL**: `/api/v1/server/status`
- **Method**: `GET`
- **Description**: 获取服务器当前运行状态、运行时间和版本信息。
- **Response**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "status": "running", // running, stopped, error
      "uptime": "123456", // 运行时间 (秒)
      "version": "1.2.3"  // 服务器版本
    }
  }
  ```

### 启动服务器

- **URL**: `/api/v1/server/start`
- **Method**: `POST`
- **Description**: 启动所有已配置的游戏世界。
- **Response**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": null
  }
  ```

### 停止服务器

- **URL**: `/api/v1/server/stop`
- **Method**: `POST`
- **Description**: 停止所有正在运行的游戏世界。
- **Response**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": null
  }
  ```

### 重启服务器

- **URL**: `/api/v1/server/restart`
- **Method**: `POST`
- **Description**: 重启所有游戏世界。
- **Response**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": null
  }
  ```

## 世界管理

### 获取世界列表

- **URL**: `/api/v1/worlds`
- **Method**: `GET`
- **Description**: 获取所有已配置的世界列表及其运行状态。
- **Response**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": [
      {
        "name": "Master",
        "type": "master", // master, caves
        "running": true
      },
      {
        "name": "Caves",
        "type": "caves",
        "running": true
      }
    ]
  }
  ```

### 启动指定世界

- **URL**: `/api/v1/worlds/{name}/start`
- **Method**: `POST`
- **Description**: 启动指定名称的游戏世界。
- **Response**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": null
  }
  ```

### 关闭指定世界

- **URL**: `/api/v1/worlds/{name}/stop`
- **Method**: `POST`
- **Description**: 关闭指定名称的游戏世界。
- **Response**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": null
  }
  ```

### 获取世界详情

- **URL**: `/api/v1/worlds/{name}`
- **Method**: `GET`
- **Description**: 获取指定世界详细配置信息。
- **Response**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "name": "Master",
      "type": "master",
      "running": true,
      "config": {
        // 世界配置内容
      }
    }
  }
  ```

## 玩家管理

### 获取在线玩家列表

- **URL**: `/api/v1/players`
- **Method**: `GET`
- **Description**: 获取当前所有在线玩家信息。
- **Response**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": [
      {
        "name": "Player1",
        "prefab": "wilson",
        "userid": "KU_1234567890ABCDEF",
        "clientid": "1234567890"
      }
    ]
  }
  ```

### 踢出玩家

- **URL**: `/api/v1/players/kick`
- **Method**: `POST`
- **Description**: 根据用户ID踢出在线玩家。
- **Body**:
  ```json
  {
    "userid": "KU_1234567890ABCDEF"
  }
  ```
- **Response**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": null
  }
  ```

### 封禁玩家

- **URL**: `/api/v1/players/ban`
- **Method**: `POST`
- **Description**: 根据用户ID封禁玩家。
- **Body**:
  ```json
  {
    "userid": "KU_1234567890ABCDEF"
  }
  ```
- **Response**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": null
  }
  ```