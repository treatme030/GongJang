import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import game from '../../style/images/game.jpg';
import CarouselImg from './CarouselImg';
import donate from '../../style/images/donate.png';
import chat from '../../style/images/chat.png';

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 45vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  .button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .prev {
    left: 0;
  }
  .next {
    right: 0;
  }
  @media only screen and (max-width: 425px){
    height: 30vh;
  }
`;

const CarouselBlock = styled.div`
  position: relative;
  min-width: 100%;
  height: 100%;
  transition: .5s;
  overflow: hidden;
  text-align: right;
  .carousel-text {
    width: 30%;
    font-size: 2rem;
    font-weight: 700;
    position: absolute;
    text-align: left;
    top: 50%;
    transform: translateY(-50%);
    left: 10%;
    z-index: 11;
    .carousel-text-third {
      font-weight: 800;
      color: #fa8072;
    }
    
    @media only screen and (max-width: 1024px){ 
      font-size: 1.8rem;
    }
    @media only screen and (max-width: 768px){
      font-size: 1.4rem;
    }
    @media only screen and (max-width: 425px){
        display: none;
    }
  }
  img {
    margin-right: 5%;
  }
  @media only screen and (max-width: 425px){
      display: flex;
      justify-content: center;
  }
`;



const Carousel = () => {
  const images = [ game, chat, donate ];
  const [index, setIndex] = useState(0); // 슬라이드 번호 부여 상태

  const onPrev = () => {
    setIndex(index + 100);
    index === 0 ? setIndex(-100 * (images.length - 1)) : setIndex(index + 100);
  };

  const onNext = () => {
    setIndex(index - 100);
    index === -100 * (images.length - 1) ? setIndex(0) : setIndex(index - 100);
  };
  const firstText = '중고 장난감';
  const firstText2 = '공유 플랫폼';
  const firstText3 = '공.장';
  const secondText = '비밀 댓글로'
  const secondText2 = '소통하는';
  const secondText3 = '공.장';
  const thirdText = '지구 환경을';
  const thirdText2 = '생각하는';
  const thirdText3 = '공.장';
  
  const carouselTexts = [
    [
      firstText,
      firstText2,
      firstText3 
    ],
    [ 
      secondText,
      secondText2,
      secondText3
    ],
    [
      thirdText, 
      thirdText2,
      thirdText3
    ]
    
  ]

  return (
    <>
      <CarouselWrapper>
        {
          images.map((image, idx) => 
            <CarouselBlock key={idx} style={{transform: `translateX(${index}%)`}}>
              <CarouselImg image={image} key={idx} text={carouselTexts[idx]} />
            </CarouselBlock>
          )
        }
        <button onClick={onPrev} className="button prev"><IoIosArrowBack className="icon" size="25px"/></button>
        <button onClick={onNext} className="button next"><IoIosArrowForward className="icon" size="25px" /></button>
      </CarouselWrapper>
    </>
  );
};

export default Carousel;