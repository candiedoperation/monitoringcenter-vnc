import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Stack, Grid, Divider, CircularProgress } from '@mui/material';

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
  createData('Laptop 02', 'Office', '192.168.29.18', '22200'),
];

function RemoteConnectionButton(props) {
  const [isConnecting, setConnecting] = React.useState(false);
  function handleNewConnection() {
    setConnecting(true);
    props.viewToggleRequest(props.computerData, () => {
      setConnecting(false);
    });
  }

  return (
    <LoadingButton 
      loading={isConnecting} 
      size="small" 
      onClick={handleNewConnection}
      variant={(isConnecting) ? "contained" : "text"}
      style={{ marginRight: '5px' }}
    >
      View
    </LoadingButton>
  );
}

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
            key={row.address}
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
                <Button loading onClick={() => { props.viewToggleRequest(row); }} variant="outlined"><VisibilityIcon /></Button>
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
          <Box style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              style={{ background: "#000000" }}
              height="180"
              loading="lazy"
              image={`http://${internal_props.computerData.address}:${internal_props.computerData.port}/api/frameBuffer`}
              alt="FrameBuffer Display"
            />
            <Typography variant="h5" style={{ position: 'absolute', color: "#FFFFFF" }}>
              ...
            </Typography>
          </Box>
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
              <RemoteConnectionButton viewToggleRequest={props.viewToggleRequest} computerData={internal_props.computerData}></RemoteConnectionButton>
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
          <ComputerDataCard key={row.address} computerData={row} />
        ))}
      </Grid>
    </Box>
  );
}

export { MyComputersList, MyComputersGrid };
