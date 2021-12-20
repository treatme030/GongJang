import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/common/Button';
import WhiteButton from '../components/common/WhiteButton';
import { fetchLogin, initialize } from '../feature/userSlice';
import GoogleButton from '../components/login/GoogleButton';

const AuthBackground = styled.div`
  height: 80vh;
  display:flex;
  justify-content: center;
  align-items: center;
`

const AuthLoginBlock = styled.div`
  border-radius: 4px;
  padding: 1.5rem;
  max-width: 320px;
  width: 100%;
  background-color: white;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5),
    2px 2px 5px rgba(94, 104, 121, 0.3);
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  .join-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;
    margin-top: 1rem;
    gap: 0.5rem;
    span {
      font-size: 0.8rem;
      &:last-child {
        text-decoration: underline;
        transition: .3s;
        &:hover {
          color:  #f9796d;
        }
      }
    }
  }
`;

const AuthLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  .auth-input-box {
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
  input {
    font-size: 1.2rem;
    width: 100%;
    border-bottom: solid 1px #bcbdc4;
    margin-bottom: 0.5rem;
    &::placeholder {
      color:  #bcbdc4;
    }
  }
`;

const Message = styled.div`
  font-size: 0.7rem;
  text-align: left;
  color: #fa8072;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.7rem;
  text-align: left;
  color: #fa8072;
`;

const LoginButton = styled(Button)`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
`;

const Login = () => {
  
  // 로그인 입력 정보
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  // 오류메시지
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const { accessToken, loginError } = useSelector((state) => state.user);

  const handleInputEmail = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name] : e.target.value});
    const { email } = loginInfo;
    const testEmail = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!testEmail.test(email)) {
      setEmailMessage('올바르지 않은 이메일 형식입니다');
    } else {
      setEmailMessage('');
    }
  };

  const handleInputPassword = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name] : e.target.value});
    const testPassword = /(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if(!testPassword.test(e.target.value)){
      setPasswordMessage('영문 대소문자/숫자/특수문자 포함 8-16자 이내여야 합니다');
    } else {
      setPasswordMessage('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(emailMessage === "" && passwordMessage === "") {
      dispatch(fetchLogin(loginInfo));
    }
    setLoginInfo({
      email: '',
      password: '',
    })
  };

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleSubmit(e);
    }
  }

  useEffect(() => {
    if(accessToken){
      history.push('/');
    }
    if(loginError){
      setServerErrorMessage(loginError);
    }
    return () => { //언마운트될 때 초기화
      dispatch(initialize());
    }
  },[dispatch, history, accessToken, loginError])

  return (
    <AuthBackground>
      <AuthLoginBlock>
        <h2>Login</h2>
        <AuthLoginForm onKeyPress={onKeyPress}>
          <div className="auth-input-box">
            <input
              className="auth-input"
              autoComplete="off"
              name="email"
              type="email"
              placeholder="Email"
              value={loginInfo.email}
              onChange={handleInputEmail}
            />
          </div>
          <Message email>{emailMessage}</Message>
          <div className="auth-input-box">
            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={handleInputPassword}
            />
          </div>
          <Message>{passwordMessage}</Message>
          <ErrorMessage>{serverErrorMessage}</ErrorMessage>
        </AuthLoginForm>
        <LoginButton onClick={handleSubmit}>LOGIN</LoginButton>
        <GoogleButton />
        <Link to="/join" className="join-btn">
          <span>아직 회원이 아니신가요? </span>
          <span><b>JOIN</b></span>
        </Link>
      </AuthLoginBlock>
    </AuthBackground>
  );
};

export default Login;