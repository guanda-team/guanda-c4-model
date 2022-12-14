# AppServeræ°éæ±

## ð¥ æ¶æ§

```mermaid
flowchart TB
  AppServer -->|HTTP| æ©å°è»é«
  AppServer -->|TCP| Database
  AppServer --> SharedMemory
```

---

## ð¥ Event

### ð¶ ååæ

- ç± DB è¼å¥ãæ¯å¦åç¨ App éå°ãçææ¨ï¼ä¸¦æ¸é¤ææéå°è³æ

### ð¶ App è¨»åéææ

- å°éæè³æå¯«å¥ DB

### ð¶ App è¨»é·éææ

- å°éæè³æå¾ DB ç§»é¤

---

## ð¥ Api

### ð¶ è¨­å®æ¯å¦åç¨ App éå°

```http
POST {{url}}/api/enableAppPairing
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "enable": true
}
```

### ð¶ æ©å°è»é«å¼å«è¨»åéæ

```http
POST {{url}}/api/registerAssmebly
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "matchMaterial": [boolean], // æ¯å¦æ¯å°æè³ª
  "insert": [boolean], // æ¯å¦æå¥å°ååç«¯(åªåèç)
  "data": [
    {
      "id": [string], // ID
      "material": [string], // æè³ª
      "materialNumber": [string], // ç´ æç·¨è
      "profile": [string], // æ·é¢è¦æ ¼
      "smeltingNumber": [string], // çè
      "source": [string], // å» å
      "length": [string] // é·åº¦
    },
    {
      "id": [string], // ID
      "material": [string], // æè³ª
      "materialNumber": [string], // ç´ æç·¨è
      "profile": [string], // æ·é¢è¦æ ¼
      "smeltingNumber": [string], // çè
      "source": [string], // å» å
      "length": [string] // é·åº¦
    }
  ]
}
```

### ð¶ æ©å°è»é«å¼å«è¨»é·éæ

```http
POST {{url}}/api/unregisterAssmebly
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "idList": [array<string>] // è¦è¨»é·çID
}
```

### ð¶ æ¥è©¢æ¯å¦åç¨ App éå°

```http
GET {{url}}/api/getEnableAppPairing
Authorization: Bearer {{token}}
```

### ð¶ è¼ªè©¢ App éæè³æ

```http
GET {{url}}/api/getAppPairingData
Authorization: Bearer {{token}}
```
