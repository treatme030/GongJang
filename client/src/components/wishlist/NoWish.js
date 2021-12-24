import React from 'react';
import styled from 'styled-components';
import { BsFillEmojiNeutralFill } from 'react-icons/bs';

const NoResultBlock = styled.div`
  width: 100%;
  height: 70vh;
  position: relative;
  .no-result-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    svg {
      font-size: 9rem;
    }
    h3 {
      word-break: keep-all;
    }
  }
  @media only screen and (max-width: 768px){
    .no-result-box {
      gap: 1rem;
      svg {
        font-size: 7rem;
      }
    }
  }
`;

const NoWish = () => {

  return (
    <NoResultBlock>
      <div className="no-result-box">
        <BsFillEmojiNeutralFill/>
        <h3>위시리스트가 존재하지 않습니다.</h3>
      </div>
    </NoResultBlock>
  );
};

export default NoWish;