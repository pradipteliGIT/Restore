import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Header from './Header';
import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync } from '../../features/basket/basketSlice';
import { fetchCurrentUser } from '../../features/account/accountSlice';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchBasketAsync());
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  //Getting basket data
  useEffect(() => {
    initApp().then(() => setIsLoading(false));
  }, [initApp]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  //Creating theme
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: { default: paletteType === 'light' ? '#eaeaea' : '#121212' },
      //below custom color added just for reference not used in the application
      myCustomColor: {
        main: paletteType === 'light' ? '#1ccc' : '#121212',
      },
    },
  });

  const OnSetDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  if (isLoading) return <LoadingComponent message='Initializing application' />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />

      <CssBaseline />
      <Header
        darkMode={darkMode}
        setDarkMode={OnSetDarkMode}
      />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
