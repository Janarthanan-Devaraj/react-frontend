import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { axiosHandler } from '../../utils/helper';
import { REQUEST_EMAIL_RESET_URL } from '../../utils/urls';

const RequestEmailReset = () => {
  const [resetMail, setResetMail] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleReset = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const res = await axiosHandler({
      method:'post',
      url: REQUEST_EMAIL_RESET_URL,
      data: resetMail,
    }).catch(e => console.log(e))
    setIsLoading(false)
    console.log(res.data)
    if(res){
      setSuccess(true)
    }
  }


  const onChange = (e) => {
    setResetMail({
      ...resetMail,
      [e.target.name] : e.target.value
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box 
        sx={{
          marginTop: 20, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center'
        }}
      >
      <Typography component="h1" variant="h5">
        Reset password
      </Typography>
      {
        (!success)? (
          <Box component="form" Validate onSubmit={(e) => handleReset(e)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email Address"
              name="email"
              onChange={onChange}
            />
          </Grid>
          {
            (isLoading)? (
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
               Submit
              </Button>
            )
          }
        </Grid>
      </Box>
        ) : (
          <div>
            We have sent a reset link to your email..
          </div>
        )
      }
      </Box>
    </Container>
  )
}

export default RequestEmailReset