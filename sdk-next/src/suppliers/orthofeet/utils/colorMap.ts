/**
 * Orthofeet color mapping from color label to hex color
 * Maps the actual color names from the Orthofeet API to visual hex colors
 */
export const ORTHOFEET_COLOR_MAP: Record<string, string> = {
  // Basic colors
  Pink: '#FFC0CB',
  Blue: '#0000FF',
  Black: '#000000',
  Brown: '#8B4513',
  White: '#FFFFFF',
  Gray: '#808080',
  Grey: '#808080',
  Tan: '#D2B48C',
  Bronze: '#CD7F32',
  Eggshell: '#F0EAD6',
  Beige: '#F5F5DC',
  Navy: '#000080',
  'Light Blue': '#ADD8E6',
  Red: '#FF0000',
  Lavender: '#E6E6FA',
  Rose: '#FF007F',
  Khaki: '#F0E68C',
  Green: '#008000',
  Yellow: '#FFFF00',
  Burgundy: '#800020',

  // Navy variants
  'Navy Blue': '#000080',
  'Navy Leather': '#000080',

  // Brown variants
  'Brown/Black': '#654321',
  'Dark Brown': '#654321',
  'Light Brown': '#B5651D',
  Chocolate: '#7B3F00',
  Chestnut: '#954535',
  'Chestnut Brown': '#954535',
  Cinnamon: '#D2691E',
  Cordovan: '#893F45',
  Mocha: '#967969',
  Toffee: '#755138',

  // Blue variants
  'Blue/Black': '#003366',
  'Power Blue': '#4169E1',
  'Royal Blue': '#4169E1',
  'Slate Blue': '#6A5ACD',
  'Indigo Blue': '#4B0082',
  Indigo: '#4B0082',
  Sapphire: '#0F52BA',

  // Gray variants
  'Black/ Gray': '#4A4A4A',
  'Black/Gray': '#4A4A4A',
  'Black & Gray': '#4A4A4A',
  'Dark Gray': '#A9A9A9',
  'Light Gray': '#D3D3D3',
  Charcoal: '#36454F',
  'Charcoal/Dark Gray': '#36454F',
  Pewter: '#8BA8B7',
  Platinum: '#E5E4E2',

  // White variants
  'White/Grey': '#F5F5F5',
  'White/Gray': '#F5F5F5',
  'White/Blue': '#F0F8FF',
  'White/Black': '#F0F0F0',
  'White/Light Gray': '#F5F5F5',
  'White/Gray/Silver': '#E8E8E8',

  // Combined colors
  'Black/Salmon': '#3D3D3D',
  'Black/White': '#3D3D3D',
  'Black/Gray Multi': '#4A4A4A',
  'Blue/Green': '#0D98BA',
  'Blue/White/Gray': '#7B9FB5',
  'Blue/Orange': '#4169E1',
  'Green/Blue': '#0D98BA',
  'Gray/Black': '#696969',
  'Gray/Blue': '#6C7B8B',
  'Gray/Gray': '#808080',

  // Beige/Tan variants
  Blonde: '#FAF0BE',
  'Blonde Tan': '#F4E5C2',
  Bone: '#E3DAC9',
  Sand: '#C2B280',
  Camel: '#C19A6B',
  Oatmeal: '#E5D8C4',
  Ecru: '#C2B280',
  Wheat: '#F5DEB3',

  // Red/Pink variants
  'Dark Cherry': '#8B2635',
  Bordeaux: '#6D071A',
  Maroon: '#800000',
  Merlot: '#73343A',
  Fuchsia: '#FF00FF',
  'Floral Pink': '#FFB6C1',
  Peach: '#FFE5B4',

  // Green variants
  Olive: '#808000',
  'Dark Olive': '#556B2F',
  Pistachio: '#93C572',

  // Purple variants
  'D. Rose Pk': '#C71585',

  // Metallic variants
  'Black Mtlc': '#1C1C1C',
  'Platinum Met': '#E5E4E2',
  'Platinum Metallic': '#E5E4E2',
  Silver: '#C0C0C0',
  'Solver Mtlc': '#C0C0C0',
  'Wht Mtlc': '#F5F5F5',
  'Taupe Mtlc': '#B38B6D',

  // Special materials/patterns
  'Black Knit': '#1A1A1A',
  'Black Nubuck': '#2C2C2C',
  'Black Snake': '#0D0D0D',
  'Blue Nubuck': '#1E3A5F',
  'Blue Suede': '#2A5783',
  'Brown Snake': '#6B4423',
  'Chocolate Snake': '#4A2511',
  'Clay Nubuck': '#B47B5A',
  'Mocha Nubuck': '#826B5F',
  'Spice Nubuck': '#B5651D',
  'Wheat Suede': '#E4C896',
  'Snake White': '#EFEFEF',
  'White Snake': '#F0F0F0',
  'Beige Leopard': '#F5F5DC',
  'Gray Leopard': '#A9A9A9',
  Leopard: '#D2B48C',
  'Snow Leopard': '#FFFAFA',
  'Oatmeal Plaid': '#E5D8C4',

  // Additional shades
  Taupe: '#B38B6D',
  Mushroom: '#B99B89',
  Clay: '#B66A50',
  Spice: '#D2691E',
  Ocre: '#CC7722',
  Florence: '#E5C7A6',
  Nira: '#9C7C5B',
  Turquoise: '#40E0D0'
};

/**
 * Get the hex color for a given color label (description)
 * Falls back to searching by color name if exact match not found
 */
export const getOrthofeetColorHex = (colorLabel: string): string | undefined => {
  if (!colorLabel) return undefined;

  // Try exact match first
  if (ORTHOFEET_COLOR_MAP[colorLabel]) {
    return ORTHOFEET_COLOR_MAP[colorLabel];
  }

  // Try case-insensitive match
  const lowerLabel = colorLabel.toLowerCase();
  const matchedKey = Object.keys(ORTHOFEET_COLOR_MAP).find((key) => key.toLowerCase() === lowerLabel);

  if (matchedKey) {
    return ORTHOFEET_COLOR_MAP[matchedKey];
  }

  // Try partial match for compound colors (e.g., "White/Blue" should match if label contains "White" or "Blue")
  const partialMatch = colorLabel
    .split(/[/\s&]+/)
    .filter(Boolean)
    .map((word) => Object.keys(ORTHOFEET_COLOR_MAP).find((key) => key.toLowerCase() === word.toLowerCase()))
    .find((key) => key !== undefined);

  return partialMatch ? ORTHOFEET_COLOR_MAP[partialMatch] : undefined;
};
