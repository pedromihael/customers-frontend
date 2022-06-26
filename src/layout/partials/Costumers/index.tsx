import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../../../modules/components';
import { Container } from './styles';

import { Costumer } from '../../../modules/types/Costumer';
import { CostumersContext } from '../../../state/contexts/CostumersContext';

interface Props {
  searched: string;
}

const Costumers: React.FC<Props> = ({ searched }) => {
  const [costumersToDisplay, setCostumersToDisplay] = useState(
    [] as Array<Costumer>,
  );

  const {
    getCostumersByName,
    getAllCostumers,
    setCostumersToDisplay: setContextCostumers,
  } = useContext(CostumersContext);

  useEffect(() => {
    const found = getCostumersByName(searched);
    setCostumersToDisplay(found);
  }, [searched]);

  useEffect(() => {
    (async () => {
      const res = await getAllCostumers();
      setCostumersToDisplay(res);
      setContextCostumers(res);
    })();
  }, []);

  return (
    <>
      <Container>
        <main>
          {costumersToDisplay.map((c: Costumer, index: number) => (
            <Card
              key={index}
              costumer_id={c._id}
              name={c.name}
              age={c.age}
              company={c.company}
              phone={c.phone}
              picture={c.picture}
            />
          ))}
        </main>
      </Container>
    </>
  );
};

export default Costumers;
