import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await dispatch(signInUser(data));
      navigate(location.state?.from || '/catalog');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      component={Paper}
      maxWidth='xs'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography
        component='h1'
        variant='h5'
      >
        Sign in
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          id='username'
          label='Username'
          autoFocus
          {...register('username', { required: 'Username required' })}
          error={!!errors.username}
          helperText={errors?.username?.message?.toString()}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          label='Password'
          type='password'
          id='password'
          {...register('password', { required: 'Password required' })}
          autoComplete='current-password'
          error={!!errors.password}
          helperText={errors?.password?.message?.toString()}
        />
        <LoadingButton
          type='submit'
          fullWidth
          variant='contained'
          loading={isSubmitting}
          disabled={!isValid}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid
            item
            xs
          >
            <Link to='/forgotPassword'>Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link to='/register'>{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
