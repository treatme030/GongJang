import React from 'react';
import styled from 'styled-components';
import { BsFillEmojiNeutralFill } from 'react-icons/bs';

const NoResultBlock = styled.div`
  height: 80vh;
  position: relative;
  .no-result-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 200px;
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .no-result-icon { 
    font-size: 150px;
  }
  .no-result-message {
    margin-top: 30px;
    font-size: 25px;
    width: 100%;
    display: flex;
    justify-content: center;
    span {
      text-align: center;
    }
  }
`;

const NoResult = () => {

  return (
    <NoResultBlock>
      <div className="no-result-box">
        <BsFillEmojiNeutralFill className="no-result-icon"/>
        <div className="no-result-message ">
          <span>해당 게시글이 존재하지 않습니다.</span>
        </div>
      </div>
    </NoResultBlock>
  );
};

export default NoResult;