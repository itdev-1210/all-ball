import React, { Component } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeLink = styled.li`
  margin-top: 2.5rem;
  font-size: 1.4rem;
  padding: 0px;
  transition: all 0.2s;

  :hover {
    font-size: 1.7rem;
    cursor: pointer;
  }

  :after {
    display: block;
    content: "";
    border-bottom: solid 0.3rem #333;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }

  :hover::after {
    transform: scaleX(1);
  }
`;

const NavBarList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  margin: 2.5rem auto 6rem;
  width: 85%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  :visited {
    color: #333;
    decoration: none;
    text-decoration: none;
  }
`;

const LogoLink = styled.li`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 5rem;
  font-weight: 900;
  -webkit-text-stroke: 0.1rem #333;
  -webkit-text-stroke-width: 0.2rem;
`;

const SearchLink = styled(HomeLink)``;

class NavBar extends Component {
  render() {
    return (
      <nav>
        <NavBarList>
          <StyledLink to="/">
            <HomeLink>home</HomeLink>
          </StyledLink>
          <StyledLink to="/">
            <LogoLink>all ball</LogoLink>
          </StyledLink>
          <StyledLink to="/playersearch">
            <SearchLink>player search</SearchLink>
          </StyledLink>
        </NavBarList>
      </nav>
    );
  }
}

export default NavBar;
