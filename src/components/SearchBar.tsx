import { InputAdornment, TextField } from "@mui/material";
import React,{ useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";


const SearchBar = ({ searchTerm, setSearchTerm,getMovie,data }:any) => {

  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(event.currentTarget.value);
  };

  return (
    <>
      <TextField
        id='search'
        type='search'
        label='Search'
        value={searchTerm}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            getMovie(searchTerm);
            ev.preventDefault();
          }
        }}
        onChange={handleChange}
        sx={{ width: "100%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

    </>
  );
};

export default SearchBar;
