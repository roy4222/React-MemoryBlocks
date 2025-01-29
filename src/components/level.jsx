import React from 'react';
import styled from 'styled-components';
import { LEVELS } from './constants';

// 關卡資訊樣式
const LevelInfo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary}20;
  transition: all 0.3s ease;
`;

// 關卡管理器
export class LevelManager {
  constructor() {
    this.currentLevel = 1;
    this.levelInfo = LEVELS[0];
  }

  // 獲取當前關卡信息
  getCurrentLevelInfo() {
    return LEVELS[this.currentLevel - 1];
  }

  // 生成新題目
  generateQuestions() {
    const levelInfo = this.getCurrentLevelInfo();
    const blockCount = levelInfo.gridSize * levelInfo.gridSize;
    const sequence = [];
    
    // 確保生成的數字不重複
    const availableNumbers = Array.from({ length: blockCount }, (_, i) => i);
    
    for (let i = 0; i < levelInfo.requiredMatches; i++) {
      if (availableNumbers.length === 0) break;
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const selectedNumber = availableNumbers[randomIndex];
      sequence.push(selectedNumber);
      // 從可用數字中移除已選擇的數字
      availableNumbers.splice(randomIndex, 1);
    }
    
    return sequence;
  }

  // 進入下一關
  nextLevel() {
    if (this.currentLevel < LEVELS.length) {
      this.currentLevel += 1;
      this.levelInfo = LEVELS[this.currentLevel - 1];
      return true;
    }
    return false;
  }

  // 重置當前關卡
  resetLevel() {
    this.levelInfo = LEVELS[this.currentLevel - 1];
  }

  // 檢查是否最後一關
  isLastLevel() {
    return this.currentLevel === LEVELS.length;
  }
}

// Level 組件
const Level = ({ currentLevel }) => {
  const levelInfo = LEVELS[currentLevel - 1];
  
  return (
    <LevelInfo>
      Level {currentLevel}: {levelInfo.description}
    </LevelInfo>
  );
};

export default Level;