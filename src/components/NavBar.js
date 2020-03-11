import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HomeLink = styled.li`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2.5rem;
  padding: 0px;
  transition: all 0.2s;

  :hover {
    font-size: 1.8rem;
  }

  :after {
    display: block;
    border-bottom: solid 0.3rem #333;
    content: "";
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }

  :hover::after {
    transform: scaleX(1);
  }
`;

const NavBarList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 2.5rem auto 4rem;
`;

const NavLogoLinkToHome = styled(NavLink)`
  color: #333;
  text-decoration: none;

  :visited {
    color: #333;
    decoration: none;
    text-decoration: none;
  }
`;

const NavLinkToHome = styled(NavLink)`
  color: #333;
  text-decoration: none;

  :visited {
    color: #333;
    decoration: none;
    text-decoration: none;
  }

  &.active {
    direction: ltr;
    list-style: disc;
  }
`;

const NavLinkToPlayerSearch = styled(NavLinkToHome)`
  &.active {
    direction: rtl;
  }
`;

const LogoLink = styled.li`
  font-size: 5rem;
  font-weight: 900;
  margin: auto 5rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 0.1rem #333;
  -webkit-text-stroke-width: 0.2rem;
`;

const SearchLink = styled(HomeLink)``;

class NavBar extends Component {
  render() {
    return (
      <nav>
        <NavBarList>
          <NavLinkToHome to="/" exact>
            <HomeLink>home</HomeLink>
          </NavLinkToHome>
          <NavLogoLinkToHome to="/" exact>
            <LogoLink>all ball</LogoLink>
          </NavLogoLinkToHome>
          <NavLinkToPlayerSearch to="/playersearch" exact>
            <SearchLink>player search</SearchLink>
          </NavLinkToPlayerSearch>
        </NavBarList>
      </nav>
    );
  }
}

export default NavBar;
