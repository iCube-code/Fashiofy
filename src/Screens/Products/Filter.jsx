import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Rating from "@mui/material/Rating";

export default function Filter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [sort, setSort] = useState("High to Low");
  const [rating, setRating] = useState(0);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5000);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleReset = () => {
    setSort("High to Low");
    setRating(0);
    setMinPrice(500);
    setMaxPrice(5000);
  };

  const handleApply = () => {
    console.log("Sort:", sort);
    console.log("Rating:", rating);
    console.log("Price Range:", minPrice, "-", maxPrice);
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        sx={{ color:"black", fontWeight: 600 }}
        startIcon={<FaFilter />}
      >

      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            p: 3,
            width: 350,
            height: 400,
            display: "flex",
            gap: 2,
          },
        }}
      >
        {/* Header with Reset and Close */}
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="10px" >
          <Typography variant="subtitle1">Filters</Typography>
          <Box >
            <Button size="small" color="black" onClick={handleReset} sx={{ mr: 1 }} >
              Reset
            </Button>
          </Box>
        </Box>

        {/* Sort */}
        <TextField
          select
          label="Filters"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          fullWidth
          
        >
          <MenuItem value="High to Low">High to Low</MenuItem>
          <MenuItem value="Low to High">Low to High</MenuItem>
         
        </TextField>

        {/* Rating */}
        <Box marginTop="10px">
          <Typography variant="body2" mb={1}>
            Rating
          </Typography>
          <Rating
            name="product-rating"
            size="large"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
        </Box>

        {/* Price */}
        <Box marginTop="10px">
          <Typography variant="body2" mb={1}>
            Price
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              label="Min"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              fullWidth
            />
            <TextField
              label="Max"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              fullWidth
            />
          </Box>
        </Box>

        {/* Apply Button */}
        <button
        onClick={handleApply}
         
        className="flex items-center justify-center mx-auto mt-6 px-6 py-2 bg-blue-600 text-white font-semibold cursor-pointer rounded-md hover:bg-blue-700  transition duration-300"
        >
          Apply
        </button>
      </Menu>
    </div>
  );
}
