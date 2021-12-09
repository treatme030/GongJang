import React from 'react';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import google from '../../style/images/google.png'
import { useDispatch } from 'react-redux';
import { fetchSocialLogin } from '../../feature/userSlice';

const GoogleLoginBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6px;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
  `;

const clientId = `195265989228-sbukvdnc6d7fnskcodaehrbn5u2fiprt.apps.googleusercontent.com`;

export default function GoogleButton(){

  const dispatch = useDispatch();

  const onSuccess = async (response) => {
    console.log(response.code)
    await dispatch(fetchSocialLogin(response))
  }

  const onFailure = (error) => {
    console.log(error);
  }

  return(
    <GoogleLoginBlock>
        <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <img 
              src={google}
              alt="google"
              onClick={renderProps.onClick}
              aria-hidden="true"
              />
            )}
            responseType={"code"}
            onSuccess={onSuccess}
            onFailure={onFailure}/>
    </GoogleLoginBlock>
  )
}