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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Stack, Grid, Divider } from '@mui/material';

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
  return (<TableContainer component={Paper}>
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
  </TableContainer>);
}

function MyComputersGrid(props) {
  function ComputerDataCard(internal_props) {
    return (
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Card sx={{}}>
          <CardMedia
            component="img"
            height="180"
            image="https://cdn.wallpaperhub.app/cloudcache/7/c/2/f/3/4/7c2f345bdfcadb8a3faf483ebaa2e9aea712bbdb.jpg"
            alt="Loading"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {internal_props.computerData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${internal_props.computerData.address}:${internal_props.computerData.port}`}
            </Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Box style={{ flexGrow: 1 }}>
              <Button size="small" onClick={() => { props.viewToggleRequest(internal_props.computerData); }}>View</Button>
              <Button size="small">Actions</Button>
            </Box>
            <Button variant='contained' size="small" style={{ background: '#B00020' }}>Delete</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {computersList.map((row) => (
          <ComputerDataCard computerData={row} />
        ))}
      </Grid>
    </Box>
  );
}

export { MyComputersList, MyComputersGrid };
