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
  IconButton,
  Grid,
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Avatar
} from '@material-ui/core';

import { Create, Delete, Search, Add } from '@material-ui/icons';
import { store } from 'react-notifications-component';
import { Link } from 'react-router-dom'

const columns = [
  { id: 'code', label: 'Product Code' },
  { id: 'name', label: 'Product Name' },
  { id: 'quantity', label: 'Quantity(QTY)' },
  { id: 'category', label: 'Category(Type)' },
  { id: 'price', label: 'Price(US Dollar)' },
  { id: 'totalSell', label: 'Total Sell(P-QTY)' },
  { id: 'picture', label: 'Picture(Cover)' },
  { id: 'action', label: 'Action' }
];

const rows = [];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  }
});
const statusItems = ['Active', 'Inactive']
export default function Category(productCategory) {
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({code: '', name: '', picture: ''});
  const [toggleCreateDialog, setToggleCreateDialog] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [cateCode, setCateCode] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isImageChange, setIsImageChange] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [buttonTitle, setButtonTitle] = useState(null);

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [discount, setDiscount] = useState('');
  const [totalSell, setTotalSell] = useState('');
  const [price, setPrice] = useState('');
  const [model, setModel] = useState('');
  const [branch, setBranch] = useState('');
  const [status, setStatus] = useState('');
  const [picture, setPicture] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const db = fire.firestore();
      const data = await db
      .collection('products')
      .orderBy('code')
      .limit(rowsPerPage)
      .startAt(page)
      .get();  
      const products = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setProducts(products);
      // console.log(products, 'here is loading data');
    } 
    fetchProducts();
  }, [productCategory,products])
  
  const fetchCateogries = async () => {
    const db = fire.firestore();
    const data = await db
    .collection("categories")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let {name} = doc.data();
          categories.push(name)
      })
    });
  } 

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    alert(newPage, 'start at page')
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //delete function
  const handleDeleteDialog = (id) => {
    setOpen(true);
    setCategoryInfo(id);
    console.log(id)
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    try {
      const db = fire.firestore();
      db.collection("products").doc(categoryInfo.id).delete().then(() => {
        setOpen(false);
      }).catch((error) => {
        alert(error)
      });
    } catch (err) {
      console.log(err)
    }
  }

  const setupDialogTitle = () => {
    if(!isEdit) {
      setDialogTitle('Create New Productl');
      setButtonTitle('Create');
    } else {
      setDialogTitle('Update Product');
      setButtonTitle('Update');
    }
  }
  //Create function 
  const handleCreateDialog = () => {
    fetchCateogries()
    setupDialogTitle();
    setIsEdit(false)
    setToggleCreateDialog(true);
    setCode('')
    setName('')
    setDescription('');
    setCategory('')
    setQuantity('');
    setDiscount('');
    setPrice('');
    setBranch('');
    setModel('');
    setStatus('');
    setPicture('')
  };
  const handleEditDialog = (cate) => {
    console.log(cate)
    setupDialogTitle();
    setIsEdit(true);
    setToggleCreateDialog(true);
    setCode(cate.code);
    setName(cate.name);
    setCateCode(cate.code);
    setDescription(cate.description);
    setCategory(cate.category)
    setQuantity(cate.quantity);
    setDiscount(cate.discount);
    setPrice(cate.price);
    setBranch(cate.branch);
    setModel(cate.model);
    setStatus(cate.status);
    setPicture(cate.picture)
  };

  const closeCreateDialog = () => {
    setToggleCreateDialog(false);
  };
  const handleCreateNewCategory = async (e) => {
    e.preventDefault();
    try {     
      if (!isEdit) {
        onRequestCreateProduct()
      } else {
        onRequestUpdateProduct()
      }
      setToggleCreateDialog(false);

    } catch (err) {
      console.log(err, 'cannot create or update')
    }
  }

  const onRequestCreateProduct = async () => {
    const db = fire.firestore();
    const storageRef = fire.storage().ref();
    const fileRef = storageRef.child(imageFile.name);
    await fileRef.put(imageFile)
        await fileRef.getDownloadURL().then((url) => {
          db.collection("products").doc(code).set({
            code: code,
            name: name,
            description: description,
            category: category,
            quantity: quantity,
            discount: discount,
            totalSell: totalSell,
            price: price,
            branch: branch,
            model: model,
            status: status,
            createdBy: 'Admin',
            createdAt: '',
            updatedBy: '',
            updatedAt: '',
            picture: url
          })
        })
  }

  const onRequestUpdateProduct = async () => {
    const db = fire.firestore();
    const storageRef = fire.storage().ref();
    if(isImageChange) {
      const fileRef = storageRef.child(imageFile.name);
      await fileRef.put(imageFile);
      await fileRef.getDownloadURL().then((url) => {
        db.collection("products").doc(cateCode).update({
          code: code,
          name: name,
          description: description,
          category: category,
          quantity: quantity,
          discount: discount,
          totalSell: totalSell,
          price: price,
          branch: branch,
          model: model,
          status: status,
          createdBy: 'Admin',
          createdAt: db.Timestamp,
          updatedBy: '',
          updatedAt: db.Timestamp,
          picture: url
        })
      })
    } else {
      db.collection("products").doc(cateCode).update({
        code: code,
        name: name,
        description: description,
        category: category,
        quantity: quantity,
        discount: discount,
        totalSell: totalSell,
        price: price,
        branch: branch,
        model: model,
        status: status,
        createdBy: 'Admin',
        createdAt: db.Timestamp,
        updatedBy: '',
        updatedAt: db.Timestamp,
        picture: picture  
      })
    }
    
  }

  const onImageChange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    setImageFile(file);

    reader.onloadend = function (e) {
      setPreviewImage([reader.result]);
    };
  console.log(url)
    setIsImageChange(true);
  }


  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h4">
        Product
      </Typography>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={6}>
        <Grid container>
        <Grid item xs={4}>
          <Autocomplete
            id="combo-box"
            options={categories}
            getOptionLabel={(option) => option}
            style={{marginTop: 16}}
            renderInput={(params) => <TextField {...params} label="Categegory" variant="outlined" size="small" />}
          />
        </Grid>
        <Grid item xs={4}>
            <TextField
              label="Search..."
              id="outlined-size-small"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              name="status"
              type="text"
              style={{marginLeft: 16}}
            />
        </Grid>
        <Grid item xs={4}>
          <Button color="primary" variant="contained" style={{marginTop: 18, marginLeft: 32}}>
            <Search />
          </Button>
        </Grid>
            </Grid>
        </Grid>
        <Grid item xs={6} align="right" justify="middle">
          <Button variant="contained" color="primary" onClick={handleCreateDialog}>
            <Add /> Create
          </Button>
        </Grid>
      </Grid>
      <TableContainer className={classes.container} style={{ maxHeight: "70%"}}>
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
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cate) => {
              return (
                <TableRow hover tabIndex={-1} key={cate.id} style={{ height: '10px' }}>
                  <TableCell>{cate.code}</TableCell>
                  <TableCell>{cate.name}</TableCell>
                  <TableCell>{cate.category}</TableCell>
                  <TableCell>{cate.quantity}</TableCell>
                  <TableCell>{cate.price}</TableCell>
                  <TableCell>{cate.totalSell || 0}</TableCell>
                  <TableCell style={{ width: '200px' }}>
                    <img alt="icons" src={cate.picture} style={{ width: '30px', height: '30px' }} />
                  </TableCell>
                  <TableCell style={{ margin: 0, padding: 0, width: "100px" }}>
                    <IconButton color="primary" onClick={e=>handleEditDialog(cate)}>
                      <Create />
                    </IconButton>
                    <IconButton color="primary" onClick={e => handleDeleteDialog(cate)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this category {categoryInfo.code}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={handleDelete} color="primary" variant="contained" autoFocus pending={true}>
            Confirm
            </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={toggleCreateDialog}
        onClose={closeCreateDialog}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{paddingBottom: 0}}>{dialogTitle}</DialogTitle>
        <form onSubmit={handleCreateNewCategory}>
          <DialogContent style={{paddingTop: 0}}>
            <Grid container justify="space-around" spacing={4}>
              <Grid item xs={6}>
                  <TextField
                  label="Code"
                  id="outlined-size-small"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  size="small"
                  name="code"
                  type="text" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <TextField
                  label="Name"
                  id="outlined-size-small"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  size="small"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Description"
                  id="outlined-size-small"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  size="small"
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {/* <TextField
                  label="Category"
                  id="outlined-size-small"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  size="small"
                  name="cateogry"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                /> */}
              <Autocomplete
                value={category}
                onChange={(event, newValue) => {
                  setCategory(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                options={categories}
                style={{ marginTop: 16 }}
                renderInput={(params) => <TextField {...params} label="Category" variant="outlined" size="small"/>}
              />
              </Grid>
              <Grid item xs={6}>

            <TextField
              label="Quantity"
              id="outlined-size-small"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              name="quantity"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              label="Discount"
              id="outlined-size-small"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              name="discouont"
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <TextField
              label="Price"
              id="outlined-size-small"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              name="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              label="Branch"
              id="outlined-size-small"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              name="branch"
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
            <TextField
              label="Model"
              id="outlined-size-small"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              name="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <TextField
              label="Status"
              id="outlined-size-small"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              name="status"
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
              </Grid>
            </Grid>
           
            <input
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              onChange={onImageChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span" style={{marginTop: 10}}>
                Upload Image
              </Button>
            </label> <br/>
            <img alt="IMAGE" style={{width: 100, height:100, marginLeft: 20}} src={isImageChange ? previewImage : picture}/>
          </DialogContent>
          <DialogActions> 
            <Button onClick={closeCreateDialog} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" autoFocus>
              {buttonTitle}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
}
