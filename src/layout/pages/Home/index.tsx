import React, { useContext, useEffect, useState } from 'react';
import { Header, Costumers, Footer } from '../../partials';
import { Greeting } from '../../../modules/components';
import { Costumer } from '../../../modules/types/Costumer';
import { CostumersContext } from '../../../state/contexts/CostumersContext';
import { Container } from './styles';

interface Props {
  handleThemeSwitching(): void;
}

const Home: React.FC<Props> = ({ handleThemeSwitching }) => {
  const { getCostumersByName, searchedCostumer } = useContext(CostumersContext);
  const [costumer, setCostumer] = useState({} as Costumer);

  useEffect(() => {
    const found: Costumer = getCostumersByName('Dotson Jennings')[0];
    setCostumer(found);
  }, []);

  return (
    <Container>
      <Header text="Costumers" toggleTheme={handleThemeSwitching} />
      <Greeting text={'This is all you costumers'} />
      <Costumers costumer={costumer} searched={searchedCostumer} />
      <Footer />
    </Container>
  );
};

export default Home;
