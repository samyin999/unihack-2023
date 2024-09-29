let curr_playing = false;

// Setting a cookie. Stores cookie name, cookie value, and number of days after which cookie expires
function setCookie() {
  // const d = new Date();
  // d.setTime(d.getTime() + (exdays*24*60*60*1000));
  // let expires = "expires="+ d.toUTCString();
  // document.cookie 
}

//Getting a cookie. Returns string value of cookie if cookie found, or "" if not found
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// punk jazz classical rock alt rock reggae ambient pop metal hippop edm blues country
source_music = ["https://d1fqjpzwgmzkf8.cloudfront.net/TheKidsArentAlright.mp3", "https://d1fqjpzwgmzkf8.cloudfront.net/FlyMeToTheMoon.mp3",
  "https://d1fqjpzwgmzkf8.cloudfront.net/NocturneNo2.mp3", "https://d1fqjpzwgmzkf8.cloudfront.net/AllStar.mp3", "https://d1fqjpzwgmzkf8.cloudfront.net/TheWhiteStripes.mp3",
  "https://d1fqjpzwgmzkf8.cloudfront.net/OneLove.mp3", "https://d1fqjpzwgmzkf8.cloudfront.net/Xtal.mp3", "https://d1fqjpzwgmzkf8.cloudfront.net/ShapeOfYou.mp3",
  "https://d1fqjpzwgmzkf8.cloudfront.net/Numb.mp3", "https://d1fqjpzwgmzkf8.cloudfront.net/GangstasParadise.mp3", "https://d1fqjpzwgmzkf8.cloudfront.net/DomDolla.mp3",
  "https://d1fqjpzwgmzkf8.cloudfront.net/CountryBoy.mp3"]

var counter = 1
var results = ""

data = [[40.19, 44.47, 44.86, 34.04, 44.41, 42.57, 37.01, 47.78],
[59.36, 50.94, 54.35, 45.71, 52.94, 53.29, 51.22, 54.48],
[70.63, 72.49, 73.71, 61.46, 74.13, 70.43, 74.16, 70.5],
[76.69, 78.87, 79.98, 67.96, 79.26, 77.59, 74.48, 80.96],
[80.5, 81.49, 82.3, 74.68, 78.41, 83.3, 77.78, 83.63],
[36.91, 28.37, 30.67, 30.19, 27.33, 33.03, 27.68, 32.64],
[57.48, 54.85, 56.4, 50.25, 51.85, 58.26, 51.97, 58.02],
[73.58, 63.6, 65.11, 72.95, 57.26, 72.79, 66.11, 66.28],
[30.73, 39.32, 38.61, 27.57, 42.47, 33.1, 32.12, 40.53],
[54.84, 41.32, 45.11, 43.41, 43.66, 45.76, 41.84, 46.97],
[70.54, 61.32, 64.33, 60.48, 61.5, 65.47, 60.71, 65.92],
[48.83, 41.43, 44.57, 35.99, 41.21, 44.97, 41.26, 44.84],
[39.13, 32.22, 32.89, 41.03, 28.79, 37.89, 34.55, 33.67]]

// function to move on to the next music
function changePage(score) {
  // keep track of questions answered
  counter++
  console.log(score)
  results += score

  // change title and song 
  document.getElementsByClassName("title")[0].innerText = " Rate the music you hear"
  document.getElementById("my-audio").setAttribute('src', source_music[counter - 1]);

  // check if user has answered 10 questions
  if (counter > 12) {
    getResult()
  }

  curr_playing = true;
  pausePlay();
}

// calculates MBTI score
function getResult() {
  // Get MBTI score
  var mbti = getMBTI(results)
  localStorage.setItem("result", mbti)
  window.location.href = "result.html"
}

// sam's algorithm
function getMBTI(result) {
  ret = ""
  E = 0
  I = 0
  N = 0
  S = 0
  T = 0
  F = 0
  J = 0
  P = 0

  for (let i = 0; i < result.length; i++) {
    if (result[i] == 'T') {
      E += data[i][0]
      I += data[i][1]
      N += data[i][2]
      S += data[i][3]
      T += data[i][4]
      F += data[i][5]
      J += data[i][6]
      P += data[i][7]
    }
    else if (result[i] == 'F') {
      E += 100 - data[i][0]
      I += 100 - data[i][1]
      N += 100 - data[i][2]
      S += 100 - data[i][3]
      T += 100 - data[i][4]
      F += 100 - data[i][5]
      J += 100 - data[i][6]
      P += 100 - data[i][7]
    }
  }

  if (E > I) {
    ret += 'E'
  }
  else {
    ret += 'I'
  }


  if (N > S) {
    ret += 'N'
  }
  else {
    ret += 'S'
  }

  if (T > F) {
    ret += 'T'
  } else {
    ret += 'F'
  }

  if (J > P) {
    ret += 'J'
  } else {
    ret += 'P'
  }

  console.log(ret)
  return ret
}

function loadMBTI() {
  // parse url
  document.getElementsByClassName("mbti")[0].innerText = localStorage.getItem("result")
}

function pausePlay() {
  if (curr_playing == false) {
    document.getElementById("my-audio").play();
    curr_playing = true;
    document.getElementById("status").innerText = "Playing";
  }
  else {
    document.getElementById("my-audio").pause();
    curr_playing = false;
    document.getElementById("status").innerText = "Paused";
  }
}

