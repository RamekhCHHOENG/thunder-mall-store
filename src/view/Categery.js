import React, { useEffect, useState } from 'react';
import fire from '../fire';
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

import { Create, Delete, ViewList, Add } from '@material-ui/icons';
import { store } from 'react-notifications-component';

const columns = [
  { id: 'code', label: 'Code' },
  { id: 'name', label: 'Name' },
  { id: 'picture', label: 'Picture' },
  { id: 'action', label: 'Action' }
];

function createData(code, name, picture) {
  return { code, name, picture };
}

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
  const [categoryInfo, setCategoryInfo] = useState();
  const [toggleCreateDialog, setToggleCreateDialog] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchCateogries = async () => {
      const db = fire.firestore();
      const data = await db.collection('categories').get();
      const categories = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setCategories(categories);
    } 
    fetchCateogries();
  }, [category])


  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const loadSubCategory = async (cateSelected) => {
    const db = fire.firestore();
    const data = await db.collection('categories').doc(cateSelected.id).collection('name').get();
    const categories = data.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

  }

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

  //Create function 
  const handleCreateDialog = (id) => {
    setToggleCreateDialog(true);
  };

  const closeCreateDialog = () => {
    setToggleCreateDialog(false);
  };
  const handleCreateNewCategory = async (e) => {
    e.preventDefault();
    const code = e.target.code.value;
    const name = e.target.name.value;

    try {
      const db = fire.firestore();
      await db.collection("categories").doc(code).set({
        code: code,
        name: name,
        picture: fileUrl
      })
      setToggleCreateDialog(false);
    } catch (err) {
      alert(err)
    }
  }

  const onImageChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = fire.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL());
  }


  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h4">
        Product Category
      </Typography>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={6}>
          <Autocomplete
            id="combo-box"
            options={categories}
            getOptionLabel={(option) => option.name}
            style={{ width: 350, padding: 16 }}
            onChange={(event, item) => {
              loadSubCategory(item)
            }}
            renderInput={(params) => <TextField {...params} label="Main Categegory" variant="outlined" size="small" />}
          />
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
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cate) => {
              return (
                <TableRow hover tabIndex={-1} key={cate.id} style={{ height: '10px' }}>
                  <TableCell>{cate.code}</TableCell>
                  <TableCell>{cate.name}</TableCell>
                  <TableCell style={{ width: '400px' }}>
                    <img alt="icons" src={cate.picture} style={{ width: '30px', height: '30px' }} />
                  </TableCell>
                  <TableCell style={{ margin: 0, padding: 0, width: "200px" }}>
                    <IconButton color="primary">
                      <Create />
                    </IconButton>
                    <IconButton color="primary" onClick={e => handleDeleteDialog(cate)}>
                      <Delete />
                    </IconButton>
                    <IconButton color="primary">
                      <ViewList />
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
        count={rows.length}
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
            Are you sure you want to delete this category?
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
        <DialogTitle id="alert-dialog-title">{"Create Main Category"}</DialogTitle>
        <form onSubmit={handleCreateNewCategory}>
          <DialogContent>
            <TextField
              label="code"
              id="outlined-size-small"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              name="code"
              type="text"
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
            />
            <input
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              onChange={onImageChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
                  </Button>
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeCreateDialog} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" autoFocus>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
}
