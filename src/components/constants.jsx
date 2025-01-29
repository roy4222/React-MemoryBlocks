// 定義遊戲狀態
export const GAME_STATUS = {
  READY: 'ready',
  PLAYING: 'playing',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

// 定義遊戲關卡設定
export const LEVELS = [
  {
    id: 1,
    name: "新手入門",
    description: "從簡單的 2x2 方塊開始",
    gridSize: 2,
    timeLimit: 30,
    requiredMatches: 2
  },
  {
    id: 2,
    name: "記憶挑戰",
    description: "進階到 3x3 方塊",
    gridSize: 3,
    timeLimit: 45,
    requiredMatches: 4
  },
  {
    id: 3,
    name: "專家級別",
    description: "挑戰 4x4 方塊",
    gridSize: 4,
    timeLimit: 60,
    requiredMatches: 8
  }
];

// 方塊顏色
export const BLOCK_COLORS = [
  {
    primary: '#FF6B6B',    // 紅色
    secondary: '#FF8787',
    gradient: 'linear-gradient(45deg, #FF6B6B, #FF8787)'
  },
  {
    primary: '#4ECDC4',    // 青色
    secondary: '#45B7AF',
    gradient: 'linear-gradient(45deg, #4ECDC4, #45B7AF)'
  },
  {
    primary: '#FFE66D',    // 黃色
    secondary: '#FFD93D',
    gradient: 'linear-gradient(45deg, #FFE66D, #FFD93D)'
  },
  {
    primary: '#95E1D3',    // 薄荷綠
    secondary: '#81C8BB',
    gradient: 'linear-gradient(45deg, #95E1D3, #81C8BB)'
  },
  {
    primary: '#A8E6CF',    // 淺綠
    secondary: '#94D3BC',
    gradient: 'linear-gradient(45deg, #A8E6CF, #94D3BC)'
  },
  {
    primary: '#DCD6F7',    // 淺紫
    secondary: '#C4BEE0',
    gradient: 'linear-gradient(45deg, #DCD6F7, #C4BEE0)'
  },
  {
    primary: '#F4BFBF',    // 粉紅
    secondary: '#E0A9A9',
    gradient: 'linear-gradient(45deg, #F4BFBF, #E0A9A9)'
  },
  {
    primary: '#95B8D1',    // 淺藍
    secondary: '#82A4BC',
    gradient: 'linear-gradient(45deg, #95B8D1, #82A4BC)'
  },
  {
    primary: '#B5EAEA',    // 天藍
    secondary: '#A2D7D7',
    gradient: 'linear-gradient(45deg, #B5EAEA, #A2D7D7)'
  }
];