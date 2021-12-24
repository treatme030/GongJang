import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import styled from 'styled-components';
import Wish from '../components/wishlist/Wish';
import { fetchGetAllPosts } from '../feature/postsSlice';
import palette from '../style/palette';

const WishListBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  .title {
    position: relative;
    text-align: center;
    padding: 2rem 0;
    &:after,
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      height: 2px;
      width: 50px;
      background: ${palette.blue[2]};
    }
    &:after {
      left: 35%;
    }
    &:before {
      right: 35%;
    }
  }
  @media only screen and (max-width: 1130px){
    width: 100%;
    margin: 0;
    padding: 0 2rem;
  }
  @media only screen and (max-width: 768px){
    padding: 0 1rem;
    .title {
      padding: 1rem 0;
    }
    .title:after {
      left: 27%;
    }
    .title:before {
      right: 27%;
    }
  }
  @media only screen and (max-width: 425px){
    .title:after,
    .title:before {
      display: none;
    }
  }
`;

const WishList = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { posts, user, wish } = useSelector(({ posts, user, wish }) => ({
    posts: posts.posts,
    user: user.user,
    wish: wish.wish
  }));

  useEffect(() => {
    const { search, category } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    })
    const form = {
      search: search,
      category: category
    }
    if(!user){
      dispatch(fetchGetAllPosts(form));
    } else {
      dispatch(fetchGetAllPosts(form));
    }
  },[dispatch, location.search, user]);
  
  return (
    <WishListBlock>
      <div className="title">
        <h2>Wish List</h2>
      </div>
      <Wish 
      posts={posts}
      user={user}
      wish={wish}
      modal={modal}
      setModal={setModal}
      />
    </WishListBlock>
  );
};

export default WishList;