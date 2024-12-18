import styled from 'styled-components';

export const GameContainer = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding: 60px 0;
`;

export const TitleStyled = styled.h3<{ isCountDone: number }>`
  color: ${(props) => props.isCountDone === 1 && 'green'};
  font-weight: 500;
  text-transform: uppercase;
  margin: 10px 0;
`;

export const PointsCounterStyled = styled.div`
  display: flex;
  margin: 4px 0 12px 0;
  label {
    min-width: 120px;
  }
  input {
  }
`;

export const TimerDisplayStyled = styled.div`
  display: flex;
  margin: 4px 0 12px 0;
  label {
    min-width: 120px;
  }
  input {
  }
`;

export const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const RestartButtonStyled = styled.button`
  margin-right: 12px;
  min-width: 100px;
  &:hover {
    cursor: pointer;
  }
`;

export const AutoPlayButtonStyled = styled.button`
  padding: 0 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const GameBoardStyled = styled.div`
  margin-top: 20px;
  width: 100%;
  border: 2px solid #000;
  min-height: 420px;
  padding: 16px;
  overflow: hidden;
`;

export const GameListItemStyled = styled.ul`
  position: relative;
  overflow: 'hidden';
`;

export const ScoreDisplayStyled = styled.span<{ display: string }>`
  display: flex;
  opacity: ${(props) => (props.display === 'visible' ? 1 : 0)};
  visibility: ${(props) => props.display};
  transition: opacity 0.5s ease, visibility 0.5s ease;
  margin: 10px 0;
  p {
    margin: 0 0 0 6px;
  }
`;

export const TargetCircleStyled = styled.li<{
  x: number;
  y: number;
  radius: number;
  isselected: boolean;
  hasError: boolean;
}>`
  position: absolute;
  left: ${(props) => props.x + 'px'};
  top: ${(props) => props.y + 'px'};
  width: ${(props) => props.radius * 2 + 'px'};
  height: ${(props) => props.radius * 2 + 'px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 50%;
  list-style-type: none;
  background-color: ${(props) => props.isselected && 'orange'};
  font-size: 12px;
  transition: ${(props) => (props.hasError ? 'none' : 'opacity 1.5s ease')};
  opacity: ${(props) => (props.isselected ? 0 : 1)};
  &:hover {
    cursor: pointer;
  }
  p {
    margin: 0;
  }
`;
