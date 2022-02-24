import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Stack } from '@mui/material';

function createData(name, location, address, port, actions) {
  return {
    name, location, address, port, actions,
  };
}

const computersList = [
  createData('Desktop 01', 'Office', '10.0.0.171', '22200'),
  createData('Desktop 02', 'Office', '10.0.0.172', '22200'),
  createData('Desktop 03', 'Office', '10.0.0.173', '22200'),
  createData('Desktop 04', 'Office', '10.0.0.174', '22200'),
  createData('Desktop 05', 'Office', '10.0.0.175', '22200'),
  createData('Laptop 01', 'Office', '10.0.0.176', '22200'),
  createData('Laptop 02', 'Office', '10.0.0.177', '22200'),
];

function MyComputersList(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Computer Name</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Host Port</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {computersList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.location}</TableCell>
              <TableCell align="left">{row.address}</TableCell>
              <TableCell align="left">{row.port}</TableCell>
              <TableCell align="right">
                <Stack spacing={1} direction="row" justifyContent="end">
                  <Button onClick={() => { props.viewToggleRequest(row); }} variant="outlined"><VisibilityIcon /></Button>
                  <Button variant="outlined"><MoreVertIcon /></Button>
                  <Button variant="contained" style={{ background: '#B00020' }}><DeleteForeverIcon /></Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyComputersList;
