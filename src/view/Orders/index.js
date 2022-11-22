import React, { useEffect, useState } from 'react';
import fire from '../../fire';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import {
  Typography,
  Grid,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from '@material-ui/core';

import { Search } from '@material-ui/icons';
import NumberFormat from 'react-number-format';

const columns = [
  { id: 'code', label: 'Orders Code' },
  { id: 'customerId', label: 'Customer ID' },
  { id: 'name', label: 'Customer Name' },
  { id: 'price', label: 'Phone Number' },
  { id: 'Email', label: 'Email' },
  { id: 'address', label: 'Delivery Address' },
  { id: 'quantity', label: 'Total Price' },
  { id: 'status', label: 'Status' }
];

// const rows = [];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  }
});
// const product = [{ code: 'TBBB', name: 'Iphone', price: 233, quantity: 1, picture: 'https://firebasestorage.googleapis.com/v0/b/thunder-mall-2400e.appspot.com/o/1936732220.png?alt=media&token=ccec8cf5-08bc-4bad-85bb-69aa742ef897' }]
export default function Category(productCategory) {
  const classes = useStyles();
  
  
  // const [inputValue, setInputValue] = useState('');
  const [open, setDialogOpen] = useState(false);
  const [orders, setOrders] = useState([])
  const [categories] = useState([])
  const [products, setProducts] = useState([])
  const [productDetail, setProductDetail] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchorders = async () => {
      const db = fire.firestore();
      const data = await db
        .collection('orders')
        .orderBy('orderId')
        .limit(rowsPerPage)
        .startAt(page)
        .get();
      const orders = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setOrders(orders);
    }
    fetchorders();
    //react-hooks/exhaustive-deps
  }, [productCategory, orders])
  //react-hooks/exhaustive-deps

  const fetchProductOrder = async (items) => {
    const db = fire.firestore();
    const data = await db
      .collection("orders")
      .doc(items.orderId)
      .collection('products')
      .get();

    const products = data.docs.map(doc => ({
      ...doc.data()
    }));
    setProducts(products);
    console.log(products, 'here is last');
  }

  const handleClose = () => {
    setDialogOpen(false);
    setProducts([]);
  };

  const totalAmountToPay = (items) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleShowProductOrder = (items) => {
    fetchProductOrder(items)
    setProductDetail(items)
    console.log(productDetail, 'here  is product detail')
    setDialogOpen(true)
  }

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h4">
        List of Orders
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={4}>
              <Autocomplete
                id="combo-box"
                options={categories}
                getOptionLabel={(option) => option}
                style={{ marginTop: 16 }}
                renderInput={(params) => <TextField {...params} label="Categegory" variant="outlined" size="small" />}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Search..."
                id="outlined-size-small"
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="status"
                type="text"
                style={{ marginLeft: 16 }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button color="primary" variant="contained" style={{ marginTop: 18, marginLeft: 32 }}>
                <Search />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <TableContainer className={classes.container} style={{ maxHeight: "70%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cate) => {
              return (
                <TableRow hover tabIndex={-1} key={cate.id} style={{ height: '10px' }}>
                  <TableCell>
                    <button
                      style={{ color: 'blue', border: 'none', outline: 'none', background: 'none' }}
                      onClick={(e) => handleShowProductOrder(cate)}
                    >{cate.orderId}</button>
                  </TableCell>
                  <TableCell>{cate.customerId}</TableCell>
                  <TableCell>{cate.name}</TableCell>
                  <TableCell>{cate.phone}</TableCell>
                  <TableCell>{cate.email || 'No Email'}</TableCell>
                  <TableCell>{cate.address}</TableCell>
                  <TableCell>
                    <NumberFormat
                      value={cate.totalToPay}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      displayType={'text'}
                      thousandSeparator={true} prefix={'$'}
                    />
                  </TableCell>
                  <TableCell>{cate.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={100}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Product Ordered"}</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={6}>
              <span>Order ID</span>
            </Grid>
            <Grid item xs={6} align="right">
              <span>{productDetail.orderId}</span>
            </Grid>
          </Grid>
          <Grid container style={{marginTop: 10}}>
            <Grid item xs={6}>
              <span>Customer ID</span>
            </Grid>
            <Grid item xs={6} align="right">
              <span>{productDetail.customerId}</span>
            </Grid>
          </Grid>
          <Grid container style={{marginTop: 10}}>
            <Grid item xs={6}>
              <span>Customer Name</span>
            </Grid>
            <Grid item xs={6} align="right">
              <span>{productDetail.name}</span>
            </Grid>
          </Grid>
          <Grid container style={{marginTop: 10}}>
            <Grid item xs={6}>
              <span>Phone Number</span>
            </Grid>
            <Grid item xs={6} align="right">
              <span>{productDetail.phone}</span>
            </Grid>
          </Grid>
          <Grid container style={{marginTop: 10}}>
            <Grid item xs={6}>
              <span>Email</span>
            </Grid>
            <Grid item xs={6} align="right">
              <span>{productDetail.email}</span>
            </Grid>
          </Grid>
          <Grid container style={{marginTop: 10}}>
            <Grid item xs={6}>
              <span>Delivery Address</span>
            </Grid>
            <Grid item xs={6} align="right">
              <span>{productDetail.address}</span>
            </Grid>
          </Grid>
          <Grid container style={{marginTop: 10}}>
            <Grid item xs={6}>
              <span>Total Price</span>
            </Grid>
            <Grid item xs={6} align="right">
              <span>{productDetail.totalToPay}</span>
            </Grid>
          </Grid>
          <Grid container style={{marginTop: 10}}>
            <Grid item xs={6}>
              <span>Delivery Status</span>
            </Grid>
            <Grid item xs={6} align="right">
              <span>{productDetail.status}</span>
            </Grid>
          </Grid>

            <TableContainer component={Paper} style={{marginTop: 16}}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Picture</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((row) => (
                    <TableRow key={row.code}>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <NumberFormat
                          value={row.price}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          displayType={'text'}
                          thousandSeparator={true} prefix={'$'}
                        />
                      </TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>
                        <img alt="icons" src={row.picture} style={{ width: '30px', height: '30px' }} />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">
                      <NumberFormat
                        value={totalAmountToPay(products)}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        displayType={'text'}
                        thousandSeparator={true} prefix={'$'}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
