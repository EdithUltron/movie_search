import React,{useState,useEffect} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Container from '@mui/material/Container'
import { styled } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useLazyFetchImage from "./services/hooks/useFetch";
import { API_KEY } from "./services/constants/constant";
import { useLazyGetMovieQuery } from "./services/api/searchMovie";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import ModalComponent from "./components/Modal";

const Wrapper = styled('div')(({ theme }) => ({
  background:"black",
  height: "100vh",
  [theme.breakpoints.down("md")]: {
    padding:"1px 10%",
  },
  [theme.breakpoints.down("sm")]: {
    padding:"1px 5%",
  },
  [theme.breakpoints.up("lg")]: {
    padding:"1px 20%",
  },
  display: 'flex',
  flexDirection:'column',
  alignItems: 'center',
  justifyContent: "center",
}));

const WrapperInside = styled("div")(({ theme }) => ({
  background: "black",
width:"100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "flex-direction 0.3s ease-in-out",
  // Animation class
  "&.animate": {
    flexDirection: "column-reverse",
  },
}));


const Heading = styled("h1")(({ theme }) => ({
  color: "red",
  [theme.breakpoints.down("md")]: {
    marginBottom: "40px",
    fontSize: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "40px",
    fontSize: "40px",
  },
  [theme.breakpoints.up("lg")]: {
    marginBottom: "40px",
    fontSize: "50px",
  },
  fontFamily: "Kablammo",
  // animation: "smoothMove 0.3s ease-in-out forwards",
  // animationPlayState: "paused",
  // Animation class
  "&.animate": {
    // animationPlayState: "running",

  },
  // Keyframe animation
  // "@keyframes smoothMove": {
  //   "0%": { transform: "translateY(0)" },
  //   "30%":{transform:"translateY(-50px)"},
  //   "50%": { transform: "translateY(-100px)" },
  //   "75%": { transform: "translateY(-130px)" },
  //   "100%": { transform: "translateY(-150px)" },
  // },
}));

function App() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [viewmore, setViewmore] = useState(false);
  
    const [
      getMovie,
      {
        data: MovieData,
        error: Movieerror,
        isLoading: Movieisloading,
        isSuccess: Movieissuccess,
      },
    ] = useLazyGetMovieQuery();
  
  const { imageData, isLoading, error } = useLazyFetchImage(
    `http://img.omdbapi.com/?apikey=${API_KEY}&i=`,
    MovieData?.imdbID
  );

  const data = {
    image: imageData,
    details:MovieData
  }


      const showSuccessMessage = () => {
        toast.success("Successfully Fetched !", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "success1",
        });
      };

      const showErrorMessage = () => {
        toast.error("Error While Parsing !", {
          position: toast.POSITION.TOP_RIGHT,
          toastId:"error1"
        });
      };
  
        const showNotErrorMessage = () => {
          toast.error("Movie Not Found !", {
            position: toast.POSITION.TOP_RIGHT,
            toastId:"errornot1"
          });
        };

      
  useEffect(() => {
    console.log(data);
      if (Movieissuccess && ImageData && MovieData?.Title && !isLoading) {
        showSuccessMessage();
      } else if (Movieissuccess) {
        showNotErrorMessage();
      }
    }, [MovieData, imageData]);

    if (Movieerror) {
      showErrorMessage();
    }
  
    const handleOpen = () => setViewmore(true);
    const handleClose = () => setViewmore(false);

  

  return (
    <>
    <Wrapper>
      <WrapperInside className={Movieissuccess ? "animate" : ""}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          getMovie={getMovie}
          data={data}
        />
        <Heading>MOVIE SEARCH</Heading>
      </WrapperInside>
      {(data?.details?.imdbID || imageData) && (
        <>
          <Card sx={{ maxWidth: 365,width:350, marginTop: "30px" }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='200'
                sx={{
                  objectFit: "cover",
                }}
                src={imageData ? imageData : MovieData?.Poster}
                alt='green iguana'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {data.details.Title}
                </Typography>
                {data?.details?.Plot && <Typography variant='body2' color='text.secondary'>
                  {data.details.Plot}
                </Typography>}
                <Typography variant='body2' color='text.secondary'>
                  {data.details.Year}
                </Typography>
              </CardContent>
              {/* {viewmore && (
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {MovieData.Title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {MovieData.Plot}
                  </Typography>
                </CardContent>
              )} */}
            </CardActionArea>
            {!viewmore && (
              <CardActions>
                <Button
                  onClick={() => setViewmore(true)}
                  size='small'
                  color='primary'>
                  More Details
                </Button>
              </CardActions>
            )}
          </Card>
        </>
      )}
      {!MovieData?.imdbID && (
        <Box sx={{ color: "white", marginTop: "20px", fontSize: "30px" }}>
          {MovieData?.Error}
        </Box>
      )}
      {Movieisloading && (
        <Box sx={{ color: "white", marginTop: "20px", fontSize: "30px" }}>
          Loading
        </Box>
      )}

      <ModalComponent
        open={viewmore}
        handleClose={handleClose}
        data={data?.details}
      />
    </Wrapper>
      <ToastContainer />
    </>
  );
}

export default App;
