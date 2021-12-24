import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { changeNickname, fetchUpdateUserInfo, initialize } from '../../feature/userSlice';
import AskModal from '../modal/AskModal';
import palette from '../../style/palette';

const UpdateProfileBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (max-width: 768px){
    margin-left: 0;
    h1 {
      font-size: 1.4rem;
      text-align: center;
      margin-bottom: 1rem;
      span {
        font-size: inherit;
      }
    }
  }
`;

const UpdateProfileForm = styled.div`
  .update-nickname {
    position: relative;
    margin-bottom: 2rem;
    input {
      height: 40px;
      border-bottom: solid 1px ${palette.gray[0]};
      font-size: 1.4rem;
      &::placeholder {
        color: ${palette.gray[0]};
      }
    }
    span {
      cursor: pointer;
      transition: .3s;
      &:hover {
        color: ${palette.pink[1]};
      }
    }
  }
  .update-password {
    width: 100%;
    display: flex;
    align-items: center;
    p {
      flex: 1;
      height: 40px;
      border-bottom: solid 1px ${palette.gray[0]};
      font-size: 1.4rem;
    }
    a {
      transition: .3s;
      &:hover {
        color: ${palette.pink[1]};
      }
    }
  }
  @media only screen and (max-width: 768px){
    .update-nickname {
      margin-bottom: 0.5rem;
      input {
        height: 30px;
        font-size: 1rem;
      }
    }
    .update-password {
      p {
        height: 30px;
        font-size: 1rem;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: end;
  right: 297px;
  font-size: 13px;
  color: ${palette.pink[1]};
`;

const UpdateProfile = ({ user, userInfoError, isEdited, setNewNickname, newNickname }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const handleNewNickname = (e) => {
    setNewNickname(e.target.value);
  }
  
  const handleEditButton = () => {
    if(newNickname) {
      setVisible(true)
    }
  }

  const onCancel = () => {
    setVisible(false);
  }

  const onConfirm = () => {
    setVisible(false);
    dispatch(fetchUpdateUserInfo(newNickname));
    dispatch(changeNickname(newNickname));
    setNewNickname('');
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      if(newNickname) {
        setVisible(true)
      }
    }
  }
  useEffect(() => {
    if(isEdited){
      history.push('/mypage');
      setServerErrorMessage("");
    }
    if(userInfoError){
      setServerErrorMessage(userInfoError);
    }
    return () => {
      dispatch(initialize());
    }
  },[dispatch, history, isEdited, userInfoError])

  return (
    <>
      <UpdateProfileBlock>
        <h1><span>{user ? user.nickname : ""}</span>님, 안녕하세요.</h1>
        <UpdateProfileForm onKeyPress={onKeyPress}>
          <div className="update-nickname">
            <input 
              type="text" 
              name="newNickname"
              placeholder="닉네임을 수정하세요."
              value={newNickname}
              onChange={handleNewNickname}
            />
            <span onClick={handleEditButton}>EDIT</span>
            <ErrorMessage>{serverErrorMessage}</ErrorMessage>
          </div>
          <div className="update-password">
            <p>PASSWORD</p>
            <Link to="/updatePassword">EDIT</Link>
          </div>
        </UpdateProfileForm>
      </UpdateProfileBlock>
      {
        visible && ( 
          <AskModal
          visible={visible}
          title='회원 정보 변경'
          description='입력하신 내용으로 변경하시겠습니까?'
          onConfirm={onConfirm}
          onCancel={onCancel}
          />
        )
      }
    </>
  );
};

export default UpdateProfile;