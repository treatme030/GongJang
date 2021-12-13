import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchGetPostsByCategory } from '../../../feature/postsSlice';

const CategoryList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  .category-menu {
    cursor: pointer;
    padding: 2px 8px;
    &:hover {
      color: white;
      font-weight: 600;
      background: #ffdeb7;
      border-radius: 5px;
    }
  }
`

const Categories = ({ categories }) => {

  const dispatch = useDispatch();

  const handleCategory = (category) => {
    dispatch(fetchGetPostsByCategory(category));
  }

  return (
    <CategoryList>
      {
        categories.map((category, idx) => 
          <li className="category-menu" key={idx} onClick={() => handleCategory(category)} >{category}</li>
        )
      }
    </CategoryList>
  );
};

export default Categories;