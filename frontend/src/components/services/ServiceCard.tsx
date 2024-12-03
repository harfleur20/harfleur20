import React from 'react';
import { motion } from 'framer-motion';
import { Card, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';

interface ServiceFeature {
  text: string;
  included: boolean;
}

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  features: ServiceFeature[];
  popular?: boolean;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  price,
  description,
  features,
  popular = false,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card 
        className={`h-full p-6 flex flex-col ${
          popular 
            ? 'border-2 border-secondary shadow-xl relative' 
            : 'border border-gray-200'
        }`}
      >
        {popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-secondary text-neutral-dark px-4 py-1 rounded-full text-sm font-medium">
              Plus populaire
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <Typography variant="h5" className="font-bold text-primary mb-2">
            {title}
          </Typography>
          <Typography variant="h4" className="font-bold mb-2">
            {price}
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mb-4">
            {description}
          </Typography>
        </div>

        <List className="flex-grow">
          {features.map((feature, index) => (
            <ListItem key={index} className="px-0">
              <ListItemIcon>
                <CheckCircleIcon 
                  className={feature.included ? 'text-primary' : 'text-gray-300'} 
                />
              </ListItemIcon>
              <ListItemText 
                primary={feature.text}
                className={!feature.included ? 'text-gray-400' : ''}
              />
            </ListItem>
          ))}
        </List>

        <Link 
          to="/devis" 
          className={`mt-6 w-full text-center py-2 px-4 rounded-lg transition-all ${
            popular
              ? 'bg-secondary hover:bg-secondary-dark text-neutral-dark'
              : 'bg-primary hover:bg-primary-light text-white'
          }`}
        >
          Choisir ce forfait
        </Link>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
