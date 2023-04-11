import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosHandler } from '../../utils/helper'
import { EMAIL_VERIFY_URL } from '../../utils/urls'

const EmailVerify = () => {
    const {token} = useParams()
    const [status, setStatus] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const verifyEmail = async () => {
        setLoading(true)
        const result = await axiosHandler({
            method: "post",
            url: EMAIL_VERIFY_URL + '?token=' + token,
        }).catch(e => {
            setLoading(false)
            setStatus('error')
        })

        if(result){
            setStatus('success')
            setLoading(false)
            setTimeout(() => {
                navigate('/signup/user-profile')
            }, 5000);
        }
    }

    useEffect(() => {
        verifyEmail()
    },[])

  return (
    <div>
        {
            (loading ? (
                <div>
                    loading....
                </div>
            ) : (
                <div>
                    EmailVerification {status}
                </div>
            ))
        }
    </div>
  )
}

export default EmailVerify