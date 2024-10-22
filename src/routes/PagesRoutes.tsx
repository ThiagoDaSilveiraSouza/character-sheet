// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, LoadingPage, SpellPage, SheetPage } from "../pages";

export const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ficha-do-personagem" element={<SheetPage />} />
        <Route path="/magias" element={<SpellPage />} />
      </Routes>
      <LoadingPage />
    </Router>
  );
};
