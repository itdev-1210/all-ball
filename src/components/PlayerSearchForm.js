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
  font-size: 16px;
  border: 1px solid #333;
  transition: all 0.5s;
  transform-origin: top left;
  transform: scale(0.8);
  width: 50%;
`;

const SearchButton = styled.button`
  background-color: #333;
  border: 0.1rem solid #333
  color: #fffaf0;
  font-size: 16px;
  margin-left: -4rem;
  padding: 2px;
  padding-right: 1rem;
  padding-left: 1rem;
  transition: all 0.5s;
  transform-origin: top left;
  transform: scale(0.8);

  :hover {
    cursor: pointer;
    background-color: #5a5a5a;
  }

  @media screen and (min-width: 600px) {
    margin-left:-7rem
  }

  @media screen and (min-width: 1300px) {
    margin-left:-9rem
  }
`;

function PlayerSearchForm(props) {
  const { handleSearch, isClicked, handleChange, input } = props;

  return (
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
  );
}

export default PlayerSearchForm;
