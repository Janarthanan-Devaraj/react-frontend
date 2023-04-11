import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux'
import { signupUserProfile } from '../../features/auth/authSlice';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const SignUpFormUserProfile = () => {
  const [registerData, setRegisterData] = useState({})
  const user = useSelector((state) => state.authuser)
  const dispatch = useDispatch()
  const accessToken =  JSON.parse(localStorage.getItem('authTokens'))
  const navigate = useNavigate()


  useEffect(() => {
    if(user?.status === 'user-profile') navigate('/signup/user-academics')
  },[user])

  const handleSignUp = (e) => {
    e.preventDefault()
    const data = {
      registerData: registerData,
      access: accessToken?.access
    }
    console.log(data)
    dispatch(signupUserProfile(data))
  }

  const setdob = (e) => {
    const date = dayjs(e).format('YYYY-MM-DD');
    setRegisterData({...registerData, 'dob' : date})
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
            Enter Your Personal Details
          </Typography>
          <Box component="form" Validate onSubmit={handleSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="first_name"
                  required
                  fullWidth
                  label="First Name"
                  onChange={onChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  onChange={onChange}
                  name="last_name"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    required
                    views={['year', 'month', 'day']}
                    format="YYYY-MM-DD"
                    onChange={(e) => setdob(e)}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  labelId="gender"
                  label="gender"
                  name='gender'
                  onChange={onChange}
                >
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                  <MenuItem value='other'>Other</MenuItem>
                </Select>
              </FormControl>
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

    </Container>
  )
}

export default SignUpFormUserProfile