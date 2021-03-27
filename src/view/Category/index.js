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
  { id: 'code', label: 'Category Code' },
  { id: 'name', label: 'Category Name' },
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

export default function Category(category) {
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({code: '', name: '', picture: ''});
  const [toggleCreateDialog, setToggleCreateDialog] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [cateCode, setCateCode] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isImageChange, setIsImageChange] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [buttonTitle, setButtonTitle] = useState(null);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [picture, setPicture] = useState('');

  useEffect(() => {
    const fetchCateogries = async () => {
      setLoadingData(true)
      const db = fire.firestore();
      const data = await db
      .collection('categories')
      .orderBy('code')
      .limit(rowsPerPage)
      .startAt(page)
      .get();  
      const categories = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setCategories(categories);
      setLoadingData(false)
      // console.log(categories, 'here is loading data');
    } 
    fetchCateogries();
  }, [category,categories])

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
      db.collection("categories").doc(categoryInfo.id).delete().then(() => {
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
    setupDialogTitle()
    setCode('')
    setName('')
    setPicture('')
    setIsEdit(false)
    setToggleCreateDialog(true);
  };
  const handleEditDialog = (cate) => {
    setupDialogTitle()
    setIsEdit(true)
    setToggleCreateDialog(true);
    setCode(cate.code)
    setName(cate.name)
    setCateCode(cate.id);
    setPicture(cate.picture)
  };

  const closeCreateDialog = () => {
    setToggleCreateDialog(false);
  };
  const handleCreateNewCategory = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!isEdit) {
        requestCreateCategory()
      } else {
        requestUpdateCategory()
      }
      setLoading(false);
      setToggleCreateDialog(false);

    } catch (err) {
      console.log(err, 'cannot create or update')
    }
  }
  const requestCreateCategory = async () => {
    const db = fire.firestore();
    const storageRef = fire.storage().ref();
    const fileRef = storageRef.child(imageFile.name);
    await fileRef.put(imageFile)
    await fileRef.getDownloadURL().then((url) => {
      db.collection("categories").doc(code).set({
        code: code,
        name: name,
        picture: url
      })
    })
  }
  const requestUpdateCategory = async () => {
    const db = fire.firestore();
    const storageRef = fire.storage().ref();
    if(isImageChange) {
      const fileRef = storageRef.child(imageFile.name);
      await fileRef.put(imageFile);
      await fileRef.getDownloadURL().then((url) => {
        db.collection("categories").doc(cateCode).update({
          code: code,
          name: name,
          picture: url
        })
      })
    } else {
      db.collection("categories").doc(cateCode).update({
        code: code,
        name: name,
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
        Product Category
      </Typography>
      <Grid container justify="center">
      <Grid item xs={6}>
        <Grid container>
        <Grid item xs={6}>
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
        <Grid item xs={6} align="right">
          <Button variant="contained" color="primary" onClick={handleCreateDialog}>
            <Add /> Create
          </Button>
        </Grid>
      </Grid>
      <TableContainer className={classes.container} style={{ maxHeight: "70%"}} loading={loading}>
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
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cate) => {
              return (
                <TableRow hover tabIndex={-1} key={cate.id} style={{ height: '10px' }}>
                  <TableCell>{cate.code}</TableCell>
                  <TableCell>{cate.name}</TableCell>
                  <TableCell style={{ width: '400px' }}>
                    <img alt="icons" src={cate.picture} style={{ width: '30px', height: '30px' }} />
                  </TableCell>
                  <TableCell style={{ margin: 0, padding: 0, width: "200px" }}>
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
        count={categories.length}
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
            <TextField
              label="code"
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
              label="name"
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
            <Button type="submit" color="primary" variant="contained" autoFocus loading={loading}>
              {buttonTitle}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
}
