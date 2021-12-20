import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector, useDispatch} from 'react-redux';
import UpdateProfile from '../components/mypage/UpdateProfile';
import AskModal from '../components/modal/AskModal';
import { fetchDeleteAccount, fetchLogOut } from '../feature/userSlice';
import MyPageProfileImg from '../components/mypage/MyPageProfileImg';
import MyPosts from '../components/mypage/MyPosts';
import NoMyPosts from '../components/mypage/NoMyPosts';
import { fetchGetMyPosts } from '../feature/postsSlice';

const MyPageBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  .profile-wrap {
    display: flex;
    justify-content: center;
    gap: 5rem;
    margin-top: 2rem;
  }
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid #575F95;
    .info {
      padding: 0.8rem;
      color: #fff;
      background: #575F95;
      border-radius: 20px 20px 0 0;
      p {
        font-size: 1.2rem;
      }
    }
    .btn-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin-left: 1rem;
      span {
        padding: 0.5rem 0.5rem 0;
        font-size: 1rem;
        color: #bcbdc4;
      }
      button {
        font-size: 1.2rem;
        font-weight: 600;
        color: #575F95;
        padding: 0.5rem 0.5rem 0;
        cursor: pointer;
        margin-bottom: 0.5rem;
        transition: .3s;
        &:hover {
          color: #f9796d;
        }
      }
    }
  }
  @media only screen and (max-width: 1130px){
    width: 100%;
    margin: 0;
    padding: 0 2rem;
    .profile-wrap {
      padding: 0;
    }
  }
  @media only screen and (max-width: 768px){
    padding: 0 1rem;
    .profile-wrap {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .wrap {
      margin-top: 1rem;
      .info {
        p {
          font-size: 1rem;
        }
      }
      .btn-box {
        span {
          font-size: 0.8rem;
          margin-bottom: 0;
        }
        button {
          font-size: 1rem;
        }
      }
    }
  }
`;

const MyPage = () => {

  const [ newNickname, setNewNickname ] = useState('');
  const [ previewProfileImage, setPreviewProfileImage ] = useState('');
  const [visible, setVisible] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  
  const { user, isEdited, userInfoError } = useSelector( state => state.user );
  const { myposts } = useSelector( state => state.posts)

  const handleDeleteButton = () => {
    setVisible(true)
  }

  const onCancel = () => {
    setVisible(false);
  }

  const onConfirm = () => {
    setVisible(false);
    dispatch(fetchDeleteAccount(user));
    dispatch(fetchLogOut());
    history.replace('/')
  }

  useEffect(() => {
    dispatch(fetchGetMyPosts());
  }, [dispatch])

  return (
    <>
      <MyPageBlock>
        <div className="profile-wrap">
          <MyPageProfileImg 
            user={user}
            isEdited={isEdited}
            userInfoError={userInfoError}
            previewProfileImage={previewProfileImage}
            setPreviewProfileImage={setPreviewProfileImage}
          />
          <UpdateProfile 
            user={user}
            isEdited={isEdited}
            userInfoError={userInfoError}
            newNickname={newNickname}
            setNewNickname={setNewNickname}
          />
        </div>
        <div className="wrap">
          <div className="info">
            <p>MY ITEM LIST</p>
          </div>
          <div className="btn-box">
            <span>계정을 삭제하시겠습니까?</span>
            <button onClick={handleDeleteButton}>DELETE ACCOUNT</button>
          </div>
        </div>
        {
          myposts.length ? 
          <MyPosts 
            myposts={myposts}
          /> :
          <NoMyPosts />
        }
      </MyPageBlock>
      { 
        visible && (
        <AskModal
        visible={visible}
        title='회원 계정 탈퇴'
        description='더이상 공.장을 이용하지 않으시겠습니까?'
        onConfirm={onConfirm}
        onCancel={onCancel}
        />
      )}
    </>
  );
};

export default MyPage;