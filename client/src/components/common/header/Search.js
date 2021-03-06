import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Categories from './Categories';
import { fetchGetAllPosts } from '../../../feature/postsSlice';
import { useHistory } from 'react-router-dom';
import palette from '../../../style/palette';

const SearchBlock = styled.div`
  .wrap {
    position: relative;
    width:70%;
    margin: 0 auto;
    padding: 2rem 0;
    .search-container {
      width: 50%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .search-box {
        width: 100%;
        padding: 0.5rem 0;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          font-size: 1.3rem;
          border-bottom: 1px solid ${palette.blue[2]};
          padding-bottom: 0.2rem;
          &::placeholder {
            color: ${palette.blue[3]};
          }
        }
        .search-icon {
          font-size: 1.5rem;
          padding: 0.5rem;
          cursor: pointer;
        }
      }
      .category-box {
        display: flex;
        align-items: center;
        width: 100%;
        .category-title {
          font-weight: 600;
          margin-right: 3rem;
          white-space: nowrap;
        }
      }
    }
    .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      padding: 2rem;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 1024px){
    .wrap {
      width: 80%;
      padding: 1.5rem;
      .search-container {
        width: 100%;
        .search-box {
          input {
            font-size: 1rem;
          }
          .search-icon {
            font-size: 1rem;
          }
        }
      }
      .close-icon {
        padding: 0.5rem 1rem;
        font-size: 1rem;
      }
    }
  }
  @media only screen and (max-width: 768px){
    .wrap {
      width: 100%;
      .search-container {
        .category-box {
          .category-title {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
`;

const Search = ({ onClick }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const categories = ['??????', '?????????', '??????', '????????????', '??????', '??????'];

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      history.push(`/?search=${search}`);
      dispatch(fetchGetAllPosts({ search: search }));
    }
    setSearch('');
  }

  return (
    <SearchBlock>
      <div className="wrap">
        <div className="search-container">
          <div className="search-box">
            <input 
            type="text"
            placeholder="?????? ???????????? ???????????????." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={onKeyPress}
            />
            <div className="search-icon">
              <FiSearch/>
            </div>
          </div>
          <div className="category-box">
            <span className="category-title" >????????????</span>
            <Categories categories={categories}/>
          </div>
        </div>
        <div className="close-icon" onClick={onClick}>
          <FaTimes/>
        </div>
      </div>
    </SearchBlock>
  );
};

export default Search;