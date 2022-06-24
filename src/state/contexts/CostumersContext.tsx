import React, { createContext, useCallback, useEffect, useState } from 'react';

import { Costumer } from '../../modules/types/Costumer';
import { useConnection } from '../hooks/useConnection';
import { AxiosPromise } from 'axios';

interface Props {
  children: any;
}

interface IContextProps {
  costumersToDisplay: any[];
  getAllCostumers(): Promise<Array<Costumer>>;
  getCostumersByName(name: string): Array<Costumer> | [];
  searchedCostumer: string;
  setSearched: (name: string) => void;
  getCostumerById: (id: string) => Costumer;
}

export const CostumersContext = createContext({} as IContextProps);

const CostumerProvider: React.FC<Props> = ({ children }) => {
  const connection = useConnection();
  const [costumersToDisplay, setCostumersToDisplay] = useState<
    Array<Costumer> | []
  >([]);
  const [searchedCostumer, setsearchedCostumer] = useState('');

  useEffect(() => {
    (async () => {
      const costumers = await connection.get('/list-costumers');
      setCostumersToDisplay(costumers.data.response);
    })();
  }, [costumersToDisplay]);

  const fetchUsers = (): AxiosPromise<any> => {
    return connection.get('/list-costumers');
  };

  const getAllCostumers = async (): Promise<Array<Costumer>> => {
    const costumers = await fetchUsers();
    setCostumersToDisplay(costumers.data.response);
    return costumers.data.response as Costumer[];
  };

  const getCostumersByName = (userName: string) => {
    const nameLength = userName.length;
    const considerableSubstringLength = Math.ceil(nameLength * 0.6);
    const considerableSubstring = userName.slice(
      0,
      considerableSubstringLength,
    );

    let found = costumersToDisplay.filter(user =>
      new RegExp(`${considerableSubstring}`, 'gi').test(user.name),
    ) as Array<Costumer>;

    const costumers = found.length ? (found as Array<Costumer>) : [];
    setCostumersToDisplay(costumers);

    return costumers;
  };

  const getCostumerById = (id: string): Costumer =>
    costumersToDisplay.find(thisUser => thisUser._id === id) as Costumer;

  const setSearched = useCallback(
    (name: string) => {
      setsearchedCostumer(name);
    },
    [searchedCostumer],
  );

  return (
    <CostumersContext.Provider
      value={{
        costumersToDisplay,
        getAllCostumers,
        getCostumersByName,
        searchedCostumer,
        setSearched,
        getCostumerById,
      }}
    >
      {children}
    </CostumersContext.Provider>
  );
};

export default CostumerProvider;
