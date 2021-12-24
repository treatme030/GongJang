import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeState } from '../../feature/writeSlice';

const SalesStatusBlock = styled.div`
  position: relative;
  input {
    position: absolute;
    top: 50%;
    right: -70%;
    transform: translateY(-50%);
  }
  @media only screen and (max-width: 620px){
    margin-bottom: 1rem;
  }
`;

const SalesStatus = ({ soldOut }) => {
  const dispatch = useDispatch();

  const onCangeCheck = (e) => {
    dispatch(changeState(e.target.checked));
  }
  
  return (
    <SalesStatusBlock>
      <label htmlFor="status">
      <input 
      type="checkbox"
      id="status" 
      name="status"
      checked={soldOut}
      onChange={onCangeCheck}
      />
      나눔상태</label>
    </SalesStatusBlock>
  );
};

export default SalesStatus;