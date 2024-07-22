import React from 'react';
import styled from 'styled-components';

interface InputProps {
  search: {
    value: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  };
  refetch: () => void;
}

const Search = ({ search, refetch }: InputProps) => {
  return (
    <Form>
      <input
        type='search'
        {...search}
        placeholder='포켓몬 번호를 적어주세요.'
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <img src='/images/pakemonBall.jpeg' alt='PakemonBall' />
      </button>
    </Form>
  );
};

const Form = styled.form`
  width: 300px;
  margin: 10px auto 0px auto;
  border: 1px solid #dcdcdc;
  display: flex;
  border-radius: 4px;
  input {
    border-width: 0;
    width: 85%;
    font-size: 20px;
    padding: 0 10px;
  }
  input:focus {
    border: none;
    outline: none;
  }
  button {
    width: 60px;
    height: 50px;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default Search;
