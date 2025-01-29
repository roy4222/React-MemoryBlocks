import React, { useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { BLOCK_COLORS } from './constants';

// 縮放動畫
const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(${() => 0.95 + Math.random() * 0.1});
    }
    100% {
        transform: scale(1);
    }
`;

// 旋轉動畫
const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(${() => (Math.random() > 0.5 ? 5 : -5)}deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

// 位移動畫
const float = keyframes`
    0% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(
            ${() => (Math.random() > 0.5 ? 3 : -3)}px,
            ${() => (Math.random() > 0.5 ? 3 : -3)}px
        );
    }
    100% {
        transform: translate(0, 0);
    }
`;

// 波紋動畫
const rippleEffect = keyframes`
    0% {
        transform: scale(0);
        opacity: 0.8;
    }
    100% {
        transform: scale(4);
        opacity: 0;
    }
`;

// RGB呼吸燈動畫
const rgbBreathe = keyframes`
    0% {
        border-color: rgba(255, 0, 0, 0.8);
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
        filter: brightness(1.2);
    }
    14% {
        border-color: rgba(255, 0, 255, 0.7);
        box-shadow: 0 0 12px rgba(255, 0, 255, 0.4);
        filter: brightness(1.1);
    }
    28% {
        border-color: rgba(128, 0, 255, 0.9);
        box-shadow: 0 0 18px rgba(128, 0, 255, 0.6);
        filter: brightness(1.3);
    }
    42% {
        border-color: rgba(0, 255, 0, 0.6);
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
        filter: brightness(0.9);
    }
    56% {
        border-color: rgba(0, 255, 255, 0.85);
        box-shadow: 0 0 16px rgba(0, 255, 255, 0.5);
        filter: brightness(1.25);
    }
    70% {
        border-color: rgba(0, 0, 255, 0.9);
        box-shadow: 0 0 20px rgba(0, 0, 255, 0.7);
        filter: brightness(1.4);
    }
    84% {
        border-color: rgba(255, 255, 0, 0.75);
        box-shadow: 0 0 14px rgba(255, 255, 0, 0.45);
        filter: brightness(1.15);
    }
    100% {
        border-color: rgba(255, 0, 0, 0.8);
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
        filter: brightness(1.2);
    }
`;

// 邊框發光動畫
const borderShine = keyframes`
    0% {
        border-color: rgba(255, 182, 193, 0.6);
    }
    33% {
        border-color: rgba(147, 112, 219, 0.6);
    }
    66% {
        border-color: rgba(0, 255, 255, 0.6);
    }
    100% {
        border-color: rgba(255, 182, 193, 0.6);
    }
`;

// 不規則光暈效果
const glowEffect = keyframes`
    0% {
        box-shadow: 
            0 0 15px rgba(255, 182, 193, 0.4),
            0 0 30px rgba(147, 112, 219, 0.2),
            0 0 45px rgba(0, 255, 255, 0.1);
    }
    25% {
        box-shadow: 
            0 0 20px rgba(147, 112, 219, 0.5),
            0 0 35px rgba(0, 255, 255, 0.3),
            0 0 50px rgba(255, 182, 193, 0.1);
    }
    50% {
        box-shadow: 
            0 0 25px rgba(0, 255, 255, 0.6),
            0 0 40px rgba(255, 182, 193, 0.4),
            0 0 55px rgba(147, 112, 219, 0.2);
    }
    75% {
        box-shadow: 
            0 0 20px rgba(255, 182, 193, 0.5),
            0 0 35px rgba(147, 112, 219, 0.3),
            0 0 50px rgba(0, 255, 255, 0.1);
    }
    100% {
        box-shadow: 
            0 0 15px rgba(255, 182, 193, 0.4),
            0 0 30px rgba(147, 112, 219, 0.2),
            0 0 45px rgba(0, 255, 255, 0.1);
    }
`;

// 翻轉動畫
const flip = keyframes`
    0% {
        transform: perspective(1000px) rotateY(0);
    }
    100% {
        transform: perspective(1000px) rotateY(180deg);
    }
`;

// 播放動畫
const playPulse = keyframes`
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    }
    70% {
        transform: scale(1.1);
        box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
`;

// 容器樣式
const Container = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.medium};
`;

// 網格容器樣式
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$sideNum}, 1fr);
    gap: ${({ theme }) => theme.spacing.small};
    aspect-ratio: 1;
    perspective: 1000px;
