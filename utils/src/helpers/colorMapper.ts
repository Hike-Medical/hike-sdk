type ColorMap = Record<string, string>;

const colorHexMap: ColorMap = {
  white: '#FFFFFF',
  black: '#000000',
  beige: '#F5F5DC',
  camel: '#C19A6B',
  'snake white': '#F8F8FF',
  gray: '#808080',
  brown: '#A52A2A',
  olive: '#808000',
  taupe: '#483C32',
  'dark cherry': '#8B0000',
  turquoise: '#40E0D0',
  lavender: '#E6E6FA',
  'light blue': '#ADD8E6',
  blue: '#0000FF',
  'dark brown': '#654321',
  charcoal: '#36454F',
  'chocolate snake': '#D2691E',
  rose: '#FF007F',
  'black/black': '#000000',
  red: '#FF0000',
  'dark gray': '#A9A9A9',
  bordeaux: '#800020',
  'light brown': '#A52A2A',
  'black knit': '#2F4F4F',
  khaki: '#F0E68C',
  'light gray': '#D3D3D3',
  tan: '#D2B48C',
  pewter: '#96A8A1',
  bone: '#E3DAC9',
  'dark olive': '#556B2F',
  'burnished brown': '#A17A74',
  grey: '#808080',
  'black red': '#000000',
  'black/red': '#000000',
  'grey/black': '#808080',
  'blue/yellow': '#0000FF',
  whiskey: 'unknown',
  'dark grey': '#A9A9A9',
  stone: '#808080',
  'black grey': '#000000',
  'black/grey': '#000000',
  'grey/blue': '#808080',
  'grey/red': '#808080',
  'blue/green': '#0000FF',
  'oil black': '#000000',
  'black stretch': '#000000',
  'oil brown': '#2C2416',
  'purple pink': '#800080',
  cognac: '#834333',
  'grey/orange': '#808080',
  'white blue': '#FFFFFF',
  'teal/lime': '#008080',
  'purple/pink': '#800080',
  chocolate: '#d2691e',
  saddle: '#8b4513',
  almond: '#EADDCA'
};

export const getColorHex = (color: string): string | undefined => {
  const normalizedColor = color.toLowerCase();
  return colorHexMap[normalizedColor];
};
