export const capitalizarFirstLetter = (key: string) => {
  const result = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
  return result;
};
