import { createGlobalStyle } from 'styled-components';
import { theme } from './styles/theme';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
    font-family: ${theme.fonts.main};
    background-color: ${theme.colors.background.light};
    color: ${theme.colors.text.primary};
    box-sizing: border-box;
    padding-top: 50px; // Adicionando padding ao topo
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button {
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
    padding: 3px 6px; /* Reduzindo o padding padrão */
  }

  button:focus,
  button:active,
  button:hover,
  button:checked,
  button:focus-visible {
    outline: none;
  }

  /* Estilo global para barras de rolagem */
  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: ${theme.colors.background.dark};
    border-radius: 4px;
  }

  *::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primaryHover};
  }

  /* Para Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.primary} ${theme.colors.background.dark};
  }
`;

export default GlobalStyle;
