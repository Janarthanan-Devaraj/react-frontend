import React, {useEffect, useState} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signupUserAcademics } from '../../features/auth/authSlice';


const SignUpAcademics = () => {
  const [registerData, setRegisterData] = useState({})
  const user = useSelector((state) => state.authuser)
  const dispatch = useDispatch()
  const accessToken =  JSON.parse(localStorage.getItem('authTokens'))
  const navigate = useNavigate()

  const cgpa_label = (user?.user?.user?.alumni)? 'CGPA' : 'Current CGPA'
  const button_label = (user?.user?.user?.alumni)? 'Next' : 'Sign up'

  useEffect(() => {
    if( user.status === 'user-academic' && user?.user?.user?.student){
      navigate('/')
    }
    else if( user.status === 'user-academic' && user?.user?.user?.alumni){
      navigate('/signup/user-company')
    }
  }, [user])


  const handleSignUp = (e) => {
    e.preventDefault()
    const data = {
      registerData: registerData,
      access: accessToken?.access
    }
    console.log(data)
    dispatch(signupUserAcademics(data))
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
            Enter Your Academic Details
          </Typography>
          <Box component="form" Validate onSubmit={handleSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField
                    name="roll_number"
                    required
                    fullWidth
                    label="Roll Number"
                    onChange={onChange}
                    autoFocus
                  />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="degree">Degree</InputLabel>
                  <Select
                    labelId="degree"
                    label="degree"
                    name='degree'
                    onChange={onChange}
                  >
                    <MenuItem value='Bachelor of Technology'>Bachelor of Technology</MenuItem>
                    <MenuItem value='Bachelor of Engineering'>Bachelor of Engineering</MenuItem>
                    <MenuItem value='other'>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="department">Department</InputLabel>
                  <Select
                    labelId="department"
                    label="department"
                    name='department'
                    onChange={onChange}
                  >
                    <MenuItem value='Information Technology'>Information Technology</MenuItem>
                    <MenuItem value='Computer Science'>Computer Science</MenuItem>
                    <MenuItem value='other'>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <>
              {
                (user?.user?.user?.student) ? (
                <>
                <Grid item xs={12} sm={6}>
                      <TextField
                        name="current_semester"
                        required
                        fullWidth
                        label="Current Semester"
                        onChange={onChange}
                        autoFocus
                      />
                    </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                        name="cgpa"
                        required
                        fullWidth
                        label={cgpa_label}
                        onChange={onChange}
                        autoFocus
                      />
                  </Grid>
                </>
                ) : (
                  <Grid item xs={12} >
                    <TextField
                      name="cgpa"
                      required
                      fullWidth
                      label={cgpa_label}
                      onChange={onChange}
                      autoFocus
                    />
                </Grid>
                )
              }
              </>
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
                      {button_label}
                    </Button>
                  )
                }
          </Box>
        </Box>
    </Container>
  )
}

export default SignUpAcademics