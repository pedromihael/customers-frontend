import React, { useCallback, useContext, useRef, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { CostumersContext } from '../../../state/contexts/CostumersContext';
import { Container } from './styles';

interface Props {
  text: string;
  className?: string;
}

const Search: React.FC<Props> = ({ text, className }) => {
  const inputRef = useRef(null);
  const costumersContext = useContext(CostumersContext);

  const handleSearch = useCallback(
    e => {
      e.preventDefault();
      costumersContext.setSearched(e.target.value);
    },
    [costumersContext],
  );

  return (
    <Container className={className}>
      <form onChange={handleSearch} role="search">
        <fieldset>
          <MdSearch size="2rem" />
          <input
            ref={inputRef}
            id="search"
            type="search"
            placeholder={text}
            autoFocus
            required
          />
        </fieldset>
      </form>
    </Container>
  );
};

export default Search;
