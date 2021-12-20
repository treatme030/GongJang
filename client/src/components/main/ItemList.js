import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const ItemListBlock = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2.7rem;
  padding: 2rem 0 4rem;
  @media only screen and (max-width: 1240px){
    width: 100%;
  }
  @media only screen and (max-width: 768px){
    gap: 1rem;
  }
`;

const ItemList = ({ posts, user, modal, setModal }) => {
  
  return (
    <ItemListBlock>
      { posts.map((post) => (
        <Item 
        key={post?.id} 
        post={post} 
        user={user}
        modal={modal}
        setModal={setModal}
        />
      ))}
    </ItemListBlock>
  );
};

export default ItemList;