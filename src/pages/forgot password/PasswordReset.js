import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useParams, useNavigate } from 'react-router-dom'
import { axiosHandler } from '../../utils/helper'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { PASSWORD_RESET_COMPELETE_URL, PASSWORD_RESET_URL } from '../../utils/urls'


const PasswordReset = () => {
    const {uidb64, token} = useParams()
    const [status, setStatus] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const navigate = useNavigate()
    const [response, setResponse] = useState({})

    const verifyToken = async () => {
        setVerifying(true)
        const res = await axiosHandler({
            method: "post",
            url: PASSWORD_RESET_URL + '/' + uidb64 + '/' + token,
        }).catch(err => console.log(err))
        setVerifying(false)
        
        if(res){
            setResponse({
                'uidb64': res?.data?.data?.uidb64,
                'token' : res?.data?.data?.token
            })
            console.log(res)
            console.log(response)
        }
    }
    
    useEffect(() => {
        verifyToken()
    },[])

    const onChange = ((e) => {
        setResponse({
            ...response,
            'password': e.target.value
        })
    })

    const handleReset = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const res = await axiosHandler({
            method: 'patch',
            url: PASSWORD_RESET_COMPELETE_URL,
            data: response
        }).catch(e => console.log(e))
        setIsLoading(false)

        if(res){
            navigate('/login')
        }
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
        (!verifying)? (
          <Box component="form" Validate onSubmit={(e) => handleReset(e)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Enter you new Password"
              type="password"
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
           please wait, we are verifying your request
          </div>
        )
      }
      </Box>
    </Container>
  )
}

export default PasswordReset