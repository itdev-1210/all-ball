import React from "react";
import magnifyingGlass from "../assets/magnifyingGlass.png";

import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  transform: ${props =>
    props.isClicked ? "translateY(0rem)" : "translateY(12rem)"};
  transition: transform 0.5s;
  width: 75%;
`;

const Input = styled.input`
  border: 0.1rem solid #333;
  border-radius: 2rem 0rem 0rem 2rem;
  border-right: none;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  font-size: 1.7rem;
  padding: 1.5rem 0rem 1.5rem 1.5rem;
  width: 90%;

  @media screen and (min-width: 600px) {
    width: 50%;
  }

  @media screen and (min-width: 1500px) {
    width: 30%;
  }

  @media (hover: none) {
    font-size: 16px;
    transition: all 0.5s;
    transition: all 0.5s;
    transform-origin: top left;
    transform: scale(0.8);
  }
`;

const SearchButton = styled.button`
  background: #333;
  border: 0.1rem solid #333;
  border-left: none;
  border-radius: 0rem 2rem 2rem 0rem;
  box-shadow: 7px -1px 15px rgba(0, 0, 0, 0.2);
  color: #fffaf0;
  font-size: 1.7rem;
  padding-right: 1rem;
  padding-left: 1rem;
  transition: background-color 0.5s;

  :hover {
    background-color: #f5cc30;
    cursor: pointer;
  }

  @media (hover: none) {
    font-size: 16px;
    margin-left: -8rem;
    transition: all 0.5s;
    transform-origin: top left;
    transform: scale(0.8);

    @media screen and (min-width: 430px) {
      margin-left: -10rem;
    }

    @media screen and (min-width: 532px) {
      margin-left: -12rem;
    }

    @media screen and (min-width: 600px) {
      margin-left: -8rem;
    }

    @media screen and (min-width: 752px) {
      margin-left: -9rem;
    }

    @media screen and (min-width: 980px) {
      margin-left: -11rem;
    }
  }
`;

const NoPlayerMessageContainer = styled.div`
  color: #333;
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  justify-content: center;
  transform: ${props =>
    props.isClicked ? "translateY(3rem)" : "translateY(15rem)"};
`;

const MagnifyingGlassIcon = styled.img`
  filter: invert(100%) sepia(0%) saturate(3167%) hue-rotate(130deg)
    brightness(200%) contrast(100%);
  vertical-align: middle;
  width: 2.5rem;
`;

function PlayerSearchForm(props) {
  const {
    handleSearch,
    isClicked,
    handleChange,
    input,
    noPlayerMessage
  } = props;

  return (
    <div>
      <FormContainer>
        <Form onSubmit={handleSearch} isClicked={isClicked}>
          <Input
            type="text"
            name="input"
            value={input}
            onChange={handleChange}
            maxLength="25"
            placeholder="search for players by name"
          ></Input>
          <SearchButton>
            <MagnifyingGlassIcon src={magnifyingGlass}></MagnifyingGlassIcon>
          </SearchButton>
        </Form>
      </FormContainer>
      <NoPlayerMessageContainer isClicked={isClicked}>
        {noPlayerMessage}
      </NoPlayerMessageContainer>
    </div>
  );
}

export default PlayerSearchForm;
