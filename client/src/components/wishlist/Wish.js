import React from 'react';
import styled from 'styled-components';
import Item from '../main/Item';
import NoWish from './NoWish';

const WishItemListBlock = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2.7rem;
  padding: 2rem 0;
  @media only screen and (max-width: 1240px){
    width: 100%;
  }
  @media only screen and (max-width: 768px){
    gap: 1rem;
  }
`;

const Wish = ({posts, user, setModal, modal}) => {

  const filteredWish = posts.filter((post) => post.wish === true);

  if(!filteredWish.length){
    return <NoWish />
  }

  return (
    <>
      <WishItemListBlock>
        {
          filteredWish.map((post) => 
            <Item
            post={post}
            user={user}
            key={post?.id}
            modal={modal}
            setModal={setModal}
            />
          )
        }
      </WishItemListBlock>
    </>
  );
};

export default Wish;