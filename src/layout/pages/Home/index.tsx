import React, { useContext, useEffect, useState } from 'react';
import { Header, Costumers, Footer } from '../../partials';
import { Greeting } from '../../../modules/components';
import { CostumersContext } from '../../../state/contexts/CostumersContext';
import { Container } from './styles';

interface Props {
  handleThemeSwitching(): void;
}

const Home: React.FC<Props> = ({ handleThemeSwitching }) => {
  const { searchedCostumer } = useContext(CostumersContext);

  return (
    <Container>
      <Header text="Costumers" toggleTheme={handleThemeSwitching} />
      <Greeting text={'This is all you costumers'} />
      <Costumers searched={searchedCostumer} />
      <Footer />
    </Container>
  );
};

export default Home;
