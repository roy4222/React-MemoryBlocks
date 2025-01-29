// 引入必要的 React 和 styled-components 庫
import React from 'react';
import styled from 'styled-components';
import { LEVELS } from './constants';

// 定義標題容器的樣式
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  text-align: center;
`;

// 定義關卡標題的樣式
const LevelTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

// 定義關卡描述的樣式
const LevelDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  opacity: 0.8;
`;

// Title 組件：顯示當前關卡的標題和描述
const Title = ({ currentLevel }) => {
  // 根據當前關卡獲取相應的關卡信息
  const levelInfo = LEVELS[currentLevel - 1];

  return (
    <TitleContainer>
      <LevelTitle>第 {levelInfo.id} 關：{levelInfo.name}</LevelTitle>
      <LevelDescription>{levelInfo.description}</LevelDescription>
    </TitleContainer>
  );
};

// 導出 Title 組件
export default Title;