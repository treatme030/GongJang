import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/common/Button';
import WhiteButton from '../components/common/WhiteButton';
import { fetchSignUp, initialize } from '../feature/userSlice';
import palette from '../style/palette';

const AuthBackground = styled.div`
  height: 80vh;
  display:flex;
  justify-content: center;
  align-items: center;
`;

const AuthJoinBlock = styled.div`
  border-radius: 4px;
  padding: 2rem;
  max-width: 360px;
  width: 100%;
  background-color: #fff;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5),
    2px 2px 5px rgba(94, 104, 121, 0.3);
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  .btns {
    display: flex;
    gap: 1rem;
    margin: 0.5rem 0;
    a {
      flex: 1;
    }
  }
`;

const CancelButton = styled(WhiteButton)`
  width: 100%;
  padding: 0.5rem 0;
`;

const JoinButton = styled(Button)`
  flex: 1;
  padding: 0.5rem 0;
`;

const AuthJoinForm = styled.div`
  display: flex;
  flex-direction: column;
  .auth-input-box {
    input {
      font-size: 1.2rem;
      width: 100%;
      border-bottom: solid 1px ${palette.gray[0]};
      margin-bottom: 0.5rem;
      &::placeholder {
        color: ${palette.gray[0]};
      }
    }
  }
`;

const Message = styled.div`
 font-size: 0.7rem;
  text-align: left;
  color: ${palette.pink[1]};
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.7rem;
  text-align: left;
  color: ${palette.pink[1]};
`;

const Join = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSignUp, signUpError } = useSelector((state) => state.user);

  // 이름, 이메일, 비밀번호, 비밀번호 확인 
  const [joinInfo, setJoinInfo] = useState({ 
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // 오류메시지
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  // 닉네임 핸들링 함수
  const handleInputNickname = (e) => {
    setJoinInfo({ ...joinInfo, [e.target.name] : e.target.value });
    const testNickname = /[a-zA-Z0-9_-]{4,12}$/;
    if (!testNickname.test(e.target.value)) { 
      setNicknameMessage('영문 대소문자/숫자 4-12자 내로 입력해주세요');
    } else {
      setNicknameMessage('');
    }
  }; 

  const handleInputEmail = (e) => {
    setJoinInfo({...joinInfo, [e.target.name] : e.target.value});
    const { email } = joinInfo;
    const testEmail = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!testEmail.test(email)) {
      setEmailMessage('올바르지 않은 이메일 형식입니다');
    } else {
      setEmailMessage('');
    }
  };
  
  const handleInputPassword = (e) => {
    setJoinInfo({...joinInfo, [e.target.name] : e.target.value});
    const testPassword = /(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if(!testPassword.test(e.target.value)){
      setPasswordMessage('영문 대소문자/숫자/특수문자 포함 8-16자 이내여야 합니다');
    } else {
      setPasswordMessage('');
    }
  };

  const handleInputConfirmPassword = (e) => {
    setJoinInfo({...joinInfo, [e.target.name] : e.target.value});
    const { password } = joinInfo;
    if(e.target.value !== password ) {
      setConfirmPasswordMessage('비밀번호가 일치하지 않습니다')
    } else {
      setConfirmPasswordMessage('');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(nicknameMessage === "" && emailMessage === "" && passwordMessage === "" && confirmPasswordMessage === "") {
      dispatch(fetchSignUp(joinInfo));
    }
    setJoinInfo({
      nickname: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleSubmit(e);
    }
  }

  useEffect(() => {
    if(isSignUp){
      history.push('/login');
    } 
    if(signUpError) {
      setServerErrorMessage(signUpError);
    }
    return () => { //언마운트될 때 초기화
      dispatch(initialize());
    }
  },[dispatch, history, isSignUp, signUpError])

  return (
    <AuthBackground>
      <AuthJoinBlock>
        <h2 className="auth-title">
          Join
        </h2>
        <AuthJoinForm onKeyPress={onKeyPress}>
          <div className="auth-input-box">
            <input
              className="auth-input"
              autoComplete="off"
              name="nickname"
              type="text"
              placeholder="Nickname"
              value={joinInfo.nickname}
              onChange={handleInputNickname}
            />
          </div>
          <Message>{nicknameMessage}</Message>
          <div className="auth-input-box">
            <input
              className="auth-input"
              autoComplete="off"
              name="email"
              type="email"
              placeholder="Email"
              value={joinInfo.email}
              onChange={handleInputEmail}
            />
          </div>
          <Message>{emailMessage}</Message>
          <div className="auth-input-box">
            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="Password"
              value={joinInfo.password}
              onChange={handleInputPassword}
            />
          </div>
          <Message>{passwordMessage}</Message>
          <div className="auth-input-box">
            <input
              className="auth-input"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={joinInfo.confirmPassword}
              onChange={handleInputConfirmPassword}
            />
          </div>
          <Message>{confirmPasswordMessage}</Message>
          <ErrorMessage>{serverErrorMessage}</ErrorMessage>
        </AuthJoinForm>
        <div className="btns">
          <Link to="/login">
          <CancelButton>CANCEL</CancelButton>
          </Link>
          <JoinButton onClick={handleSubmit}>JOIN</JoinButton>
        </div>
      </AuthJoinBlock>
    </AuthBackground>
  );
};

export default Join;