import * as React from 'react';
import { styled, useTheme, alpha, createTheme } from '@mui/material/styles';

// Import icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

// Import MaterialUI components
import {
  AppBar as MUIAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  CssBaseline,
  Drawer,
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  ThemeProvider,
} from '@mui/material';

// Import from React-router
import { Link } from 'react-router-dom';

// Styling MUI components
const drawerWidth = 240;
const AppBar = styled(MUIAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '15px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: 'white',
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'white',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const navTheme = createTheme({
  palette: {
    primary: { main: '#edab8a' },
    text: { main: '#ffffff' },
  },
  typography: {
    title: {
      color: '#ffffff',
      fontWeight: '700',
      fontSize: '30px',
    },
  },
});

const drawerNavigations = [
  { id: 1, label: 'Customers', Icon: <PersonIcon />, href: '/' },
  { id: 2, label: 'Trainings', Icon: <FitnessCenterIcon />, href: '/trainings' },
];

// Navbar
export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', overflow: 'hidden' }}>
        <CssBaseline />
        <ThemeProvider theme={navTheme}>
          <AppBar position='relative' open={open} sx={{ textAlign: 'center' }}>
            <Toolbar>
              <IconButton
                color='primary'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon color='text' />
              </IconButton>

              <Typography
                variant='title'
                noWrap
                component='div'
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Training
                </Link>
              </Typography>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder='Search' inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <List>
            <Divider />
            {drawerNavigations.map(({ id, Icon, label, href }) => (
              <Link to={href} style={{ textDecoration: 'none', color: 'inherit' }} key={id}>
                <ListItem button>
                  <ListItemIcon>{Icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
}
