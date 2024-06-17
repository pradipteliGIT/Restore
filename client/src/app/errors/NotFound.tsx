import { SentimentDissatisfied } from '@mui/icons-material';
import { Box, Button, Container, Divider, Typography } from '@mui/material';

import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container
      sx={{
        height: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant='h6'>
          We have not found what you are looking for
        </Typography>
        <SentimentDissatisfied color='secondary' />
      </Box>

      <Divider />
      <Button
        component={NavLink}
        to='/catalog'
      >
        Go to catalog
      </Button>
    </Container>
  );
}
