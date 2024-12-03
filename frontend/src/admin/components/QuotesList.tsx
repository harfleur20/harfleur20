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
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';

interface Quote {
  id: string;
  name: string;
  email: string;
  serviceType: string;
  budget: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

const mockQuotes: Quote[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    serviceType: 'Web Design',
    budget: 5000,
    status: 'pending',
    createdAt: '2024-01-15',
  },
  // Add more mock data as needed
];

const QuotesList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, quoteId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedQuote(quoteId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedQuote(null);
  };

  const getStatusChip = (status: string) => {
    const statusConfig = {
      pending: { icon: <AccessTimeIcon />, color: 'warning', label: 'En attente' },
      accepted: { icon: <CheckCircleIcon />, color: 'success', label: 'Accepté' },
      rejected: { icon: <CancelIcon />, color: 'error', label: 'Refusé' },
    };

    const config = statusConfig[status as keyof typeof statusConfig];

    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color as 'warning' | 'success' | 'error'}
        size="small"
      />
    );
  };

  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6 font-bold">
        Devis
      </Typography>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockQuotes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((quote) => (
                  <TableRow key={quote.id} hover>
                    <TableCell>{new Date(quote.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{quote.name}</TableCell>
                    <TableCell>{quote.email}</TableCell>
                    <TableCell>{quote.serviceType}</TableCell>
                    <TableCell>{quote.budget}€</TableCell>
                    <TableCell>{getStatusChip(quote.status)}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, quote.id)}
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
          count={mockQuotes.length}
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
        <MenuItem onClick={handleMenuClose}>Voir les détails</MenuItem>
        <MenuItem onClick={handleMenuClose}>Accepter</MenuItem>
        <MenuItem onClick={handleMenuClose}>Refuser</MenuItem>
        <MenuItem onClick={handleMenuClose}>Supprimer</MenuItem>
      </Menu>
    </Box>
  );
};

export default QuotesList;
