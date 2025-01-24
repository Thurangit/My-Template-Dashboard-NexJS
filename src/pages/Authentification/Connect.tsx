import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from '@mui/material';

const ConnectForm = () => {
  const theme = useTheme();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Add your authentication logic here

    // Redirect to a different page after successful login
    router.push('/dashboard/');
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="lg"
        style={{
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {/* <Logo_Blue /> */}
        <div style={{ marginBottom: '20px' }}></div>
        <CssBaseline />
        <Paper
          elevation={3}
          style=
          {{
            padding: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h2">
            Connexion
          </Typography>
          <form
            style=
            {{
              width: '100%',
              marginTop: theme.spacing(1),
            }}
            onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              style=
              {{
                margin: theme.spacing(3, 0, 2),
              }}
            >
              Se connecter
            </Button>
          </form>
        </Paper>
      </Container>
      {/* <Button href="/" variant="outlined">
                  Go to homepage
                </Button> */}
      {/* <Footer/> */}
    </>
  );
};

export default ConnectForm;
