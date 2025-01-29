# 記憶方塊遊戲 (Memory Cube)

一個充滿趣味性的記憶方塊遊戲，考驗玩家的記憶力和反應速度。玩家需要在限定時間內記住並點擊亮起的方塊，隨著關卡的進展，難度會逐漸提高。

## 功能特色

- 多關卡設計：從簡單的 2x2 網格開始，逐步提升到更具挑戰性的 4x4 網格。
- 漸進式難度提升：每個關卡都會增加需要記憶的方塊數量和縮短反應時間。
- 即時進度顯示：清晰的進度條顯示當前關卡的完成情況。
- 生命值系統：玩家有多次機會，失誤不會立即結束遊戲。
- 深色/淺色主題切換：根據個人喜好或環境光線選擇合適的界面主題。
- 流暢的動畫效果：方塊點亮、選中和關卡完成時都有精心設計的動畫效果。

## 使用技術

- React 18：用於構建用戶界面的 JavaScript 庫。
- Vite：現代前端構建工具，提供極速的開發體驗。
- Styled Components：CSS-in-JS 解決方案，實現組件級的樣式封裝。
- ESLint：JavaScript 代碼檢查工具，確保代碼質量和一致性。

## 安裝

確保您的系統已安裝 Node.js (推薦版本 14.0.0 或更高)。

```bash
# 克隆倉庫
git clone https://github.com/your-username/memory-cube.git

# 進入項目目錄
cd memory-cube

# 安裝依賴
npm install
```

## 開發指令

- `npm run dev` - 啟動開發伺服器，默認運行在 http://localhost:5173
- `npm run build` - 構建生產版本，輸出到 `dist` 目錄
- `npm run preview` - 本地預覽生產構建，用於測試生產版本
- `npm run lint` - 執行 ESLint 進行代碼檢查，幫助維護代碼質量

## 項目結構

```
memory-cube/
│
├── src/
│   ├── components/     # React 組件
│   ├── styles/         # 全局樣式和主題
│   ├── App.jsx         # 主應用組件
│   └── main.jsx        # 應用入口點
│
├── public/             # 靜態資源
├── .eslintrc.json      # ESLint 配置
├── package.json        # 項目依賴和腳本
└── vite.config.js      # Vite 配置文件
```

## 貢獻

歡迎提交 Pull Requests 來改進遊戲。在提交之前，請確保您的代碼符合項目的編碼規範，並通過所有測試。

## 許可證

本項目採用 MIT 許可證。詳情請見 [LICENSE](LICENSE) 文件。