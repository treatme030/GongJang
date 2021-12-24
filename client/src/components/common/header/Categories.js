import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchGetAllPosts } from '../../../feature/postsSlice';
import palette from '../../../style/palette';

const CategoryList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  .category-menu {
    cursor: pointer;
    padding: 0.2rem 0.3rem;
    border-radius: 4px;
    transition: .3s;
    &:hover {
      color: #fff;
      background: ${palette.pink[1]};
    }
  }
  @media only screen and (max-width: 768px){
    gap: 0;
  }
`;

const Categories = ({ categories }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCategory = (category) => {
    history.push('/')
    if(category === '전체'){
      setTimeout(() => {dispatch(fetchGetAllPosts())}, 300)
    } else {
      setTimeout(() => {dispatch(fetchGetAllPosts({ category : category }))}, 300)
    }
  }

  return (
    <CategoryList>
      {
        categories.map((category, idx) => 
          <Link to={`/?category=${category}`} className="category-menu" key={idx} onClick={() => handleCategory(category, idx)} >{category}</Link>
        )
      }
    </CategoryList>
  );
};

export default Categories;