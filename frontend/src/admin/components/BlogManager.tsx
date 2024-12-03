import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  thumbnail: string;
  status: 'draft' | 'published';
  publishDate?: string;
  author: {
    name: string;
    avatar: string;
  };
}

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Les tendances du web design en 2024',
    slug: 'tendances-web-design-2024',
    excerpt: 'Découvrez les dernières tendances qui façonnent le web design...',
    content: '# Les tendances du web design en 2024\n\nLe web design est en constante évolution...',
    category: 'Web Design',
    tags: ['Design', 'Tendances', '2024'],
    thumbnail: '/blog/web-design-trends.jpg',
    status: 'published',
    publishDate: '2024-01-15',
    author: {
      name: 'Sophie Martin',
      avatar: '/team/sophie.jpg',
    },
  },
];

const categories = [
  'Web Design',
  'Branding',
  'UI/UX',
  'Motion Design',
  'Print Design',
];

const BlogManager: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleOpenEditDialog = (post?: BlogPost) => {
    if (post) {
      setSelectedPost(post);
      setEditorContent(post.content);
      setSelectedTags(post.tags);
    } else {
      setSelectedPost(null);
      setEditorContent('');
      setSelectedTags([]);
    }
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedPost(null);
    setEditorContent('');
    setSelectedTags([]);
  };

  const handleOpenPreviewDialog = (post: BlogPost) => {
    setSelectedPost(post);
    setPreviewDialogOpen(true);
  };

  const handleClosePreviewDialog = () => {
    setPreviewDialogOpen(false);
    setSelectedPost(null);
  };

  const handleAddTag = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && tagInput.trim()) {
      setSelectedTags([...selectedTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Box className="p-6">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold">
          Blog
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenEditDialog()}
        >
          Nouvel article
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={post.thumbnail}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="h6" className="font-bold mb-2">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  {post.excerpt}
                </Typography>
                <Box className="flex gap-1 mb-2">
                  {post.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Typography variant="caption" color="textSecondary">
                  {new Date(post.publishDate!).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpenPreviewDialog(post)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenEditDialog(post)}>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {selectedPost ? 'Modifier l\'article' : 'Nouvel article'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} className="mt-1">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Titre"
                defaultValue={selectedPost?.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Extrait"
                multiline
                rows={2}
                defaultValue={selectedPost?.excerpt}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  value={selectedPost?.category || ''}
                  label="Catégorie"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select
                  value={selectedPost?.status || 'draft'}
                  label="Statut"
                >
                  <MenuItem value="draft">Brouillon</MenuItem>
                  <MenuItem value="published">Publié</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Appuyez sur Entrée pour ajouter un tag"
              />
              <Box className="flex gap-1 mt-2">
                {selectedTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    size="small"
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" className="mb-2">
                Contenu
              </Typography>
              <div className="h-[300px] mb-12">
                {editorContent}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Annuler</Button>
          <Button variant="contained" onClick={handleCloseEditDialog}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
        open={previewDialogOpen}
        onClose={handleClosePreviewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedPost?.title}</DialogTitle>
        <DialogContent>
          <Box className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreviewDialog}>Fermer</Button>
          <Button
            variant="contained"
            onClick={() => {
              handleClosePreviewDialog();
              handleOpenEditDialog(selectedPost!);
            }}
          >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlogManager;
