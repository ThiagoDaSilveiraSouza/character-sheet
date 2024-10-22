import styled from "styled-components";

const LoadingBarComponent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 300px;
  p {
    color: black;
  }
`;

const Bar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  border: 1px solid gray;
  border-radius: 15px;
  overflow: hidden;
  color: white;
  text-shadow: 0 0 3px black;
  font-weight: bolder;
  font-size: 20px;
`;

type BackgroundChargeProps = {
  $widthpercent: number;
};

const BackgroundCharge = styled.span<BackgroundChargeProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $widthpercent }) => $widthpercent}%;
  background: greenyellow;
  z-index: -1;
  transition: 0.3s;
`;

type LoadingBarProps = {
  percente: number;
  currentLoadingName?: string;
};

export const LoadingBar = ({
  percente,
  currentLoadingName,
}: LoadingBarProps) => {
  return (
    <LoadingBarComponent>
      <Bar>
        <BackgroundCharge $widthpercent={percente} />
        {Math.round(percente)}%
      </Bar>
      <p>Carregando {currentLoadingName}...</p>
    </LoadingBarComponent>
  );
};
