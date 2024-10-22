import styled from "styled-components";
import { LoadingBar } from "../../components";
import { useEffect } from "react";
import { useDataStore } from "../../store";

type ContainerProps = {
  $isshow?: string;
};

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: white;

  visibility: ${({ $isshow = "true" }) =>
    $isshow === "true" ? "visible" : "hidden"};
  opacity: ${({ $isshow = "true" }) => ($isshow === "true" ? 1 : 0)};
  transition: 0.3s;
`;

export const LoadingPage = () => {
  const { updateData, currentPropertie, loadingPercente } = useDataStore();
  const isShow = loadingPercente < 100;

  useEffect(() => {
    updateData();
  }, [updateData]);
  return (
    <Container $isshow={isShow.toString()}>
      <LoadingBar
        percente={loadingPercente}
        currentLoadingName={currentPropertie || ""}
      />
    </Container>
  );
};
