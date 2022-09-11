import '../css/style.css';
import '../css/owfont-regular.css';

const body = document.querySelector('body');
const time = document.querySelector('.time');
const dateToday = document.querySelector('.date');
const greeting = document.querySelector ('.greeting');
const userName = document.querySelector('.name');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const sliderNext = document.querySelector('.slide-next');
const sliderPrev = document.querySelector('.slide-prev');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const playListContainer = document.querySelector('.play-list');
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');
const play = document.querySelector('.play');

let randomNum;
let playNum = 0;

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  switch (Math.floor(hours / 6)) {
    case 0:
      return 'night';
    case 1:
      return 'morning';
    case 2:
      return 'afternoon';
    case 3:
      return 'evening';
  }
}

function showDate() {
  const date = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  const currentDate = date.toLocaleDateString('en-US', options);
  dateToday.textContent = currentDate;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay},`;
  greeting.textContent = greetingText;
}

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
showTime();


function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
}

randomNum = getRandomNum(1, 20);
function setBg() {
  const img = new Image();
  const timeOfDay = getTimeOfDay();
  const bgNum = String(randomNum).padStart(2, 0);
  img.src = `https://raw.githubusercontent.com/huffpufftuff/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url("https://raw.githubusercontent.com/huffpufftuff/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg")`;
  });
}
setBg();


function getSlideNext() {
  randomNum += 1;
  if (randomNum > 20) randomNum = 1;
  setBg();
}

function getSlidePrev() {
  randomNum -= 1;
  if (randomNum < 1) randomNum = 20;
  setBg();
}

sliderNext.addEventListener('click', getSlideNext);
sliderPrev.addEventListener('click', getSlidePrev);


// Weather
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=5dc8d2e3f7922b66efacafd84e35cabc&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  const temp = Math.round(data.main.temp);

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
}
city.addEventListener('change', getWeather);


// Quotes
async function getQuotes() {
  const quotes = './assets/quotes.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const item = data[getRandomNum(0, data.length - 1)];
  quote.textContent = `"${item['text']}"`;
  author.textContent = item['author'];
}
getQuotes();

changeQuote.addEventListener('click', getQuotes);


// Local Storage
function setLocalStorage() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('city', city.value)
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } 
}

window.addEventListener('load', () => {
  getLocalStorage();
  getWeather();
});


// Audio Player 
let isPlay = false;
import playList from './playList.js';
const audio = new Audio();

function playAudio() {
  audio.src = playList[playNum].src;
  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    play.classList.add('pause');
    isPlay = true;
  } 
  else {
    audio.pause();
    play.classList.remove('pause');
    isPlay = false;
  }
}
play.addEventListener('click', playAudio);

playNext.addEventListener('click', () => {
  playNum ++;
  isPlay = false;
  if (playNum > playList.length - 1) playNum = 0;
  playAudio();
  console.log(playNum);
});

playPrev.addEventListener('click', () => {
  playNum --;
  isPlay = false;
  if (playNum < 0) playNum = playList.length - 1;
  playAudio();
  console.log(playNum);
});

playList.forEach( (el) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el['title'];
  playListContainer.append(li);
});

const songs = document.querySelectorAll('.play-item');

songs.forEach(function(elem, index) {
  elem.addEventListener('click', () => {
    playNum = index;
    isPlay = false;
    playAudio();
  });
})




