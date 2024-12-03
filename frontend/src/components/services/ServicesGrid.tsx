import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Classic',
    price: 'À partir de 499€',
    description: 'Idéal pour les petites entreprises et les startups',
    features: [
      { text: 'Design de logo personnalisé', included: true },
      { text: 'Charte graphique simple', included: true },
      { text: 'Carte de visite', included: true },
      { text: 'Support par email', included: true },
      { text: 'Révisions illimitées', included: false },
      { text: 'Illustrations personnalisées', included: false },
      { text: 'Animation du logo', included: false },
      { text: 'Support prioritaire', included: false },
    ],
  },
  {
    title: 'Standard',
    price: 'À partir de 999€',
    description: 'Pour les entreprises en pleine croissance',
    features: [
      { text: 'Design de logo personnalisé', included: true },
      { text: 'Charte graphique complète', included: true },
      { text: 'Pack papeterie complet', included: true },
      { text: 'Support par email et téléphone', included: true },
      { text: 'Révisions illimitées', included: true },
      { text: 'Illustrations personnalisées', included: true },
      { text: 'Animation du logo', included: false },
      { text: 'Support prioritaire', included: false },
    ],
    popular: true,
  },
  {
    title: 'Premium',
    price: 'À partir de 1999€',
    description: 'Solution complète pour les grandes entreprises',
    features: [
      { text: 'Design de logo personnalisé', included: true },
      { text: 'Charte graphique premium', included: true },
      { text: 'Pack papeterie premium', included: true },
      { text: 'Support dédié 24/7', included: true },
      { text: 'Révisions illimitées', included: true },
      { text: 'Illustrations personnalisées', included: true },
      { text: 'Animation du logo', included: true },
      { text: 'Support prioritaire', included: true },
    ],
  },
];

const ServicesGrid: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-light">
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          className="text-center font-bold text-primary mb-4"
        >
          Nos Forfaits
        </Typography>
        <Typography 
          variant="h6" 
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Choisissez le forfait qui correspond le mieux à vos besoins. 
          Tous nos forfaits sont personnalisables selon vos exigences.
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={service.title}>
              <ServiceCard {...service} delay={index * 0.2} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default ServicesGrid;
