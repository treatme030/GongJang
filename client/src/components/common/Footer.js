import React from 'react';
import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';
import palette from '../../style/palette';

const FooterBlock = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .about {
    font-size: 1.6rem;
    font-weight: 600;
  }
  .contributers {
    display: flex;
    padding: 1.7rem 0;
    li {
      text-align: center;
      padding: 0.5rem;
      margin-right: 0.5rem;
      p {
        color: ${palette.gray[1]};
        margin: 0.3rem 0;
      }
      a {
        font-size: 1.5rem;
        color: ${palette.blue[2]};
        transition: .3s;
        &:hover {
          color: ${palette.gray[1]};
        }
      }
    }
  }
  @media only screen and (max-width: 768px){
    flex-direction: column;   
    gap: 0;
    .contributers {
      padding: 0.5rem 0;
      li {
        margin-right: 0;
        h4 {
          font-size: 1rem;
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterBlock>
      <div className="about">
        <p>About Us</p>
      </div>
      <ul className="contributers">
        <li>
          <h4>정지우</h4>
          <p>Frontend</p>
          <a href="https://github.com/djdu4496">
            <AiFillGithub/>
          </a>
        </li>
        <li>
          <h4>김주희</h4>
          <p>Frontend</p>
          <a href="https://github.com/treatme030">
            <AiFillGithub/>
          </a>
        </li>
        <li>
          <h4>양진영</h4>
          <p>Backend</p>
          <a href="https://github.com/yjy1412">
            <AiFillGithub/>
          </a>
        </li>
        <li>
          <h4>한수현</h4>
          <p>Backend</p>
          <a href="https://github.com/Gwangandong">
          <AiFillGithub/>
          </a>
        </li>
      </ul>
    </FooterBlock>
  );
};

export default Footer;