import { FC, KeyboardEvent, useState } from 'react';
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
} from './HomeStyle';

type Circle = {
  id: number;
  x: number;
  y: number;
};

const radius = 16;

const HomePage: FC = () => {
  const [pointCount, setPointCount] = useState('');
  const [time, setTime] = useState<number>(0);
  const [circles, setCircles] = useState<Circle[]>([]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const value = parseInt(pointCount, 10);

      if (!isNaN(value) && value > 0) {
        generateRandomCircles(value);
      }
      setTime(0);
      setInterval(() => {
        setTime((prev) => prev + 100);
      }, 100);
      setPointCount('');
    }
  };
  const formattedTime = (time / 1000).toFixed(1);

  const isPositionValid = (x: number, y: number, existingCircles: Circle[]) => {
    return !existingCircles.some((circle) => {
      const distance = Math.sqrt((circle.x - x) ** 2 + (circle.y - y) ** 2);
      return distance < radius * 2; //If the distance between the circles is less than radius * 2, then the position is invalid.
    });
  };

  const generateRandomCircles = (count: number) => {
    const newCircles: Circle[] = [];
    while (newCircles.length < count) {
      const randomX = Math.floor(Math.random() * 420);
      const randomY = Math.floor(Math.random() * 420);

      if (isPositionValid(randomX, randomY, newCircles)) {
        newCircles.push({ id: newCircles.length + 1, x: randomX, y: randomY });
      }
    }

    setCircles(newCircles);
  };

  return (
    <GameContainer>
      <TitleStyled>Let's play</TitleStyled>
      <PointsCounterStyled>
        <label htmlFor='point'>Points: </label>{' '}
        <input
          id='point'
          value={pointCount}
          onChange={(e) => setPointCount(e.target.value)}
          onKeyDown={(e: KeyboardEvent) => handleKeyDown(e)}
        />
      </PointsCounterStyled>
      <TimerDisplayStyled>
        <label htmlFor='time'>Time: </label> {formattedTime}
      </TimerDisplayStyled>
      <ButtonGroupStyled>
        <RestartButtonStyled>Restart</RestartButtonStyled>
        <AutoPlayButtonStyled>Auto Play on</AutoPlayButtonStyled>
      </ButtonGroupStyled>
      <GameBoardStyled>
        <GameListItemStyled>
          {circles.map((circle: Circle) => (
            <TargetCircleStyled x={circle.x} y={circle.y} radius={radius} key={circle.id}>
              {circle.id}
            </TargetCircleStyled>
          ))}
        </GameListItemStyled>
      </GameBoardStyled>
      <ScoreDisplayStyled display={pointCount ? true : false}>
        Next: <p>{pointCount}</p>
      </ScoreDisplayStyled>
    </GameContainer>
  );
};

export default HomePage;
