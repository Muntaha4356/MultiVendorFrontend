import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { server } from '../server';
import Store from '../redux/store';
import { setUserToken } from '../utils/axiosConfig';
const ActivationPage = () => {
    const {activation_token} = useParams();
    const [error, setError] = useState();
    useEffect(()=>{
        if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          }, { withCredentials: true })
          .then((res) => {
            if (res.data.user) {
              setUserToken(res.data.token);
              Store.dispatch({
                type: "LoadUserSuccess",
                payload: res.data.user,
              });
            }
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
    }, [activation_token])
  return (
    <div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems:"center"
    }}>
      {
        error ? 
            <p>Your token is expired</p>
         : 
            <p>Your account has been created successfully</p>
        
      }
    </div>
  )
}

export default ActivationPage
