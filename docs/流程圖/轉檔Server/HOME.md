# è½æªServer

# æµç¨

## ð¥ BOM è¡¨è NC æªå¯å¥æµç¨

```mermaid
sequenceDiagram
  actor ä½¿ç¨è

  ä½¿ç¨è ->> ERP: å¯å¥BOMè¡¨èNCæª

  ERP ->> è½æªå¾®æå: è«æ±è½æª
  è½æªå¾®æå ->> ERP: åæè½æªçµæ

  ERP ->> æªæ¡æ¯å°å¾®æå: è«æ±æ¯å°
  æªæ¡æ¯å°å¾®æå ->> ERP: åææ¯å°çµæ

  ERP ->> ä½¿ç¨è: é¡¯ç¤ºæ¯å°çµæä¸¦è©¢ååä½µé¸é 
  ä½¿ç¨è ->> ERP: é¸æåä½µé¸é 

  ERP ->> æªæ¡åä½µå¾®æå: è«æ±åä½µ
  æªæ¡åä½µå¾®æå ->> ERP: åæåä½µçµæ

  Note over ERP: æªæ¡å¯å¥çµæ
```


# è½æª

## ð¥ ç¨é

ä½çºè½æªçå¾®æåï¼å°ä¾èª Tekla ç Bom è¡¨è NC æªçè³æï¼æèªè¡éç¼ç XML æä»¶ï¼è½ææç¸å°æçæ ¼å¼ã

## ð¥ Api

### ð¶ Request Sample

```http
POST /api/projectConvertFromBomAndNc
Authorization: Bearer <token>
Content-Type: application/json

{
  "bomContent": string,
  "ncContent": Array<string>
}
```

### ð¶ Response Sample

```http
{
  "assemblyTemplates": [
    {
      "name": string,
      "partTemplates: [
        {
          "name": string,
          "count": number,
        }
      ]
    }
  ],
  "partTemplates": [
    {
      "name": string,
      "specification": string,
      "length": number,
      "material": string,
      "ac": string?,
      "bo": string?,
    }
  ],
  "assmeblys": [
    {
      "id": "string",
      "name": string,
      "parts": [
        {
          "id": "string",
          "name": string,
        },
        {
          "id": "string",
          "name": string,
        }
      ]
    }
  ]
}
```

### ð¶ Request Body

| name       | type            | desc                      |
| ---------- | --------------- | ------------------------- |
| bomContent | `string`        | BOM è¡¨å§å®¹                |
| ncContent  | `Array<string>` | NC æªå§å®¹ï¼çºä¸åå­ä¸²é£å |

### ð¶ Response Body

| name              | type                 | desc         |
| ----------------- | -------------------- | ------------ |
| assemblyTemplates | `AssmeblyTemplate[]` | æ§ä»¶æ¨£æ¿é£å |
| partTemplates     | `PartTemplate[]`     | é¶ä»¶æ¨£æ¿é£å |
| assmeblys         | `Assmebly[]`         | æ§ä»¶é£å     |

### ð¶ AssmeblyTemplate

| name          | type                                   | desc         |
| ------------- | -------------------------------------- | ------------ |
| name          | `string`                               | æ§ä»¶ç·¨è     |
| partTemplates | `Array<{name: string; count: number}>` | é¶ä»¶æ¨£æ¿é£å |

### ð¶ PartTemplate

| name          | type      | desc       |
| ------------- | --------- | ---------- |
| name          | `string`  | é¶ä»¶ç·¨è   |
| specification | `string`  | æ·é¢è¦æ ¼   |
| length        | `number`  | é·åº¦       |
| material      | `string`  | æè³ª       |
| ac            | `string?` | å¤è¼ªå»æè¿° |
| bo            | `string?` | å­ç¾¤æè¿°   |

### ð¶ Assmebly

| name  | type     | desc     |
| ----- | -------- | -------- |
| id    | `string` | GUID     |
| name  | `string` | æ§ä»¶ç·¨è |
| parts | `Part[]` | é¶ä»¶é£å |

### ð¶ Part

| name | type     | desc     |
| ---- | -------- | -------- |
| id   | `string` | GUID     |
| name | `string` | é¶ä»¶ç·¨è |

## ð¥ Api Flow

```mermaid
graph TD;
  Error(Response with error message)
  CheckChecksum{Check if checksum valid?}
  CheckNC{Check if NC valid?}
  CheckBom{Check if BOM valid?}
  A(Receive Request) --> CheckChecksum
  CheckChecksum --> |Yes| CheckNC
  CheckChecksum --> |No| Error
  CheckNC --> |Yes| CheckBom
  CheckNC --> |No| Error
  CheckBom --> |Yes| B(Loop through all NC file contents)
  CheckBom --> |No| Error
  B --> C{Check if NC matches BOM?}
  C --> |Yes| B
  C --> |No| Error
  C --> |Finish| E(Convert NC file to JSON)
  E --> F(Convert BOM to JSON)
  F --> G(Merge BOM and NC)
  G --> H(Response with result)
```


# æªæ¡æ¯å°

## ð¥ ç¨é

æ¯è¼å©ä»½æä»¶çå·®ç°ï¼ä¸¦å°åå³å·®ç°çé¨åã

## ð¥ Api

### ð¶ Request Sample

```http
POST /api/projectDiff
Authorization: Bearer <token>
Content-Type: application/json

{
  "originProject": Project,
  "newProject": Project
}
```

### ð¶ Response Sample

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

### ð¶ Request Body

| name          | type      | desc               |
| ------------- | --------- | ------------------ |
| originProject | `Project` | åå§çå»£éå°æ¡æ ¼å¼ |
| newProject    | `Project` | å¯å¥çå»£éå°æ¡æ ¼å¼ |

### ð¶ Response Body

| name       | type         | desc     |
| ---------- | ------------ | -------- |
| diffResult | `DiffResult` | æ¯å°çµæ |

### ð¶ DiffResult

| name      | type                          | desc            |
| --------- | ----------------------------- | --------------- |
| key       | `string`                      | æ´åæ§å»ºæé¶ä»¶  |
| key.type  | `new` \| `change` \| `delete` | æ´åé¡å        |
| key.value | `number` \| `string`          | æ´åæ¸é/æ´åå¼ |


# æªæ¡åä½µ

## ð¥ ç¨é

å°å©åæªæ¡èç±ä½¿ç¨èæä½çé¸é åä½µæä¸åæªæ¡

## ð¥ Api

### ð¶ Request Sample

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

### ð¶ Response Sample

```http
{
  "resultProject": Project
}
```

### ð¶ Request Body

| name          | type           | desc               |
| ------------- | -------------- | ------------------ |
| originProject | `Project`      | åå§çå»£éå°æ¡æ ¼å¼ |
| newProject    | `Project`      | å¯å¥çå»£éå°æ¡æ ¼å¼ |
| mergeOptions  | `MergeOptions` | åä½µé¸é            |

### ð¶ MergeOptions

| name    | type     | desc           |
| ------- | -------- | -------------- |
| key     | `string` | æ´åæ§å»ºæé¶ä»¶ |
| optrion | `string` | ä½¿ç¨èé¸é      |

### ð¶ Response Body

| name          | type      | desc               |
| ------------- | --------- | ------------------ |
| resultProject | `Project` | åä½µçå»£éå°æ¡æ ¼å¼ |
