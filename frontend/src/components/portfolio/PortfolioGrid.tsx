import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Grid, Typography, Chip } from '@mui/material';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  client: string;
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "Rebrand Luxe Cosmétiques",
    category: "branding",
    image: "/portfolio/cosmetics-brand.jpg",
    client: "LuxeBeauty",
    testimonial: {
      text: "Une transformation remarquable de notre image de marque qui a boosté nos ventes de 40%.",
      author: "Marie Laurent",
      position: "Directrice Marketing"
    }
  },
  {
    id: 2,
    title: "Campagne Vidéo Virale",
    category: "video",
    image: "/portfolio/viral-campaign.jpg",
    client: "SportFlex",
    testimonial: {
      text: "Plus de 1 million de vues en une semaine. Un succès retentissant !",
      author: "Thomas Dubois",
      position: "CEO"
    }
  },
  // Ajoutez plus de projets ici
];

const categories = [
  { label: 'Tous', value: 'all' },
  { label: 'Branding', value: 'branding' },
  { label: 'Web Design', value: 'web' },
  { label: 'Vidéo', value: 'video' },
  { label: 'Print', value: 'print' },
];

const PortfolioGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'all' || project.category === selectedCategory
  );

  return (
    <section className="py-20">
      <Container maxWidth="lg">
        {/* Filtres */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Chip
              key={category.value}
              label={category.label}
              onClick={() => setSelectedCategory(category.value)}
              color={selectedCategory === category.value ? 'primary' : 'default'}
              className="text-sm font-medium cursor-pointer"
            />
          ))}
        </div>

        {/* Grille de projets */}
        <Grid container spacing={4}>
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div 
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-sm">{project.client}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        {/* Modal de projet */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-lg max-w-4xl w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <Typography variant="h4" className="font-bold mb-2">
                      {selectedProject.title}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" className="mb-4">
                      {selectedProject.client}
                    </Typography>
                    {selectedProject.testimonial && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <Typography variant="body1" className="italic mb-2">
                          "{selectedProject.testimonial.text}"
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          {selectedProject.testimonial.author}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {selectedProject.testimonial.position}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default PortfolioGrid;
