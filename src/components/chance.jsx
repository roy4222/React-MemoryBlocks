// 引入必要的 React 和 styled-components 庫
import React from 'react';
import styled from 'styled-components';

// 定義機會容器的樣式
const ChanceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary}10;
`;

// 定義機會圖標的樣式
const ChanceIcon = styled.span`
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.border};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  transition: all 0.3s ease;
  opacity: ${({ $active }) => $active ? 1 : 0.3};
`;

// 定義機會文字的樣式
const ChanceText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  margin-right: ${({ theme }) => theme.spacing.small};
`;

// 定義 Chance 組件
const Chance = ({ chances }) => {
  return (
    <ChanceContainer>
      <ChanceText>剩餘生命：</ChanceText>
      {/* 生成三個心形圖標，根據剩餘機會數量設置活躍狀態 */}
      {[...Array(3)].map((_, index) => (
        <ChanceIcon key={index} $active={index < chances}>
          ❤️
        </ChanceIcon>
      ))}
    </ChanceContainer>
  );
};

// 導出 Chance 組件
export default Chance;