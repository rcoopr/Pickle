export const hslStringToArray = (hslString: string) =>
  hslString
    .match(/[0-9]+/g)! // Catch each color channel
    .map(val => parseInt(val, 10)); // Return an int

export const hslArrayToString = (hslArray: number[]) =>
  `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`;
