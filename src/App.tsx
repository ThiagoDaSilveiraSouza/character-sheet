import "./App.css";
import { BrowserRouter as Router } from 'react-router-dom';
import { PageRoutes } from "./routes/PagesRoutes";
import GlobalStyle from './globalStyles';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { SideMenu } from './components/SideMenu/SideMenu';

function App() {
  return (
    <Router>
      <I18nextProvider i18n={i18n}>
        <GlobalStyle />
        <SideMenu />
        <PageRoutes />
      </I18nextProvider>
    </Router>
  );
}

export default App;
