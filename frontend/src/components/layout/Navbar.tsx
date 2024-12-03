import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navItems = [
  { title: 'Accueil', path: '/' },
  { title: 'Nos Services', path: '/services' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Tarifs', path: '/tarifs' },
  { title: 'Blog', path: '/blog' },
  { title: 'Partenaires', path: '/partenaires' },
  { title: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AppBar 
      position="fixed" 
      className={`transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      elevation={0}
    >
      <Toolbar className="justify-between container mx-auto px-4">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Five Design Agency" 
            className="h-12 w-auto"
          />
        </Link>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              className="text-primary"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={isOpen}
              onClose={toggleDrawer}
              className="w-64"
            >
              <div className="p-4">
                <IconButton
                  className="absolute right-4 top-4"
                  onClick={toggleDrawer}
                >
                  <CloseIcon />
                </IconButton>
                <List>
                  {navItems.map((item) => (
                    <ListItem 
                      key={item.path}
                      onClick={toggleDrawer}
                      className="p-2"
                    >
                      <Link 
                        to={item.path}
                        className="nav-link w-full text-lg font-medium"
                      >
                        {item.title}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Drawer>
          </>
        ) : (
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="nav-link text-sm font-medium"
              >
                {item.title}
              </Link>
            ))}
            <Link
              to="/devis"
              className="btn-primary ml-4"
            >
              Demander un devis
            </Link>
          </nav>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
