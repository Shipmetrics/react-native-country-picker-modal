import countries from 'world-countries';
import flags from '../src/countryFlags';

const isEmoji = process.argv.includes('--emoji');
const isCca2 = process.argv.includes('--cca2');

const getCountryNames = (common, translations) => Object
    .keys(translations)
    .map(key => ({ [key]: translations[key].common }))
    .reduce((prev, cur) => ({ ...prev, [Object.keys(cur)[0]]: cur[Object.keys(cur)[0]] }), {});

const allowedContents = ['DE', 'CH', 'AT', 'FR', 'BE', 'NL', 'CZ', 'DK', 'LU', 'ES', 'GB', 'IE', 'IT', 'LI', 'PL', 'PT', 'RO', 'SE', 'BA', 'BG', 'HR', 'FI', 'GR', 'HU', 'MK', 'NO', 'RU', 'RS', 'SK', 'SI', 'TR']

const newcountries = countries.filter((ccode) => {
  return allowedContents.includes(ccode.cca2)
})
  .map(
    ({ cca2, currency, callingCode, name: { common }, translations }) => ({
      [cca2]: {
        currency: currency[0],
        callingCode: callingCode[0],
        flag: isEmoji ? `flag-${cca2.toLowerCase()}` : flags[cca2],
        name: { common, ...getCountryNames(common, translations) },
      },
    })
  )
  .sort((a, b) => {
    if (a[Object.keys(a)[0]].name.common === b[Object.keys(b)[0]].name.common) {
      return 0;
    } else if (a[Object.keys(a)[0]].name.common < b[Object.keys(b)[0]].name.common) {
      return -1;
    }
    return 1;
  })
  .reduce(
    (prev, cur) =>
    ({
      ...prev,
      [Object.keys(cur)[0]]: cur[Object.keys(cur)[0]],
    }),
    {});
if (!isCca2) {
  console.log(JSON.stringify(newcountries)); // eslint-disable-line
} else {
  console.log(JSON.stringify(Object.keys(newcountries))); // eslint-disable-line
}
