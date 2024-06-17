import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

export default function ServerError() {
  const { state } = useLocation();

  return (
    <Container
      component={Paper}
      sx={{ my: 2, p: 2 }}
    >
      {state?.error ? (
        <>
          <Typography variant='h3'>{state.error.title}</Typography>
          <Divider />
          <Typography
            variant='h6'
            color='error'
          >
            {state.error.detail || 'Internal server error'}
          </Typography>
          <Button
            component={NavLink}
            to='/'
          >
            Go to re-store
          </Button>
        </>
      ) : (
        <Typography
          variant='h5'
          gutterBottom
        >
          Server Error
        </Typography>
      )}
    </Container>
  );
}
