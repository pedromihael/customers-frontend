import { useConnection } from './useConnection';

export const useABTest = () => {
  const handleClick = async (featureName: any, userInfo: any) => {
    // await connection.put('/ab-test');
    localStorage.setItem(featureName, JSON.stringify(userInfo));
  };

  return handleClick;
};
