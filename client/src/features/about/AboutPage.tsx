import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import agent from '../../app/api/agent';
import { useState } from 'react';

export default function AboutPage() {
  const [validationError, setValidationError] = useState<string[]>([]);
  const getValidationError = () => {
    agent.TestErrors.getValidationError()
      .then(() => console.log('This should not get called'))
      .catch((error) => {
        setValidationError(error);
      });
  };
  return (
    <Container>
      <Typography
        gutterBottom
        variant='h2'
      >
        Test Errors
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant='contained'
          onClick={() => agent.TestErrors.get404Error()}
        >
          Not found
        </Button>
        <Button
          variant='contained'
          onClick={() => agent.TestErrors.get400Error()}
        >
          Bad Request
        </Button>
        <Button
          variant='contained'
          onClick={() => agent.TestErrors.get401Error()}
        >
          Unauthorized
        </Button>
        <Button
          variant='contained'
          onClick={() => agent.TestErrors.get500Error()}
        >
          Server error
        </Button>
        <Button
          variant='contained'
          onClick={getValidationError}
        >
          Validation error
        </Button>
      </ButtonGroup>
      {validationError.length > 0 && (
        <Alert
          severity='error'
          color='error'
          variant='outlined'
        >
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationError.map((error, index) => (
              <ListItem key={index}>{error}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
