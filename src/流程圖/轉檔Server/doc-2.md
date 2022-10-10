# 檔案比對

## 🔥 用途

比較兩份文件的差異，並將回傳差異的部分。

## 🔥 Api

### 🔶 Request Sample

```http
POST /api/projectDiff
Authorization: Bearer <token>
Content-Type: application/json

{
  "originProject": Project,
  "newProject": Project
}
```

### 🔶 Response Sample

```http
{
  "diffResult": {
    "name1": {
      "type": "new",
      "value": "value"
    },
    "name2": {
      "type": "delete",
      "value": "value"
    },
  }
}
```

### 🔶 Request Body

| name          | type      | desc               |
| ------------- | --------- | ------------------ |
| originProject | `Project` | 原始的廣達專案格式 |
| newProject    | `Project` | 匯入的廣達專案格式 |

### 🔶 Response Body

| name       | type         | desc     |
| ---------- | ------------ | -------- |
| diffResult | `DiffResult` | 比對結果 |

### 🔶 DiffResult

| name      | type                          | desc            |
| --------- | ----------------------------- | --------------- |
| key       | `string`                      | 更動構建或零件  |
| key.type  | `new` \| `change` \| `delete` | 更動類型        |
| key.value | `number` \| `string`          | 更動數量/更動值 |
