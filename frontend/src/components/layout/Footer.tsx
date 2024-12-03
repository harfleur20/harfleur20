import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-dark text-white pt-16 pb-8">
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="font-bold mb-4">
              Five Design Agency
            </Typography>
            <div className="space-y-2">
              <p>123 Rue du Design</p>
              <p>75000 Paris, France</p>
              <p>Tél: +33 1 23 45 67 89</p>
              <p>Email: contact@fivedesign.com</p>
            </div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="font-bold mb-4">
              Liens Rapides
            </Typography>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/services" className="hover:text-secondary transition-colors">
                Nos Services
              </Link>
              <Link to="/portfolio" className="hover:text-secondary transition-colors">
                Portfolio
              </Link>
              <Link to="/blog" className="hover:text-secondary transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="hover:text-secondary transition-colors">
                Contact
              </Link>
              <Link to="/devis" className="hover:text-secondary transition-colors">
                Devis
              </Link>
              <Link to="/mentions-legales" className="hover:text-secondary transition-colors">
                Mentions Légales
              </Link>
            </div>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="font-bold mb-4">
              Suivez-nous
            </Typography>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <FacebookIcon />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <TwitterIcon />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <LinkedInIcon />
              </a>
            </div>
          </Grid>
        </Grid>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <Typography variant="body2" className="text-gray-400">
            © {new Date().getFullYear()} Five Design Agency. Tous droits réservés.
          </Typography>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
