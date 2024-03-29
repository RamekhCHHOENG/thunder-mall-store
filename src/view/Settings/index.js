import React from 'react';
import {
  Box,
  Container,
} from '@material-ui/core';
import Notifications from './Notifications';
import Password from './Password';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     minHeight: '100%',
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3)
//   }
// }));

const SettingsView = () => {
  return (
      <Container maxWidth="lg">
        <Notifications />
        <Box mt={3}>
          <Password />
        </Box>
      </Container>
  );
};

export default SettingsView;