import React, { useEffect, useState } from 'react';
import { Costumer } from '../../types/Costumer';
import { Container } from './styles';

interface Props {
  costumer: Costumer;
}
const CostumerInfo: React.FC<Props> = ({ costumer }) => {
  const [userToDisplay, setCostumerToDisplay] = useState(costumer);

  useEffect(() => {
    const stored = localStorage.getItem('costumer') || '';
    !costumer._id && setCostumerToDisplay(JSON.parse(stored));
  }, [costumer]);

  return (
    <Container>
      <img src={userToDisplay.picture} />
      <main>
        <h3>{userToDisplay.name}</h3>
        <div className="info">
          <h5>
            {userToDisplay.age} years, works at {userToDisplay.company}
          </h5>
        </div>
        <div className="contact">
          <span>
            Find {userToDisplay.name} at {userToDisplay.email} or{' '}
            {userToDisplay.phone}
          </span>
        </div>
      </main>
    </Container>
  );
};

export default CostumerInfo;
