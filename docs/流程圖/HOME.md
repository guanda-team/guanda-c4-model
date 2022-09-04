# 流程圖

# 軟體專案同步

## 🔥 軟體啟動時

```mermaid
sequenceDiagram
  actor 使用者
  Note over 軟體: 軟體已啟動並連上Server

  軟體 ->> Server: 啟動後詢問是否有專案需同步
  Server ->> 軟體: 回應同步資訊

  alt 無專案需同步
    軟體 ->> 軟體: 結束同步流程
  else 有專案需同步
    軟體 ->> 使用者: 詢問使用者是否同意立即同步專案
    alt 使用者不同意同步專案
      使用者 ->> 使用者: 結束同步流程
    else 使用者同意同步專案
      使用者 ->> 軟體: 同意後，開始同步
      軟體 ->> 軟體: 同步並在本地儲存專案
    end
  end
```

---

## 🔥 軟體收到同步資訊時

```mermaid
sequenceDiagram
  actor 使用者
  Note over 軟體: 軟體已啟動並連上Server

  loop 每當有專案需同步時
    Server ->> 軟體: 通知有新的同步資訊
    軟體 ->> 使用者: 詢問使用者是否要同步

    alt 使用者拒絕同步
      使用者 ->> 使用者:    略過本次同步
    else 使用者同意同步
      使用者 ->> 軟體: 同意後，開始同步
      軟體 ->> 軟體: 同步
    end
  end
```

---

## 🔥 軟體存檔時

```mermaid
sequenceDiagram
  actor 使用者
  Note over 軟體: 軟體已啟動並連上Server

  使用者 ->> 軟體: 存檔/另存新檔
  軟體 ->> Server: 通知Server需同步
```

---

## 🔥 機台軟體專案同步

```mermaid
sequenceDiagram
  actor 使用者

  機台軟體 ->> Server: 啟動後詢問是否有專案需同步
  Server ->> 機台軟體: 回應同步資訊
  機台軟體 ->> 使用者: 若有的話，詢問使用者
  使用者 ->> 機台軟體: 同意後，開始同步
  機台軟體 ->> 機台軟體: 同步

  loop 每當有專案需同步時
    Server ->> 機台軟體: 通知有新的同步資訊
    機台軟體 ->> 使用者: 若有的話，詢問使用者
    使用者 ->> 機台軟體: 同意後，開始同步
    機台軟體 ->> 機台軟體: 同步
  end

  loop 每當存檔時
    機台軟體 ->> Server: 通知Server需備份
  end
```


# 軟體更新流程

## 🔥 軟體更新流程

```mermaid
sequenceDiagram
  actor 使用者

  軟體 ->> Server: 通知Server軟體已啟動，並帶上現在版號
  Server ->> 軟體: 回應版本資訊
  alt 無新版本
    軟體 ->> 軟體: 結束更新流程
  else 有新版本
    軟體 ->> 使用者: 詢問使用者是否同意立即下載更新

    alt 使用者不同意下載更新
      使用者 ->> 使用者: 結束更新流程
    else 使用者同意下載更新
      使用者 ->> 軟體: 同意後，請Server下載新版本
      軟體 ->> Server: 通知下載新版本
      Server ->> Server: 下載中
      Server ->> 軟體: 回應下載資訊與安裝檔
      Note over 軟體: 下載完畢，進入安裝流程
    end
  end
```

---

## 🔥 軟體安裝流程

```mermaid
sequenceDiagram
  actor 使用者

  Note over 軟體: 本地端有新版安裝檔後
  軟體 ->> 使用者: 詢問使用者是否立刻安裝更新
  alt 使用者不同意安裝更新
    使用者 ->> 使用者: 結束安裝流程
  else 使用者同意安裝更新
    使用者 ->> 軟體: 回應安裝更新
    軟體 ->> 安裝助手: 開啟安裝助手
    安裝助手 ->> 軟體: 關閉軟體
    安裝助手 ->> 安裝助手: 安裝更新
    安裝助手 ->> 軟體: 開啟軟體
  end
```


# 軟體登入流程

## 🔥 單機軟體登入

```mermaid
sequenceDiagram
  App ->> ERP: 對ERP登入
  alt 驗證失敗
    ERP ->> App: 登入失敗
  else 驗證成功
    ERP ->> App: 驗證成功並取得token
    Note right of App: 驗證完畢，開始進行操作
    App ->> App伺服器: 使用token操作機台
  end
```

---

## 🔥 機聯網(內網)軟體登入

```mermaid
sequenceDiagram
  App ->> ERP: 對ERP登入
  alt 驗證失敗
    ERP ->> App: 登入失敗
  else 驗證成功
    ERP ->> App: 驗證成功並取得token

    Note right of App: 驗證完畢，開始進行操作
    App ->> Server: 將token傳送至中央伺服器
    Server ->> App伺服器: 使用token操作機台
  end
```

---

## 🔥 機聯網(外網)軟體登入

```mermaid
sequenceDiagram
  App ->> ERP: 對ERP登入
  alt 驗證失敗
    ERP ->> App: 登入失敗
  else 驗證成功
    ERP ->> App: 驗證並取得token
    App ->> Server: 將token傳送至中央伺服器
    Server ->> ERP: 驗證token資訊
    alt token驗證失敗
      ERP ->> Server: 驗證失敗
    else token驗證成功
      ERP ->> Server: 驗證成功
      Note right of ERP: 驗證完畢，開始進行操作
      Server ->> App伺服器: 使用token操作機台
    end
  end
```
