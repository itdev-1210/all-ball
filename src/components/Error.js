import React from "react";

import styled from "styled-components";

const HeaderContainer = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
`;

const Header = styled.h1`
  color: #333;
  font-size: 2.5rem;
  text-align: center;
  white-space: nowrap;
`;

const SubHeader = styled.h2`
  color: #6b6a6a;
  font-size: 2rem;
  text-align: center;
  white-space: nowrap;
`;

function Error() {
  return (
    <HeaderContainer>
      <Header>OOPS! Something went wrong.</Header>
      <SubHeader>Please try again in a few minutes.</SubHeader>
    </HeaderContainer>
  );
}

export default Error;
