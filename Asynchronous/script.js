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

  countriesContainer.style.opacity = 1;

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

//building a new promisses

// const lotteryPromise = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     if (Math.random() >= 0.5) resolve('You win');
//     else reject(new Error('You lost'));
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//promisifying setTimeout

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 1 second');
//   });

//promisifying the geolocation

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );

//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition()
//   .then(position => console.log(position))
//   .catch(err => console.error(err));

//cosuming promisess with async/await

// const whereAmI = async function (country) {
//   //geolocation
//   // const pos = await getPosition();

//   // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res));

//   const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
//   const data = await res.json();
//   console.log(data);
//   renderdata(data[0]);
// };

// whereAmI('usa');
// console.log('sdfidj');

//////////////////////////////////////
//Runing promises in parallel

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c1}`
//     // );

//     // const [data2] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c2}`
//     // );

//     // const [data3] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c3}`
//     // );

//     const data = await Promise.all([
// getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
// getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
// getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
//     ]);

//     console.log(data);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// get3Countries('india', 'portugal', 'canada');

//promises.race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/usa`),
//     getJSON(`https://restcountries.eu/rest/v2/name/portugal`),
//     getJSON(`https://restcountries.eu/rest/v2/name/canada`),
//   ]);

//   console.log(res);
//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.eu/rest/v2/name/canada`),
//   timeout(0.05),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another Success'),
// ]).then(res => console.log(res));

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));
