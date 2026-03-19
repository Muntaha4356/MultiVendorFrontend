import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { server } from '../server';

const SellerActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState();
    useEffect(() => {
        if (activation_token) {
            const sendRequest = async () => {
                await axios
                    .post(`${server}/shop/activation`, {
                        activation_token,
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        setError(true);
                        console.log(err)
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
            alignItems: "center"
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

export default SellerActivationPage
