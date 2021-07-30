'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderdata = function (data, className = '') {
  //   console.log(data);
  const html = `
        <article class="country ${className}" >
        <img class="country__img" src=${data.flag} />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${
            +data.population >= 1000000
              ? (+data.population / 1000000).toFixed(1)
              : data.population
          } people </p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   if (country === 'all') {
//     request.open('GET', `https://restcountries.eu/rest/v2/all`);
//   } else {
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   }

//   request.send();

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     const datas = JSON.parse(this.responseText);
//     console.log(datas);

//     countriesContainer.style.opacity = 1;

//     datas.forEach(data => {
//       renderdata(data);
//     });
//   });
// };

// getCountryData('india');
// getCountryData('usa');

// getCountryData('all');

// const getCountryNeighbour = function (country) {
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     const datas = JSON.parse(this.responseText);
//     //console.log(data);

//     countriesContainer.style.opacity = 1;

//     datas.forEach(data => {
//       renderdata(data);

//       const neighbours = data.borders;

//       if (!neighbours) return;

//       neighbours.forEach(neighbour => {
//         const nrighbourrequest = new XMLHttpRequest();
//         nrighbourrequest.open(
//           'GET',
//           ` https://restcountries.eu/rest/v2/alpha/${neighbour}`
//         );
//         nrighbourrequest.send();

//         nrighbourrequest.addEventListener('load', function () {
//           const Ndata = JSON.parse(this.responseText);
//           renderdata(Ndata, 'neighbour');
//         });
//       });
//     });
//   });
// };

// getCountryNeighbour('india');

//using promises

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       data.forEach(element => {
//         // console.log(element);
//         renderdata(element);
//         countriesContainer.style.opacity = 1;
//       });
//     });
// };

const getJSON = function (url, errorMsg = 'Somthing went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }

    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }

//       return response.json();
//     })
//     .then(data => {
//       renderdata(data[0]);
//       console.log(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }

//       return response.json();
//     })
//     .then(data => renderdata(data, 'neighbour'))
//     .catch(err => alert(err))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found '
  )
    .then(data => {
      renderdata(data[0]);
      console.log(data[0]);
      const neighbour = data[0].borders[0];
      // const neighbour = 'efegrgt';

      if (!neighbour) throw new Error('No neighbour found');

      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found '
      );
    })
    .then(data => renderdata(data, 'neighbour'))
    .catch(err => alert(err))
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  getCountryData('usa');
});

// getCountryData('dsfegftrh');
