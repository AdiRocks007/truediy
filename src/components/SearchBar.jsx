import React, { useState } from 'react';
import { Slider, Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';

export function SearchBar({ onSearch, onFilterChange, minInvestment, setMinInvestment, filters }) {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm);
  const [investmentType, setInvestmentType] = useState(filters.investmentType);
  const [strategy, setStrategy] = useState(filters.strategy);
  const [tenure, setTenure] = useState(filters.tenure);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    if (name === 'investmentType') {
      setInvestmentType(value);
    } else if (name === 'strategy') {
      setStrategy(value);
    } else if (name === 'tenure') {
      setTenure(value);
    }

    onFilterChange(name, value);
  };

  const handleSliderChange = (event, newValue) => {
    setMinInvestment(newValue);
    onFilterChange('minInvestment', newValue);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setInvestmentType('');
    setStrategy('');
    setTenure('');
    setMinInvestment(0);

    onSearch('');
    onFilterChange('investmentType', '');
    onFilterChange('strategy', '');
    onFilterChange('tenure', '');
    onFilterChange('minInvestment', 0);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '1rem', backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
      <TextField
        label="Search Project"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginRight: '1rem' }}
      />

      <FormControl sx={{ marginRight: '1rem', minWidth: 120 }}>
        <InputLabel>Investment Type</InputLabel>
        <Select name="investmentType" value={investmentType} onChange={handleFilterChange} label="Investment Type">
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Fractional">Fractional</MenuItem>
          <MenuItem value="Full">Full</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ marginRight: '1rem', minWidth: 120 }}>
        <InputLabel>Strategy</InputLabel>
        <Select name="strategy" value={strategy} onChange={handleFilterChange} label="Strategy">
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Buy to Sell">Buy to Sell</MenuItem>
          <MenuItem value="Buy to Rent">Buy to Rent</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ width: 200, marginRight: '1rem' }}>
        <Typography id="min-investment-slider" gutterBottom>
          Min Investment
        </Typography>
        <Slider
          value={minInvestment}
          onChange={handleSliderChange}
          aria-labelledby="min-investment-slider"
          valueLabelDisplay="auto"
          min={0}
          max={100000000}
        />
      </Box>

      <FormControl sx={{ marginRight: '1rem', minWidth: 120 }}>
        <InputLabel>Tenure</InputLabel>
        <Select name="tenure" value={tenure} onChange={handleFilterChange} label="Tenure">
          <MenuItem value="">None</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>5+</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="secondary" onClick={handleClearFilters}>
        Clear
      </Button>
    </Box>
  );
}
