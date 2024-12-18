import styled from 'styled-components';

export const GameContainer = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding: 60px 0;
`;

export const TitleStyled = styled.h3`
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

export const TargetCircleStyled = styled.li<{ x: number; y: number; radius: number }>`
  position: absolute;
  left: ${(props) => props.x + 'px'};
  top: ${(props) => props.y + 'px'};
  width: ${(props) => props.radius * 2 + 'px'};
  height: ${(props) => props.radius * 2 + 'px'};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 50%;
  list-style-type: none;
  &:hover {
    cursor: pointer;
  }
`;

export const ScoreDisplayStyled = styled.span<{ display?: boolean }>`
  display: flex;
  visibility: ${(props) => !props.display && 'hidden'};
  margin: 10px 0;
  p {
    margin: 0 0 0 6px;
  }
`;
