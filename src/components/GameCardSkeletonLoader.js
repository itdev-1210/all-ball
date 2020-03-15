import React from "react";

import styled, { keyframes } from "styled-components";

const OuterWrapper = styled.div`
  display: flex;
  justify-content: normal;
  margin-top: 3.4rem;
`;

const fadeIn = keyframes`
  0%{
        background-position: -490px 0
    }
    100%{
        background-position: 490px 0
    }
`;

const AnimatedBackground = styled.div`
  animation: ${fadeIn};
  animation-duration: 8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background: #eee;
  background-image: -webkit-gradient(linear, left center, right center, from(#f6f7f8), color-   stop(.2, #edeef1), color-stop(.4, #f6f7f8), to(#f6f7f8));
  background-image: -webkit-linear-gradient(left, #f6f7f8 0%, #edeef1 20%, #cecece 40%, #f6f7f8 100%);
  #f6f7f8 40%, #f6f7f8 100%);
  border-radius: 1.5rem;
  padding: 3.3rem 3.9rem;
  margin: 0.5rem;
  width: 2rem;
`;

const GameStatus = styled.p`
  animation: ${fadeIn};
  animation-duration: 8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background: #eee;
  background-size: 980;
  background-image: -webkit-gradient(linear, left center, right center, from(#f6f7f8), color-   stop(.2, #edeef1), color-stop(.4, #f6f7f8), to(#f6f7f8));
  background-image: -webkit-linear-gradient(left, #f6f7f8 0%, #edeef1 20%, #cecece 40%, #f6f7f8 100%);
  #f6f7f8 40%, #f6f7f8 100%);
  display: flex;
  justify-content: normal;
  margin: auto;
  margin-bottom: 1.1rem;
  padding: 0.7rem 3rem;
  width: 2rem;
`;

const InnerWrapper = styled.div`
  display: inline;
  font-size: 1.1rem;
  font-weight: 700;
  justify-content: normal;
  margin-top: 0rem;

  :nth-child(1) {
    margin-left: 5.5rem;
    padding-left: 5.5rem;
  }

  @media screen and (min-width: 360px) {
    :nth-child(1) {
      margin-left: 4.8rem;
      padding-left: 4.8rem;
    }

  @media screen and (min-width: 400px) {
    :nth-child(1) {
      margin-left: 1.5rem;
      padding-left: 1.5rem;
    }

  @media screen and (min-width: 600px) {
    :nth-child(1) {
      margin-left: 0rem;
      padding-left: 0rem;
    }
  }
`;

const Header = styled.h2`
animation: ${fadeIn};
animation-duration: 8s;
animation-fill-mode: forwards;
animation-iteration-count: infinite;
animation-timing-function: linear;
background: #eee;
background-size: 980;
background-image: -webkit-gradient(linear, left center, right center, from(#f6f7f8), color-   stop(.2, #edeef1), color-stop(.4, #f6f7f8), to(#f6f7f8));
background-image: -webkit-linear-gradient(left, #f6f7f8 0%, #edeef1 20%, #cecece 40%, #f6f7f8 100%);
#f6f7f8 40%, #f6f7f8 100%);
margin: auto;
margin-bottom: 1.1rem;
margin-top: 0.7rem;
padding: 0.7rem 13rem;
width: 2rem;
`;

const GameCardSkeletonLoader = () => {
  return (
    <div>
      <Header />
      <OuterWrapper>
        <InnerWrapper>
          <GameStatus />
          <AnimatedBackground />
        </InnerWrapper>
        <InnerWrapper>
          <GameStatus />
          <AnimatedBackground />
        </InnerWrapper>
        <InnerWrapper>
          <GameStatus />
          <AnimatedBackground />
        </InnerWrapper>
        <InnerWrapper>
          <GameStatus />
          <AnimatedBackground />
        </InnerWrapper>
        <InnerWrapper>
          <GameStatus />
          <AnimatedBackground />
        </InnerWrapper>
      </OuterWrapper>
    </div>
  );
};

export default GameCardSkeletonLoader;
