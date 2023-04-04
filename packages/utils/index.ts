export const parseJSON = (str: string | null) => {
  if (!str) {
    return str;
  }

  let result;
  try {
    result = JSON.parse(str);
  } catch (error) {
    console.error(`${str} is not a valid serialized object`);
    return result || str;
  }
};
