import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
// import fire from '../../fire'

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  // const handleUpdatePassword = useCallback(
  //   async event => {
  //     event.preventDefault();
  //     console.log(values.confirm, 'here is confirm password')
  //     try {
  //       var user = fire.auth().currentUser;
  //       var credential = fire.auth.Aut.credential('gskqpuoqfjrneagfsk@wqcefp.com', '121212')

  //       await user.reauthenticateWithCredential(credential)
  //       .then(() => {
  //         user.updatePassword(values.confirm)
  //           .then(() => {
  //             alert('password update success')
  //           })
  //       })
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }
  // );

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={() => {}}
    >
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};


export default Password;