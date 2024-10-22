import { Card } from "./components";
import imgCard from "../../assets/card-magia.webp";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <main>
      <h1>HomePage</h1>
      <Link to="/magias">
        <Card imgUrl={imgCard} title="Magias" />
      </Link>
    </main>
  );
};
