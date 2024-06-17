import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
type Props = {
  message?: string;
};

export default function LoadingComponent({ message = 'Loading...!' }: Props) {
  return (
    <Backdrop open={true}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100dvh'
      >
        <CircularProgress color='secondary' />
        <Typography
          variant='h6'
          justifyContent='center'
          position='fixed'
          top='60%'
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
