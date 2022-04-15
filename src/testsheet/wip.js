
// node src/testsheet/wip.js
import fetch from 'node-fetch';


(async () => {
  const sheetData = await (
    await fetch(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTW4GMYDVfUCSyvx3yAVAg42J5ub8ufGV27jLg6Zoz7jn3enDGoWp6uCzpjw7bEog9QbKBHGDuCqZd1/pub?output=csv'
    )
  ).text();

  console.log(sheetData);

})();