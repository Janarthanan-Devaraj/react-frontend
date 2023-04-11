import React, {useEffect, useState} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signupUserCompany } from '../../features/auth/authSlice';

const SignUpCompany = () => {
  const [registerData, setRegisterData] = useState({})
  const user = useSelector((state) => state.authuser)
  const dispatch = useDispatch()
  const accessToken =  JSON.parse(localStorage.getItem('authTokens'))
  const navigate = useNavigate()

  useEffect(() => {
    if(user?.status === 'user-company'){
      navigate('/')
    }
  }, [user])

  const handleSignUp = (e) => {
    e.preventDefault()
    const data = {
      registerData: registerData,
      access: accessToken?.access
    }
    console.log(data)
    dispatch(signupUserCompany(data))
  }

  const onChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target?.name] : e.target?.value
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Typography variant="h6">
            Enter Your Company Details
          </Typography>
          <Box component="form" Validate onSubmit={handleSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                      name="company_name"
                      required
                      fullWidth
                      label="Company Name"
                      onChange={onChange}
                      autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      name="role"
                      required
                      fullWidth
                      label="Role"
                      onChange={onChange}
                      autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      name="location"
                      required
                      fullWidth
                      label="Location"
                      onChange={onChange}
                      autoFocus
                    />
                </Grid>
              </Grid>
              {
                  (user?.loading)? (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled
                    >
                    Loading...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign up
                    </Button>
                  )
                }
            </Box>
        </Box>
    </Container>
  )
}

export default SignUpCompany