`;

// 方塊樣式
const Block = styled.div.attrs(props => {
    // 計算動畫延遲
    const delays = useMemo(() => ({
        glowDelay: -Math.random() * 2,
        borderDelay: -Math.random() * 1.5
    }), []);

    // 計算動畫持續時間
    const durations = useMemo(() => ({
        glowDuration: 2 + Math.random() * 2,
        borderDuration: 1.5 + Math.random() * 1
    }), []);

    return {
        style: {
            animationDelay: props.$isPlaying 
                ? '0s' 
                : `${delays.glowDelay}s, ${delays.borderDelay}s`,
            animationDuration: props.$isPlaying
                ? '1s'
                : `${durations.glowDuration}s, ${durations.borderDuration}s`
        }
    };
})`
    // 基本定位和尺寸
    position: relative;
    width: 100%;
    aspect-ratio: 1;

    // 背景顏色設置
    background: ${({ theme, $isActive, $isPlaying, $color, $isAnswered }) => 
        $isPlaying 
            ? BLOCK_COLORS[$color].gradient
            : $isAnswered 
                ? BLOCK_COLORS[$color].gradient
                : theme.colors.background};
    background-size: 200% 200%;

    // 邊框和圓角設置
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;

    // 基礎3D效果
    transform-style: preserve-3d;
    perspective: 1000px;
    backface-visibility: visible;
    transition: transform 0.6s ease-in-out;
    position: relative;
    cursor: pointer;

    // 基礎動畫效果
    ${props => props.$isPlaying 
        ? css`
            animation: ${playPulse} ease-in-out;
          `
        : css`
            animation: 
                ${glowEffect} infinite ease-in-out,
                ${borderShine} infinite ease-in-out;
          `}

    // 保持正方形比例
    &::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    // 波紋效果
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 0;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }

    // 活動狀態的額外樣式
    ${({ $isActive }) => $isActive && css`
        animation: 
            ${glowEffect} 1.5s infinite ease-in-out,
            ${borderShine} 1s infinite ease-in-out,
            ${flip} 0.6s ease-in-out forwards;
        transform: perspective(1000px) rotateY(180deg);
        box-shadow: 
            0 0 30px rgba(255, 182, 193, 0.5),
            0 0 50px rgba(147, 112, 219, 0.3),
            0 0 70px rgba(0, 255, 255, 0.2);
    `}

    // 懸停效果
    &:hover {
        transform: 
            ${({ $isActive }) => $isActive ? 
                'perspective(1000px) rotateY(190deg)' : 
                'perspective(1000px) rotateY(10deg)'};
        box-shadow: 
            0 0 25px rgba(255, 182, 193, 0.6),
            0 0 45px rgba(147, 112, 219, 0.4),
            0 0 65px rgba(0, 255, 255, 0.3);
        z-index: 1;
    }

    // 點擊效果
    &:active {
        transform: 
            ${({ $isActive }) => $isActive ? 
                'perspective(1000px) rotateY(175deg)' : 
                'perspective(1000px) rotateY(5deg)'};
        box-shadow: 
            0 0 20px rgba(255, 182, 193, 0.4),
            0 0 35px rgba(147, 112, 219, 0.2),
            0 0 50px rgba(0, 255, 255, 0.1);
            
        &::after {
            ${css`animation: ${rippleEffect} 0.8s ease-out;`}
        }
    }
`;

// 方塊內容樣式
const BlockContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.typography.fontSize.medium};
    color: ${({ theme }) => theme.colors.text};
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

// 方塊組件
const Blocks = ({ 
    blockNum,               // 方塊總數
    questions = [],         // 題目序列
    answer = [],            // 玩家答案
    isGameStart = false,    // 遊戲是否開始
    onBlockClick,           // 方塊點擊處理函數
    currentPlayIndex = -1,  // 當前播放的題目索引
    isPlaying = false,      // 是否正在播放題目
    showAllAnswers = false  // 是否顯示所有答案
}) => {
    // 生成方塊陣列並分配顏色
    const blocks = new Array(blockNum).fill(0).map((_, index) => ({
        index,
        color: index % BLOCK_COLORS.length
    }));
    
    // 計算網格邊長
    const sideNum = Math.sqrt(blockNum);

    // 檢查方塊是否處於激活狀態
    const isBlockActive = (index) => {
        if (isPlaying) {
            // 播放模式：當前播放的方塊為激活狀態
            return currentPlayIndex >= 0 && 
                   currentPlayIndex < questions.length && 
                   index === questions[currentPlayIndex];
        }
        if (showAllAnswers) {
            // 顯示所有答案模式：題目中的方塊為激活狀態
            return questions.includes(index);
        }
        return false;
    };

    // 檢查方塊是否已經被回答
    const isBlockAnswered = (index) => {
        return answer.includes(index) || (showAllAnswers && questions.includes(index));
    };

    // 檢查方塊是否正在播放
    const isBlockPlaying = (index) => {
        return isPlaying && 
               currentPlayIndex >= 0 && 
               currentPlayIndex < questions.length && 
               index === questions[currentPlayIndex];
    };

    // 處理方塊點擊
    const handleBlockClick = (index) => {
        if (onBlockClick && isGameStart && !isPlaying && !showAllAnswers) {
            onBlockClick(index);
        }
    };

    // 渲染方塊網格
    return (
        <Container>
            <GridContainer $sideNum={sideNum}>
                {blocks.map(({ index, color }) => (
                    <Block 
                        key={index}
                        $isActive={isBlockActive(index)}
                        $isPlaying={isBlockPlaying(index)}
                        $isAnswered={isBlockAnswered(index)}
                        $color={color}
                        onClick={() => handleBlockClick(index)}
                    >
                        <BlockContent />
                    </Block>
                ))}
            </GridContainer>
        </Container>
    );
};

export default Blocks;