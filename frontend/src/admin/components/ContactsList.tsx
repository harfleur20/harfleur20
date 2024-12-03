import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Mail as MailIcon,
  Check as CheckIcon,
} from '@mui/icons-material';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Marie Martin',
    email: 'marie@example.com',
    message: 'Je souhaiterais en savoir plus sur vos services de branding...',
    status: 'new',
    createdAt: '2024-01-20',
  },
  // Add more mock data as needed
];

const ContactsList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, contact: Contact) => {
    setAnchorEl(event.currentTarget);
    setSelectedContact(contact);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedContact(null);
  };

  const getStatusChip = (status: string) => {
    const statusConfig = {
      new: { icon: <MailIcon />, color: 'info', label: 'Nouveau' },
      read: { icon: <CheckIcon />, color: 'default', label: 'Lu' },
      replied: { icon: <CheckIcon />, color: 'success', label: 'Répondu' },
    };

    const config = statusConfig[status as keyof typeof statusConfig];

    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color as 'info' | 'default' | 'success'}
        size="small"
      />
    );
  };

  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6 font-bold">
        Messages
      </Typography>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockContacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact) => (
                  <TableRow key={contact.id} hover>
                    <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>
                      {contact.message.length > 50
                        ? `${contact.message.substring(0, 50)}...`
                        : contact.message}
                    </TableCell>
                    <TableCell>{getStatusChip(contact.status)}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, contact)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mockContacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Lignes par page"
        />
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpenDialog}>Voir le message</MenuItem>
        <MenuItem onClick={handleMenuClose}>Marquer comme lu</MenuItem>
        <MenuItem onClick={handleMenuClose}>Répondre</MenuItem>
        <MenuItem onClick={handleMenuClose}>Supprimer</MenuItem>
      </Menu>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Message de {selectedContact?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" className="mb-2">
            Email: {selectedContact?.email}
          </Typography>
          <Typography variant="subtitle2" className="mb-4 text-gray-600">
            Reçu le {selectedContact?.createdAt}
          </Typography>
          <Typography variant="body1">
            {selectedContact?.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fermer</Button>
          <Button variant="contained" color="primary">
            Répondre
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactsList;
