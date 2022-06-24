import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Footer } from '../../partials';
import { CostumerInfo } from '../../../modules/components';
import { Costumer } from '../../../modules/types/Costumer';
import { CostumersContext } from '../../../state/contexts/CostumersContext';
import { Container } from './styles';

interface Props {
  handleThemeSwitching(): void;
}

interface Location {
  state: {
    costumer_id: string;
  };
}

const CostumerPage: React.FC<Props> = ({ handleThemeSwitching }) => {
  const { getCostumerById } = useContext(CostumersContext);
  const [costumer, setCostumer] = useState({} as Costumer);
  const location = useLocation() as Location;

  useEffect(() => {
    const costumerID = location.state.costumer_id;
    const foundCostumer: Costumer = getCostumerById(costumerID);
    if (foundCostumer) {
      localStorage.clear();
      localStorage.setItem('costumer', JSON.stringify(foundCostumer));
      setCostumer(foundCostumer);
    }
  }, []);

  return (
    <Container>
      <Header
        text="MySocial"
        toggleTheme={handleThemeSwitching}
        showSearchBar={false}
      />
      <CostumerInfo costumer={costumer} />
      <Footer />
    </Container>
  );
};

export default CostumerPage;
