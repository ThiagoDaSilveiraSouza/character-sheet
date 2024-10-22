import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  width: 150px;
  height: 200px;
  box-shadow: 0 0 4px 0 lightgrey;
  border-radius: 10px;
  padding: 15px 10px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.1);
    }
    h3 {
      color: blue;
      text-shadow: 0 0 5px white;
    }
  }
  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    transition: 0.3s;
  }
  h3 {
    margin: 0;
    text-shadow: 0 0 10px black;
    transition: 0.3s;
  }
`;

type CardProps = {
  imgUrl?: string;
  title?: string;
};

export const Card = ({ imgUrl, title }: CardProps) => {
  return (
    <CardContainer>
      <img src={imgUrl} alt={title} />
      <h3>{title}</h3>
    </CardContainer>
  );
};
