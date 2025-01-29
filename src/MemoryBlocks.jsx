import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Blocks from './components/blocks';
import Title from './components/title';
import Progress from './components/progress';
import Chance from './components/chance';
import { GAME_STATUS } from './components/constants';
import { LevelManager } from './components/level';

// 成功動畫
const successAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// 失敗動畫
const failureAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

// 定義背景容器樣式
const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.large};
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

// 定義內容容器樣式
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

// 定義按鈕組容器樣式
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  position: relative;
  z-index: 1;
`;

// 定義標題樣式
const TitleHeader = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 定義方塊容器樣式
const BlockContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.medium};
  margin: ${({ theme }) => theme.spacing.medium} 0;
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.primary}10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  // 添加動畫效果
  animation: ${props => {
    if (props.$gameStatus === GAME_STATUS.COMPLETED) return successAnimation;
    if (props.$gameStatus === GAME_STATUS.FAILED) return failureAnimation;
    return 'none';
  }} 0.5s ease;
`;

// 定義遊戲按鈕樣式
const GameButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  margin-left: ${({ theme }) => theme.spacing.small};
  border: none;
  border-radius: 16px;
  background: ${({ $variant, theme }) => {
    switch ($variant) {
      case 'start':
        return `linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(33, 150, 243, 0.9))`;
      case 'next':
        return `linear-gradient(135deg, rgba(33, 150, 243, 0.9), rgba(156, 39, 176, 0.9))`;
      case 'retry':
        return `linear-gradient(135deg, rgba(244, 67, 54, 0.9), rgba(233, 30, 99, 0.9))`;
      default:
        return `linear-gradient(135deg, rgba(158, 158, 158, 0.9), rgba(96, 125, 139, 0.9))`;
    }
  }};
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  font-weight: 500;
  font-size: 0.95rem;
  min-width: 130px;
  height: 42px;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, 
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%);
    transform: translateX(-100%);
    transition: transform 0.6s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    filter: brightness(1.1);

    &::before {
      transform: translateX(100%);
    }
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .icon {
    font-size: 1.2rem;
    margin-right: ${({ theme }) => theme.spacing.small};
    transition: transform 0.3s ease;
  }

  &:hover .icon {
    transform: scale(1.2);
  }
