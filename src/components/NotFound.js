import React from "react";

import styled from "styled-components";

const Header = styled.h1`
  color: #333;
  text-align: center;
  white-space: nowrap;
`;

const HeaderContainer = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
`;

function NotFound() {
  return (
    <HeaderContainer>
      <Header>The requested URL could not be found</Header>
    </HeaderContainer>
  );
}

export default NotFound;
