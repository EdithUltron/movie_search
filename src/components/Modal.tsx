import React from 'react'
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface modalProps {
  open: boolean;
    handleClose: () => void;
    data:any
}

const ModalComponent = ({ open, handleClose,data }:modalProps) => {
    
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "40%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Card sx={style}>
        <CardMedia
          component='img'
          alt='green iguana'
          height='140'
          image='/static/images/cards/contemplative-reptile.jpg'
        />
        <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {data?.Title}
                </Typography>
                {data?.Plot && <Typography variant='body2' color='text.secondary'>
                  {data?.Plot}
                </Typography>}
                <Typography variant='body2' color='text.secondary'>
                  {data?.Year}
                </Typography>
              </CardContent>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Country: {data?.Country}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Lizard
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Share</Button>
          <Button size='small'>Learn More</Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default ModalComponent;
