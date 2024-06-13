// DataTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DataTable = ({ data }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Perangkat</TableCell>
          <TableCell>Waktu Pengambilan Citra</TableCell>
          <TableCell>Angka Meteran</TableCell>
          <TableCell>Citra Meteran</TableCell>
          <TableCell>Foto</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.Perangkat}</TableCell>
            <TableCell>{new Date(row.WaktuPengambilanCitra).toLocaleString()}</TableCell>
            <TableCell>{row.AngkaMeteran}</TableCell>
            <TableCell>{row.CitraMeteran}</TableCell>
            <TableCell>
              <img src={row.foto} alt="Meter" style={{ width: 50, height: 50 }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DataTable;
