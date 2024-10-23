// App.tsx
import { Routes, Route } from "react-router-dom";
import { HomePage, LoadingPage, SpellPage, CharacterSheetPage, CharacterSheet } from "../pages";

export const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ficha-do-personagem" element={<CharacterSheetPage />} />
        <Route path="/ficha-do-personagem/:id" element={<CharacterSheet />} />
        <Route path="/magias" element={<SpellPage />} />
      </Routes>
      <LoadingPage />
    </>
  );
};
