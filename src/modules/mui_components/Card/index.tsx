import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Costumer } from '../../types/Costumer';

interface Props {
  costumer: Costumer;
}

export const CostumerCard: React.FC<Props> = ({ costumer }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};
