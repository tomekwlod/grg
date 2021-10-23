import { lighten } from "polished";


export const swatchGenerator = (hex, amount = 20, adjustment = 0.02) => {
  let newcolors = {
    base: hex,
  };

  for (let i = 0; i < amount; i++) {
    newcolors[i + 1] = lighten(
      getMidpoint(hex) / 100 - adjustment - i / amount,
      hex
    );
  }

  return newcolors;
};

const getMidpoint = (color, value = -1) => {
  let newColor = lighten(value / 100, color);
  if (newColor !== "#fff") {
    return getMidpoint(color, value + 1);
  } else {
    return value;
  }
};
