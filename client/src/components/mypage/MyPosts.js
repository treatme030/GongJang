import React from 'react';
import styled from 'styled-components';
import MyPost from './MyPost';

const MyPostsBlock = styled.ul`
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

const MyPosts = ({ myposts }) => {

  return (
    <MyPostsBlock>
      {
        myposts.map((post, idx) => 
          <MyPost 
          post={post}
          key={post?.id}
          />
        )
      }
    </MyPostsBlock>
  );
};

export default MyPosts;