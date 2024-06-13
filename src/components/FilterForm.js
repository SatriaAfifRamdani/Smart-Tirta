// src/components/FilterForm.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const FilterForm = ({ onFilter }) => {
  const [waktuPengambilanCitra, setWaktuPengambilanCitra] = useState('');

  const handleFilter = () => {
    onFilter({
      waktuPengambilanCitra,
    });
  };

  return (
    <Box component="form" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
      <TextField
        label="Waktu Pengambilan Citra"
        type="date"
        value={waktuPengambilanCitra}
        onChange={(e) => setWaktuPengambilanCitra(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" onClick={handleFilter}>Filter</Button>
    </Box>
  );
};

export default FilterForm;
