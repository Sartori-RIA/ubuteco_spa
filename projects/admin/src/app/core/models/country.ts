export interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
}

export const COUNTRIES_DB: Country[] = [
  {
    name: 'Brazil',
    alpha2Code: 'BR',
    alpha3Code: 'BR',
    numericCode: '076'
  },
  {
    name: 'Spain',
    alpha2Code: 'ES',
    alpha3Code: 'ES',
    numericCode: '724'
  },
  {
    name: 'United States of America',
    alpha2Code: 'US',
    alpha3Code: 'US',
    numericCode: '840'
  },
];
