# 檔案合併

## 🔥 用途

將兩個檔案藉由使用者操作的選項合併成一個檔案

## 🔥 Api

### 🔶 Request Sample

```http
POST /api/projectMerge
Authorization: Bearer <token>
Content-Type: application/json

{
  "originProject": Project,
  "newProject": Project,
  "mergeOptions": MergeOptions
}
```

### 🔶 Response Sample

```http
{
  "resultProject": Project
}
```

### 🔶 Request Body

| name          | type           | desc               |
| ------------- | -------------- | ------------------ |
| originProject | `Project`      | 原始的廣達專案格式 |
| newProject    | `Project`      | 匯入的廣達專案格式 |
| mergeOptions  | `MergeOptions` | 合併選項           |

### 🔶 MergeOptions

| name    | type     | desc           |
| ------- | -------- | -------------- |
| key     | `string` | 更動構建或零件 |
| optrion | `string` | 使用者選項     |

### 🔶 Response Body

| name          | type      | desc               |
| ------------- | --------- | ------------------ |
| resultProject | `Project` | 合併的廣達專案格式 |
