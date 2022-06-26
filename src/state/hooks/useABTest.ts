export const useABTest = () => {
  const handleClick = async (featureName: any, userInfo: any) => {
    localStorage.setItem(featureName, JSON.stringify(userInfo));
  };

  return handleClick;
};
