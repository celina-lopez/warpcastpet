export const truncateAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 14)}...${address.slice(-12)}`;
};
