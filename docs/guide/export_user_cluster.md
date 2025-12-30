---
outline: deep
---

# 导入本地存档到面板

简介：面板可将本地的《饥荒：联机版》存档导入并进行管理。文档说明默认识别规则与自定义映射方式。

## 支持的默认存档格式

面板会自动识别常见的默认存档结构，例如：

```text
--Cluster_1
------Master
------Caves
```

默认映射：
- `Master` -> 主世界（在面板中通常显示为“森林”）
- `Caves` -> 洞穴世界（在面板中通常显示为“洞穴”）

导入此结构后，面板会自动识别并创建对应的两个世界项。

## 自定义存档（使用 level.json）

如果本地存档结构不是默认格式，需要在存档根目录创建 `level.json` 以告知面板如何映射世界名称与文件夹。

1. 将 `level.json` 放在存档根目录（即 Cluster 文件夹）下。
2. `level.json` 的基本结构为：

```json
{
  "levelList": [
    { "name": "显示名称", "file": "存档文件夹名" }
  ]
}
```

字段说明：
- `name`：面板中显示的世界名称（中文或自定义名称）。
- `file`：对应的存档文件夹名（必须与磁盘上文件夹名一致）。

示例：假设目录结构为

```text
---Cluster_2
------World_A
------World_B
------World_C
```

则可以在 `Cluster_2` 下创建如下 `level.json`：

```json
{"levelList":[{"name":"森林","file":"Master"},{"name":"洞穴","file":"World_B"},{"name":"地底","file":"World_C"}]}
```

放置后最终目录示例：

```text
---Cluster_2
------Master
------World_B
------World_C
------level.json
```

## 要求与注意事项

- 主世界文件夹必须命名为 `Master`，否则面板无法正确采集主世界数据。
- `level.json` 必须位于存档根目录（Cluster 目录）下。
- `file` 字段应精确对应文件夹名（注意大小写及空格问题）。
- 保证 `level.json` 为合法 JSON；若导入失败，先用 JSON 校验工具检查格式。
- 若只存在默认的 `Master` 与 `Caves`，无需 `level.json`，面板会自动识别。

## 常见问题排查

- 导入后未识别世界：确认 `Master` 是否存在且 `level.json` 放置在正确位置。
- 名称显示错误：检查 `level.json` 中 `name` 字段是否正确设置。
- JSON 解析错误：使用在线或本地 JSON 校验器检查 `levelList` 格式。