`;

const MemoryBlocks = ({ isDarkMode, setIsDarkMode }) => {
  // 關卡管理器
  const levelManager = useRef(new LevelManager());
  
  // 遊戲狀態相關的 state
  const [currentLevel, setCurrentLevel] = useState(1);         // 當前關卡
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.READY);  // 遊戲狀態
  const [matchedPairs, setMatchedPairs] = useState(0);         // 已匹配的配對數
  const [timeRemaining, setTimeRemaining] = useState(levelManager.current.getCurrentLevelInfo().timeLimit);  // 剩餘時間
  const [questions, setQuestions] = useState([]);              // 當前關卡的題目序列
  const [answer, setAnswer] = useState([]);                    // 玩家的答案序列
  const [isLoading, setIsLoading] = useState(false);           // 加載狀態
  const [isPlaying, setIsPlaying] = useState(false);           // 是否正在播放題目
  const [currentPlayIndex, setCurrentPlayIndex] = useState(-1);  // 當前播放的題目索引
  const [chances, setChances] = useState(3);                   // 玩家剩餘機會

  // 音效函數
  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // 設置音效類型
    switch (type) {
      case 'success':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
      case 'failure':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      case 'match':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
    }
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
  };

  // 初始化關卡
  useEffect(() => {
    const levelInfo = levelManager.current.getCurrentLevelInfo();
    const newQuestions = levelManager.current.generateQuestions();
    setQuestions(newQuestions);
    setTimeRemaining(levelInfo.timeLimit);
    setMatchedPairs(0);
    setAnswer([]);
    setCurrentPlayIndex(-1);
  }, [currentLevel]);

  // 題目播放邏輯
  useEffect(() => {
    let timer;
    if (isPlaying && currentPlayIndex < questions.length) {
      // 如果正在播放且還有未播放的題目，設置一個定時器
      timer = setTimeout(() => {
        // 1秒後將當前播放索引加1
        setCurrentPlayIndex(prev => prev + 1);
      }, 1000);
    } else if (isPlaying && currentPlayIndex >= questions.length) {
      // 如果所有題目都已播放完畢
      setIsPlaying(false);        // 停止播放
      setCurrentPlayIndex(-1);    // 重置播放索引
      setGameStatus(GAME_STATUS.PLAYING);  // 將遊戲狀態設置為正在進行
    }
    // 清理函數：在組件卸載或依賴項變化時清除定時器
    return () => clearTimeout(timer);
  }, [isPlaying, currentPlayIndex, questions.length]);  // 依賴項：播放狀態、當前索引、題目長度

  // 計時器邏輯
  useEffect(() => {
    let timer;
    if (gameStatus === GAME_STATUS.PLAYING) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // 時間到，遊戲結束
            handleGameFail();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStatus]);

  // 播放題目
  const playQuestions = () => {
    setIsPlaying(true);
    setCurrentPlayIndex(0);
    setAnswer([]);
  };

  // 開始遊戲
  const startGame = () => {
    // 設置遊戲狀態為準備中
    setGameStatus(GAME_STATUS.READY);
    // 重置當前關卡為第一關
    setCurrentLevel(1);
    // 重置關卡管理器
    levelManager.current.resetLevel();
    // 生成新的題目序列
    const newQuestions = levelManager.current.generateQuestions();
    setQuestions(newQuestions);
    // 清空玩家答案
    setAnswer([]);
    // 設置剩餘時間為當前關卡的時間限制
    setTimeRemaining(levelManager.current.getCurrentLevelInfo().timeLimit);
    // 重置玩家機會為3次
    setChances(3);
    // 開始播放題目序列
    playQuestions();
  };

  // 重試當前關卡
  const retryLevel = () => {
    if (chances > 0) {
      levelManager.current.resetLevel();
      const levelInfo = levelManager.current.getCurrentLevelInfo();
      setTimeRemaining(levelInfo.timeLimit);
      setMatchedPairs(0);
      setAnswer([]);
      setGameStatus(GAME_STATUS.READY);
      playQuestions();
    }
  };

  // 處理遊戲失敗
  const handleGameFail = () => {
    setGameStatus(GAME_STATUS.FAILED);
    playSound('failure');
    setChances(prev => {
      const newChances = prev - 1;
      if (newChances <= 0) {
        // 遊戲結束，重新開始
        setTimeout(() => {
          startGame();
        }, 1500);
      }
      return newChances;
    });
  };

  // 進入下一關
  const nextLevel = () => {
    if (levelManager.current.nextLevel()) {
      setCurrentLevel(prev => prev + 1);
      setGameStatus(GAME_STATUS.READY);
      const levelInfo = levelManager.current.getCurrentLevelInfo();
      setTimeRemaining(levelInfo.timeLimit);
      setMatchedPairs(0);
      setChances(prev => Math.min(prev + 1, 3)); // 過關時加一命，但最多3命
      const newQuestions = levelManager.current.generateQuestions();
      setQuestions(newQuestions);
      setAnswer([]);
      playQuestions();
    }
  };

  // 處理方塊點擊
  const handleBlockClick = (index) => {
    if (isLoading || gameStatus !== GAME_STATUS.PLAYING) return;

    const newAnswer = [...answer, index];
    setAnswer(newAnswer);

    // 檢查答案
    if (newAnswer.length === questions.length) {
      const isCorrect = newAnswer.every((ans, i) => ans === questions[i]);
      if (isCorrect) {
        playSound('match');
        setMatchedPairs(prev => {
          const newMatched = prev + 1;
          const levelInfo = levelManager.current.getCurrentLevelInfo();
          if (newMatched >= levelInfo.requiredMatches) {
            // 達到目標配對數，完成關卡
            setGameStatus(GAME_STATUS.COMPLETED);
            playSound('success');
            return newMatched;
          } else {
            // 如果還沒達到目標配對數，生成新題目並開始播放
            setTimeout(() => {
              const newQuestions = levelManager.current.generateQuestions();
              setQuestions(newQuestions);
              setAnswer([]);
              playQuestions();
            }, 1000);
            return newMatched;
          }
        });
      } else {
        handleGameFail();
      }
      setAnswer(questions);
    }
  };

  return (
    <Background>
      <Container>
        <TitleHeader>
          <span>Memory Blocks 記憶方塊</span>
          <ButtonGroup>
            <GameButton onClick={() => setIsDarkMode(!isDarkMode)}>
              <span className="icon">{isDarkMode ? '🌙' : '☀️'}</span>
              {isDarkMode ? '暗色模式' : '亮色模式'}
            </GameButton>
            {!isPlaying && gameStatus === GAME_STATUS.READY && (
              <GameButton $variant="start" onClick={startGame}>
                <span className="icon">▶</span>
                開始遊戲
              </GameButton>
            )}
            {!isPlaying && gameStatus === GAME_STATUS.COMPLETED && (
              <GameButton $variant="next" onClick={nextLevel}>
                <span className="icon">▶▶</span>
                下一關
              </GameButton>
            )}
            {!isPlaying && gameStatus === GAME_STATUS.FAILED && chances > 0 && (
              <GameButton $variant="retry" onClick={retryLevel}>
                <span className="icon">🔄</span>
                重試
              </GameButton>
            )}
          </ButtonGroup>
        </TitleHeader>
        
        {/* 顯示當前關卡標題 */}
        <Title currentLevel={currentLevel} />
        
        {/* 顯示遊戲進度 */}
        <Progress 
          currentLevel={currentLevel}
          matchedPairs={matchedPairs}
          timeRemaining={timeRemaining}
        />

        {/* 顯示剩餘生命 */}
        <Chance chances={chances} />

        {/* 顯示方塊區域 */}
        <BlockContainer $gameStatus={gameStatus}>
          <Blocks
            blockNum={levelManager.current.getCurrentLevelInfo().gridSize * levelManager.current.getCurrentLevelInfo().gridSize}
            questions={questions}
            answer={answer}
            isGameStart={gameStatus === GAME_STATUS.PLAYING}
            onBlockClick={handleBlockClick}
            currentPlayIndex={currentPlayIndex}
            isPlaying={isPlaying}
            showAllAnswers={gameStatus === GAME_STATUS.FAILED || gameStatus === GAME_STATUS.COMPLETED}
          />
        </BlockContainer>
      </Container>
    </Background>
  );
};

export default MemoryBlocks;