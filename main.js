/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
let audioPlayer = document.querySelector(".music-player");
let form = document.querySelector(".search-form");
let results = document.querySelector(".results");
let player = document.getElementById("audio");

// 2. Create your `onSubmit` event for getting the user's search term
form.onsubmit = function onSubmit() {
  console.log(form.search.value);
  event.preventDefault();
  searchSoundCloud(form.search.value);
};

// 3. Create your `fetch` request that is called after a submission
function searchSoundCloud(searchRequestString){
  fetch("http://api.soundcloud.com/tracks/?client_id=8538a1744a7fdaa59981232897501e04&q=" + searchRequestString)
  .then(function(response){
    response.json().then(function(data){
      console.log(data);
      // clear the results
      document.getElementById("results").innerHTML='';
      // loop thru each element in the response data
      for (var i = 0; i < data.length; i++) {
        let currentDataElement = data[i];
        // make a new paragraph and image
        let par = document.createElement("p");
        let currentImage = document.createElement("img");
        // put the title in the new paragraph and connect the artwork to the image
        par.textContent = currentDataElement.title;
        let x = currentDataElement.artwork_url;
        if (x) {
          currentImage.src = x;
        } else {
          currentImage.src = "img/null_2.png";
        }
         
        // append the new pieces to the "results" section of the HTML
        document.getElementById("results").appendChild(currentImage);
        document.getElementById("results").appendChild(par);
        // add an event listener to each image
        currentImage.addEventListener('click',function(event){
          // this should put the current stream URL into each
          player.src = currentDataElement.stream_url + "?client_id=8538a1744a7fdaa59981232897501e04";
          console.log(player.src);
        });        
      }
    })
  })
}