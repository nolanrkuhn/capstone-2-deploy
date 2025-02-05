import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
} from '@mui/material';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import axios from 'axios';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(loginStart());
      const response = await axios.post('/api/auth/login', values);
      dispatch(loginSuccess(response.data));
      navigate('/recipes');
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <TextField
                fullWidth
                margin="normal"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default Login;