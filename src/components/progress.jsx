// 引入必要的 React 和 styled-components 庫
import React from 'react';
import styled from 'styled-components';
import { LEVELS } from './constants';

// 定義進度條容器的樣式
const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

// 定義進度條背景的樣式
const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`;

// 定義進度條填充部分的樣式
const ProgressFill = styled.div`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease;
`;

// 定義進度信息顯示區域的樣式
const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.text};
`;

// 定義 Progress 組件
const Progress = ({ currentLevel, matchedPairs, timeRemaining }) => {
  // 獲取當前關卡信息
  const levelInfo = LEVELS[currentLevel - 1];
  // 計算進度百分比
  const progress = (matchedPairs / levelInfo.requiredMatches) * 100;
  
  return (
    <ProgressContainer>
      <ProgressBar>
        <ProgressFill $progress={progress} />
      </ProgressBar>
      <ProgressInfo>
        <span>配對進度: {matchedPairs}/{levelInfo.requiredMatches}</span>
        <span>剩餘時間: {timeRemaining}秒</span>
      </ProgressInfo>
    </ProgressContainer>
  );
};

// 導出 Progress 組件
export default Progress;