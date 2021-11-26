import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';

const ItemBlock = styled.li`
  max-width: 200px;
  width: 100%;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5),
    2px 2px 5px rgba(94, 104, 121, 0.3);
  .item-img {
    height: 150px;
    background: #ffdeb7;
    a {
      display: block;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const Item = () => {
  return (
    <ItemBlock>
      <div className="item-img">
        <Link>
          <img src="" alt="" />
        </Link>
      </div>
      <div className="item-info">
        <p>title</p>
        <RiHeartFill/>
      </div>
    </ItemBlock>
  );
};

export default Item;