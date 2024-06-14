import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Header from './Header';
import Catalog from '../../features/catalog/Catalog';
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  //Creating theme
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: { default: paletteType === 'light' ? '#eaeaea' : '#121212' },
      myCustomColor: {
        main: paletteType === 'light' ? '#1ccc' : '#121212',
      },
    },
  });
  const OnSetDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        darkMode={darkMode}
        setDarkMode={OnSetDarkMode}
      />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
