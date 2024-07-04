import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'all',
  });

  const handleApiErrors = (errors: any) => {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('Password')) {
          setError('password', { message: error });
        } else if (error.includes('Email')) {
          setError('email', { message: error });
        } else if (error.includes('Username')) {
          setError('username', { message: error });
        }
      });
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
        Register
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(async (data) => {
          await agent.Account.register(data)
            .then(() => {
              toast.success('Registration successful - you can now login');
              navigate('/login');
            })
            .catch((errors: any) => {
              handleApiErrors(errors);
            });
        })}
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
          id='email'
          label='Email'
          {...register('email', {
            required: 'Email required',
            pattern: {
              value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: 'Please enter valid email',
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message?.toString()}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          label='Password'
          type='password'
          id='password'
          {...register('password', {
            required: 'Password required',
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: 'Password does not meets complexity requirements',
            },
          })}
          autoComplete='current-password'
          error={!!errors.password}
          helperText={errors?.password?.message?.toString()}
        />
        <LoadingButton
          disabled={!isValid}
          type='submit'
          fullWidth
          id='btnRegister'
          variant='contained'
          loading={isSubmitting}
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to='/login'>{'Already have an account? Sign In'}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
