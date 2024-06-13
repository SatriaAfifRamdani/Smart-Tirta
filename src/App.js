// App.js
import React, { useState, useEffect } from 'react';
import { Container, Button, Box, Typography, TablePagination } from '@mui/material';
import FilterForm from './components/FilterForm';
import DataTable from './components/DataTable';
import Header from './components/Header';
import { db } from './firebaseconfig'; // Ensure this path is correct
import { collection, getDocs } from 'firebase/firestore';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 25; // Change this value to 25

  // Function to fetch data from Firestore
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'SmartWaterMeterReader'));
      const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort data based on numerical ID
      const sortedData = dataList.sort((a, b) => {
        const numA = parseInt(a.id.replace('ReadTirta', ''), 10);
        const numB = parseInt(b.id.replace('ReadTirta', ''), 10);
        return numA - numB;
      });

      setData(sortedData);
      setFilteredData(sortedData); // Initialize filteredData with all data
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle filter form submission
  const handleFilter = ({ waktuPengambilanCitra }) => {
    if (!waktuPengambilanCitra) {
      // If no date is provided, reset to show all data
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((row) => {
      const dateToFilter = new Date(waktuPengambilanCitra);
      const rowDate = new Date(row.WaktuPengambilanCitra);

      // Compare only the date part
      return (
        dateToFilter.getFullYear() === rowDate.getFullYear() &&
        dateToFilter.getMonth() === rowDate.getMonth() &&
        dateToFilter.getDate() === rowDate.getDate()
      );
    });
    setFilteredData(filtered);
  };

  // Function to convert JSON data to CSV
  const convertToCSV = (data) => {
    const headers = ['Id', 'Perangkat', 'WaktuPengambilanCitra', 'AngkaMeteran', 'CitraMeteran', 'Foto'];
    const rows = data.map(row => [
      row.id,
      row.Perangkat,
      new Date(row.WaktuPengambilanCitra).toLocaleString(),
      row.AngkaMeteran,
      row.CitraMeteran,
      row.foto
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\r\n';

    rows.forEach(row => {
      csvContent += row.join(',') + '\r\n';
    });

    return encodeURI(csvContent);
  };

  // Function to download CSV file
  const downloadCSV = () => {
    const csvContent = convertToCSV(filteredData);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'meteran_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Header />
      <Box sx={{ mt: 4 }}>
        <Container>
          <FilterForm onFilter={handleFilter} />
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button variant="contained" onClick={downloadCSV}>Download CSV</Button>
          </Box>
          <Typography variant="h4" gutterBottom>
            Water Meter Readings
          </Typography>
          <DataTable data={filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} />
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]} // No option to change the rows per page
          />
        </Container>
      </Box>
    </div>
  );
};

export default App;
