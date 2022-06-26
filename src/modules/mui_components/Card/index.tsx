import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Costumer } from '../../types/Costumer';
import EditCostumerDialog from '../EditCostumerDialog';
import DeleteCostumerDialog from '../DeleteCostumerDialog';
interface Props {
  costumer: Costumer;
}

export const CostumerCard: React.FC<Props> = ({ costumer }) => {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleEditOpen = React.useCallback(() => {
    setEditDialogOpen(true);
  }, []);

  const handleEditClose = React.useCallback(() => {
    setEditDialogOpen(false);
  }, []);

  const handleDeleteOpen = React.useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteClose = React.useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  return (
    <>
      <Card sx={{ width: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={costumer.picture}
          alt={`Costumer ${costumer.name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {costumer.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${costumer.name} is ${costumer.age} years old and works at ${costumer.company}.`}
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            {`Contact: ${costumer.email}.`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEditOpen}>
            Edit
          </Button>
          <Button size="small" onClick={handleDeleteOpen}>
            Delete
          </Button>
        </CardActions>
      </Card>
      {editDialogOpen && (
        <EditCostumerDialog
          open={editDialogOpen}
          handleClose={handleEditClose}
          costumer={costumer}
        />
      )}
      {deleteDialogOpen && (
        <DeleteCostumerDialog
          open={deleteDialogOpen}
          handleClose={handleDeleteClose}
          costumer={costumer}
        />
      )}
    </>
  );
};
