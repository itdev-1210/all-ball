import React from "react";

import styled, { keyframes } from "styled-components";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3.4rem;

  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
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
  background-image: -webkit-gradient(
    linear,
    left center,
    right center,
    from(#f6f7f8),
    color-stop(0.2, #edeef1),
    color-stop(0.4, #cecece),
    to(#cecece)
  );
  background-image: -webkit-linear-gradient(
    left,
    #f6f7f8 0%,
    #edeef1 20%,
    #cecece 40%,
    #f6f7f8 100%
  );
  border-radius: 1.5rem;
  padding: 11rem 11rem;
  margin: 0.5rem;
  width: 2rem;

  @media screen and (min-width: 600px) {
    padding: 9.3rem 6rem;
  }

  @media screen and (min-width: 700px) {
    padding: 9.3rem 7rem;
  }

  @media screen and (min-width: 800px) {
    padding: 9.3rem 8rem;
  }

  @media screen and (min-width: 1024px) {
    padding: 9.3rem 10.2rem;
  }

  @media screen and (min-width: 1200px) {
    padding: 9.3rem 12.5rem;
  }

  @media screen and (min-width: 1400px) {
    padding: 9.3rem 13.2rem;
  }

  @media screen and (min-width: 1500px) {
    padding: 9.3rem 12.5rem;
    margin: 0rem 2rem;
  }

  @media screen and (min-width: 1900px) {
    padding: 9.3rem 14.5rem;
  }

  @media screen and (min-width: 2500px) {
    padding: 9.3rem 20.5rem;
  }
`;

const InnerWrapper = styled.div`
  align-self: center;
  display: flex;
  font-size: 1.1rem;
  font-weight: 700;
  justify-content: center;
  margin-top: 0rem;
`;

const Header = styled.h2`
  animation: ${fadeIn};
  animation-duration: 8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background: #eee;
  background-size: 980;
  background-image: -webkit-gradient(
    linear,
    left center,
    right center,
    from(#f6f7f8),
    color-stop(0.2, #edeef1),
    color-stop(0.4, #f6f7f8),
    to(#f6f7f8)
  );
  background-image: -webkit-linear-gradient(
    left,
    #f6f7f8 0%,
    #edeef1 20%,
    #cecece 40%,
    #f6f7f8 100%
  );
  margin: auto;
  margin-bottom: -1rem;
  margin-top: 0.7rem;
  padding: 0.7rem 13rem;
  width: 2rem;
`;

const PlayerCardSkeletonLoader = () => {
  return (
    <div>
      <Header />
      <OuterWrapper>
        <InnerWrapper>
          <AnimatedBackground />
        </InnerWrapper>
        <InnerWrapper>
          <AnimatedBackground />
        </InnerWrapper>
        <InnerWrapper>
          <AnimatedBackground />
        </InnerWrapper>
        <InnerWrapper>
          <AnimatedBackground />
        </InnerWrapper>
        <InnerWrapper>
          <AnimatedBackground />
        </InnerWrapper>
      </OuterWrapper>
    </div>
  );
};

export default PlayerCardSkeletonLoader;
