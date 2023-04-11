import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../../features/auth/authSlice';

const SignUpFormUser = () => {
  const [registerData, setRegisterData] = useState({})
  const user = useSelector((state) => state.authuser)
  const dispatch = useDispatch()

  const handleSignUp = async (e) => {
    e.preventDefault()
    dispatch(signupUser(registerData))
  }

  useEffect(() => {
    console.log(user)
  },[user])

  const usertype = (value) => {
    (value === 'student') ? (
      setRegisterData({
        ...registerData,
        "student" : 'true',
        "alumni" : 'false'
      })
    ) :(
      setRegisterData({
        ...registerData,
        "student" : 'false',
        "alumni" : 'true'
      })
    )
  }

  const onChange = (e) => {
    (e.target.name === 'user_type')?( 
       usertype(e.target.value)
    ):(setRegisterData(
      {
        ...registerData,
        [e.target.name]: e.target.value,
      }
    ))
  }
  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        {
          (user?.status === 'user') ? (
            <div>
              please verify user email
            </div>
          ) : (
            <Box 
              sx={{
                marginTop: 20, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center'
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" Validate onSubmit={(e) => handleSignUp(e)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel id="userType">You are ?</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="userType"
                        name="user_type"
                        onChange={onChange}
                      >
                        <FormControlLabel sx={{ml: 3}} value="student" control={<Radio />} label="Student" />
                        <FormControlLabel sx={{ml: 10}}  value="alumni" control={<Radio />} label="Alumni" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        onChange={onChange}
                      />
                    </Grid>
                  <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        onChange={onChange}
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      onChange={onChange}
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
                      Next
                    </Button>
                  )
                }
              </Box>
            </Box>
          )
        }
    </Container>
  )
}

export default SignUpFormUser