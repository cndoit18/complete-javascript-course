'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

function whereAmI(lat, lng, callback = insert) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(
          `response is not ok: [${response.status}] ${response.statusText}`
        );
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(
        `https://restcountries.com/v3.1/name/${data.country}?fullText=true`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(
          `response is not ok: [${response.status}] ${response.statusText}`
        );
      return response.json();
    })
    .then(callback)
    .catch(err => {
      console.error(err);
    });
}

function insert(data) {
  if (!data) return;

  const [
    {
      flags: { svg: image },
      name: { common: name },
      region,
      population,
      languages,
      currencies,
    },
  ] = data;

  console.log(data);
  countriesContainer.insertAdjacentHTML(
    'beforeend',
    `<article class="country">
      <img class="country__img" src="${image}" />
      <div class="country__data">
        <h3 class="country__name">${name}</h3>
        <h4 class="country__region">${region}</h4>
        <p class="country__row"><span>👫</span>${(+population).toLocaleString()} people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.values(currencies)[0].name
        }</p>
      </div>
    </article>`
  );
  countriesContainer.style.opacity = 1;
}

btn.addEventListener('click', function (e) {
  const getPosition = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  getPosition.then(position => {
    const {
      coords: { latitude, longitude },
    } = position;
    whereAmI(latitude, longitude);
  });
});

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

function createImage(imgPath) {
  const imgElement = document.createElement('img');
  imgElement.src = imgPath;
  const images = document.querySelector('.images');
  return new Promise((resolve, reject) => {
    imgElement.addEventListener('load', e => {
      images.appendChild(imgElement);
      resolve(imgElement);
    });
    imgElement.addEventListener('error', () =>
      reject(new Error(`failed to load image`))
    );
  });
}

// const wait = function (seconds, context) {
//   return new Promise(function (resolve) {
//     setTimeout(() => resolve(context), seconds * 1000);
//   });
// };

// createImage('./img/img-1.jpg')
//   .then(element => {
//     return wait(2, element);
//   })
//   .then(element => {
//     element.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(element => {
//     return wait(2, element);
//   })
//   .then(element => {
//     element.style.display = 'none';
//   })
//   .catch(e => console.error(e));

// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
async function loadNPause() {
  try {
    let element = await createImage('./img/img-1.jpg');
    await wait(2);
    element.style.display = 'none';
    element = await createImage('./img/img-2.jpg');
    await wait(2);
    element.style.display = 'none';
  } catch (e) {
    console.error(e);
  }
}
// loadNPause();

async function loadAll(...imgArr) {
  try {
    (await Promise.all(imgArr.map(v => createImage(v)))).map(elem => {
      elem.classList.add('parallel');
    });
  } catch (e) {
    console.error(e);
  }
}
loadAll('img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg');
