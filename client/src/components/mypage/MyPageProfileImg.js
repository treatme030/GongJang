import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeProfileImage, fetchUpdateProfileImage } from '../../feature/userSlice';
import AskModal from '../modal/AskModal';

const MyPageProfileImgBlock = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 200px;
    height: 200px;
    border-radius: 100px;
  }
  label {
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    cursor: pointer;
    transition: .3s;
    &:hover {
      color: #fa8072;
    }
  }
  @media only screen and (max-width: 425px){
    align-items: center;
    margin-bottom: 1rem;
    img {
      width: 150px;
      height: 150px;
    }
  }
`;

const MyPageProfileImg = ({previewProfileImage, setPreviewProfileImage}) => {
  const [visible, setVisible] = useState(false);
  const [ profile_image, setProfile_image] = useState(null);
  const { user } = useSelector( state => state.user )

  const dispatch = useDispatch();

  const onFileChange = (e) => {
    let file = e.target.files[0];
    if(file.length < 1 ){
      return;
    }
    setProfile_image(file);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setPreviewProfileImage(result);
      dispatch(changeProfileImage(result));
    }
    if(file){
      reader.readAsDataURL(file);
    }
  }
  
  useEffect(() => {
    if(previewProfileImage){
      setVisible(true);
    }
  }, [previewProfileImage])
  
  const onCancel = () => {
    setVisible(false);
    setPreviewProfileImage(null);
  }

  const onConfirm = () => {
    setVisible(false);
    const formData = new FormData();
    formData.append('profile_image', profile_image);
    dispatch(fetchUpdateProfileImage(formData));
  }

  return (
    <>
      <MyPageProfileImgBlock>
        <div className="img-box">
          <img 
            src={
              !previewProfileImage ?
              `data:image/*;base64,${user.profile_image}` :
              previewProfileImage
            } 
            alt="profile"
            style={{ backgroundImage : profile_image }}  
          />
        </div>  
        <div className="input-box">
          <label htmlFor="file">
            사진 업데이트하기
          </label>
          <input 
            type="file"
            accept="image/png, image/jpg"
            id="file"
            name="file"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />
        </div>
      </MyPageProfileImgBlock>
      { visible && (
        <AskModal
        visible={visible}
        title='회원 정보 변경'
        description='입력하신 내용으로 변경하시겠습니까?'
        onConfirm={onConfirm}
        onCancel={onCancel}
        />
      )}
    </>
  );
};

export default MyPageProfileImg;