import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../../../modules/components';
import { Container } from './styles';

import { Costumer } from '../../../modules/types/Costumer';
import { CostumersContext } from '../../../state/contexts/CostumersContext';
import { useConnection } from '../../../state/hooks/useConnection';

interface Props {
  searched: string;
}

const Costumers: React.FC<Props> = ({ searched }) => {
  const connection = useConnection();
  const [costumersToDisplay, setCostumersToDisplay] = useState(
    [] as Array<Costumer>,
  );

  const { getCostumersByName } = useContext(CostumersContext);

  useEffect(() => {
    const found = getCostumersByName(searched);
    setCostumersToDisplay(found);
  }, [searched]);

  useEffect(() => {
    (async () => {
      const res = await connection.get('/list-costumers');
      setCostumersToDisplay(res.data.response);
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
