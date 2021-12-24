import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import palette from '../../style/palette';

const WhiteButtonStyle = styled(Button)`
  background: #fff;
  color: ${palette.blue[2]};
  border: 1px solid ${palette.blue[2]};
  &:hover {
    background: ${palette.blue[1]};
  }
`;

const WhiteButton = (props) => {
  return (
    <WhiteButtonStyle {...props} />
  );
};

export default WhiteButton;