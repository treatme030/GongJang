import React from 'react';
import styled from 'styled-components';
import palette from '../../style/palette';

const ButtonStyle = styled.button`
    border-radius: 4px;
    padding: 0.25rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background: ${palette.blue[2]};
    border: 1px solid ${palette.blue[2]};
    transition: .3s;
    cursor: pointer;
    &:hover {
        background: ${palette.blue[1]};
        color: ${palette.blue[2]};
        border: 1px solid ${palette.blue[2]};
    }
`;

const Button = (props) => {
    return (
        <ButtonStyle {...props} />
    );
};

export default Button;