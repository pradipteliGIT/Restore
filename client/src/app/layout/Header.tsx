import {
  AppBar,
  Badge,
  Box,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { MaterialUISwitch } from './MaterialUISwitch';
import { NavLink } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
const middleLinks = [
  {
    title: 'catalog',
    path: '/catalog',
  },
  {
    title: 'about',
    path: '/about',
  },
  {
    title: 'contact',
    path: '/contact',
  },
];

const sideLinks = [
  {
    title: 'login',
    path: '/login',
  },
  {
    title: 'register',
    path: '/register',
  },
];
type Props = {
  darkMode: boolean;
  setDarkMode: () => void;
};

const navStyles = {
  color: 'inherit',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': { color: 'grey.500' },
  '&.active': { color: 'text.secondary' },
};
export default function Header({ darkMode, setDarkMode }: Props) {
  return (
    <AppBar
      position='sticky'
      sx={{ mb: 2 }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            variant='h6'
            component={NavLink}
            to='/'
            sx={{ ...navStyles }}
          >
            RE-STORE
          </Typography>
        </Box>
        <Box>
          <List sx={{ display: 'flex' }}>
            {middleLinks.map(({ title, path }) => (
              <ListItem
                key={title}
                component={NavLink}
                to={path}
                sx={{ ...navStyles }}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          display='flex'
          alignItems='center'
        >
          <IconButton
            size='large'
            color='inherit'
            sx={{ mx: 1 }}
          >
            <Badge
              badgeContent='6'
              color='secondary'
            >
              <ShoppingCart color='inherit'></ShoppingCart>
            </Badge>
          </IconButton>
          <List sx={{ display: 'flex' }}>
            {sideLinks.map(({ title, path }) => (
              <ListItem
                key={title}
                component={NavLink}
                to={path}
                sx={{ ...navStyles }}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          <FormControlLabel
            control={
              <MaterialUISwitch
                sx={{ m: 1 }}
                checked={darkMode}
                onChange={setDarkMode}
              />
            }
            label=''
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
