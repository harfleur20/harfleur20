import React from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import BrushIcon from '@mui/icons-material/Brush';
import MovieIcon from '@mui/icons-material/Movie';
import WebIcon from '@mui/icons-material/Web';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';

const features = [
  {
    icon: <BrushIcon fontSize="large" />,
    title: 'Design Graphique',
    description: 'Création de logos, chartes graphiques et identités visuelles uniques qui reflètent votre marque'
  },
  {
    icon: <MovieIcon fontSize="large" />,
    title: 'Production Vidéo',
    description: 'Réalisation de vidéos promotionnelles, motion design et animations 2D/3D professionnelles'
  },
  {
    icon: <WebIcon fontSize="large" />,
    title: 'Web Design',
    description: 'Conception d\'interfaces web modernes, responsive et centrées sur l\'expérience utilisateur'
  },
  {
    icon: <CameraAltIcon fontSize="large" />,
    title: 'Photographie',
    description: 'Séances photo professionnelles pour vos produits, événements et portraits corporate'
  },
  {
    icon: <ColorLensIcon fontSize="large" />,
    title: 'Direction Artistique',
    description: 'Conseil et accompagnement dans la définition de votre stratégie créative globale'
  },
  {
    icon: <ViewQuiltIcon fontSize="large" />,
    title: 'Print Design',
    description: 'Création de supports imprimés : brochures, flyers, packaging, et bien plus encore'
  }
];

const ServiceFeatures: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          className="text-center font-bold text-primary mb-4"
        >
          Nos Services
        </Typography>
        <Typography 
          variant="subtitle1" 
          className="text-center text-gray-600 mb-12"
        >
          Découvrez notre gamme complète de services créatifs
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper 
                  className="p-6 h-full hover:shadow-lg transition-shadow duration-300"
                  elevation={1}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-primary mb-4">
                      {feature.icon}
                    </div>
                    <Typography 
                      variant="h5" 
                      className="font-bold mb-2"
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      className="text-gray-600"
                    >
                      {feature.description}
                    </Typography>
                  </div>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default ServiceFeatures;
