import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const WhiteButtonStyle = styled(Button)`
  background: #fff;
  color: #575f95;
  border: 1px solid #575f95;
  &:hover {
    background: #c7cbea;
  }
`;

const WhiteButton = (props) => {
  return (
    <WhiteButtonStyle {...props} />
  );
};

export default WhiteButton;