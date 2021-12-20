import React from 'react';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { fetchSocialLogin } from '../../feature/userSlice';
import { FcGoogle } from 'react-icons/fc';
import WhiteButton from '../common/WhiteButton';
import dotenv from 'dotenv';
dotenv.config();

const GoogleLoginBlock = styled.div`
  cursor: pointer;
`;

const GoogleBtn = styled(WhiteButton)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

export default function GoogleButton(){

  const dispatch = useDispatch();

  const onSuccess = async (response) => {
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
        <GoogleBtn
        onClick={renderProps.onClick}
        aria-hidden="true"
        >
          <FcGoogle/>
          <span>continue with google</span>
        </GoogleBtn>
      )}
      responseType={"code"}
      onSuccess={onSuccess}
      onFailure={onFailure}
      />
    </GoogleLoginBlock>
  )
}