import React, { useState } from 'react';
import { Grid, Container, TextField, InputAdornment, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BlogCard, { BlogPost } from './BlogCard';

const categories = [
  'Tous',
  'Design Graphique',
  'Web Design',
  'Motion Design',
  'Branding',
  'Tendances',
  'Tutoriels',
];

// Données de démonstration
const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Les tendances du design graphique en 2024',
    excerpt: 'Découvrez les nouvelles tendances qui façonnent le monde du design graphique cette année...',
    image: '/blog/design-trends.jpg',
    category: 'Tendances',
    author: {
      name: 'Sophie Martin',
      avatar: '/team/sophie.jpg',
    },
    date: '15 Jan 2024',
    readTime: '5',
    tags: ['Design', 'Tendances', '2024'],
  },
  {
    id: '2',
    title: 'Comment créer une identité de marque mémorable',
    excerpt: 'Guide complet pour développer une identité de marque qui se démarque et laisse une impression durable...',
    image: '/blog/branding-guide.jpg',
    category: 'Branding',
    author: {
      name: 'Thomas Dubois',
      avatar: '/team/thomas.jpg',
    },
    date: '12 Jan 2024',
    readTime: '8',
    tags: ['Branding', 'Marketing', 'Identité'],
  },
  // Ajoutez plus d'articles ici
];

const BlogGrid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" className="py-12">
      {/* Barre de recherche */}
      <div className="mb-8">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher un article..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => setSelectedCategory(category)}
            color={selectedCategory === category ? 'primary' : 'default'}
            className="cursor-pointer"
          />
        ))}
      </div>

      {/* Grille d'articles */}
      <Grid container spacing={4}>
        {filteredPosts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <BlogCard post={post} delay={index * 0.1} />
          </Grid>
        ))}
      </Grid>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Aucun article ne correspond à votre recherche.
          </p>
        </div>
      )}
    </Container>
  );
};

export default BlogGrid;
