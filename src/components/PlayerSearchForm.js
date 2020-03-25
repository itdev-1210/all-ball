import React from "react";

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
  font-size: 1.7rem;
  border: 1px solid #333;
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
  background-color: #333;
  border: 0.1rem solid #333;
  color: #fffaf0;
  font-size: 1.7rem;
  padding-right: 1rem;
  padding-left: 1rem;
  transition: background-color 0.5s;

  :hover {
    cursor: pointer;
    background-color: #5a5a5a;
  }

  @media (hover: none) {
    background-color: #333 !important;
    font-size: 16px;
    transition: all 0.5s;
    transform-origin: top left;
    transform: scale(0.8);
    margin-left: -5rem;
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
            placeholder="Search for players by name"
          ></Input>
          <SearchButton>Search</SearchButton>
        </Form>
      </FormContainer>
      <NoPlayerMessageContainer isClicked={isClicked}>
        {noPlayerMessage}
      </NoPlayerMessageContainer>
    </div>
  );
}

export default PlayerSearchForm;
