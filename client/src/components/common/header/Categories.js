import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
  return (
    <CategoryList>
      {
        categories.map((category, idx) => 
          <Link 
          to={category === '전체' ? '/' : `/?category=${category}`} 
          className="category-menu" 
          key={idx} 
          >{category}</Link>
        )
      }
    </CategoryList>
  );
};

export default Categories;