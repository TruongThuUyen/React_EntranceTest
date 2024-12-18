import { FC, useEffect, useRef, useState } from 'react';
import {
  AutoPlayButtonStyled,
  ButtonGroupStyled,
  GameBoardStyled,
  GameContainer,
  GameListItemStyled,
  PointsCounterStyled,
  RestartButtonStyled,
  ScoreDisplayStyled,
  TargetCircleStyled,
  TimerDisplayStyled,
  TitleStyled,
} from './GameZoneStyled';

type Circle = {
  id: number;
  x: number;
  y: number;
  content: string | undefined;
};

const radius = 18;

const GameZone: FC = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [pointCount, setPointCount] = useState('');
  const [time, setTime] = useState<number>(-1);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [isCountDone, setIsCountDone] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (selectedOrder.length > 0 && selectedOrder.length === circles.length) {
      setSelectedOrder([]);
      setCircles([]);
      setTimeout(() => {
        setIsCountDone(1);
      }, 1500);
    }
  }, [selectedOrder.length, circles.length]);

  const StartGame = () => {
    const value = parseInt(pointCount, 10);
    if (!isNaN(value) && value > 0) {
      generateRandomCircles(value);
    }

    setTime(0);
    setPointCount('');
    setIsCountDone(2);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 100);
    }, 100);
  };

  const formattedTime = (item: number) => {
    if (item > 0) return (item / 1000).toFixed(1);
  };

  useEffect(() => {
    if (isCountDone === 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isCountDone]);

  const isPositionValid = (x: number, y: number, existingCircles: Circle[]) => {
    return !existingCircles.some((circle) => {
      const distance = Math.sqrt((circle.x - x) ** 2 + (circle.y - y) ** 2);
      return distance < radius * 2; //If the distance between the circles is less than radius * 2, then the position is invalid.
    });
  };

  const generateRandomCircles = (count: number) => {
    const newCircles: Circle[] = [];
    while (newCircles.length < count) {
      //X, Y is random but guaranteed within the frame
      const randomX = Math.floor(Math.random() * (420 - radius * 2)) + radius;
      const randomY = Math.floor(Math.random() * (420 - radius * 2)) + radius;

      if (isPositionValid(randomX, randomY, newCircles)) {
        newCircles.push({
          id: newCircles.length + 1,
          x: randomX,
          y: randomY,
          content: undefined,
        });
      }
    }

    setCircles(newCircles);
  };

  const handleHiddenItem = (id: number) => {
    if (hasError) return;

    // Check order of selection
    const lastSelectedId = selectedOrder[selectedOrder.length - 1] || 0;
    if (id <= lastSelectedId) {
      setHasError(true);
      return;
    }

    setSelectedOrder((prev) => [...prev, id]);
    circles.map((circle, index) => {
      if (circle.id === id) {
        let second = Number(formattedTime(time)) * 1000;
        const timer = setInterval(() => {
          circles[index].content = formattedTime(second - 100);
          second -= 100;
          if (second <= 0) {
            clearInterval(timer);
            circles[index].content = '';
          }
        }, 100);
      }
    });
  };

  return (
    <GameContainer>
      <TitleStyled isCountDone={isCountDone}>
        {isCountDone === 1 ? 'All cleared' : "Let's play"}
      </TitleStyled>
      <PointsCounterStyled>
        <label htmlFor='point'>Points: </label>
        <input id='point' value={pointCount} onChange={(e) => setPointCount(e.target.value)} />
      </PointsCounterStyled>
      <TimerDisplayStyled>
        <label htmlFor='time'>Time: </label>
        {isCountDone === 0 ? '0.0' : formattedTime(time)} s
      </TimerDisplayStyled>
      <ButtonGroupStyled>
        <RestartButtonStyled onClick={() => StartGame()}>
          {isCountDone === 2 ? 'Restart' : 'Play'}
        </RestartButtonStyled>
        {isCountDone === 2 && <AutoPlayButtonStyled>Auto Play on</AutoPlayButtonStyled>}
      </ButtonGroupStyled>
      <GameBoardStyled>
        <GameListItemStyled>
          {circles.map((circle: Circle) => (
            <TargetCircleStyled
              x={circle.x}
              y={circle.y}
              radius={radius}
              key={circle.id}
              isselected={selectedOrder.includes(circle.id)}
              hasError={hasError}
              onClick={() => handleHiddenItem(circle.id)}>
              {circle.id}
              <p> {circle.content ? `${circle.content}s` : ''}</p>
            </TargetCircleStyled>
          ))}
        </GameListItemStyled>
      </GameBoardStyled>
      <ScoreDisplayStyled display={selectedOrder.length > 0 ? 'visible' : 'hidden'}>
        Next: <p>{selectedOrder.length}</p>
      </ScoreDisplayStyled>
    </GameContainer>
  );
};

export default GameZone;
