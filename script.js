const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// VoiceRSS Javascript SDK

///Disable/Enable / Button

function toggleButton() {
  button.disabled = !button.disabled;
}

//Passing Joke to VoiceRSS API

function tellMe(joke) {
  VoiceRSS.speech({
    key: "61bda0fc2a26452786b82b135af0c207",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//Get jokes from Joke Api//

async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    ///Text to Speech///
    tellMe(joke);
    ///Disable button
    toggleButton();
  } catch (error) {
    //Catch Errors///
    console.log("whooops", error);
  }
}
///Event Listiners

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
