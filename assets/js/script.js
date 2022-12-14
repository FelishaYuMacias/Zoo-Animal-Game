var cardContainerEl = document.querySelector('#card-container');
var croppedImgFrame = document.querySelector('#cropped-img-frame');
var imageContainerEl = document.querySelector('#img-container');
var clueTypeEl = document.querySelector('#clue-type');
var blurImageEl = document.querySelector('#blur-image');
var clueActiveEl = document.querySelector('#clue-active');
var clueLengthEl = document.querySelector('#clue-length');
var clueWeightEl = document.querySelector('#clue-weight');
var clueHabitatEl = document.querySelector('#clue-habitat');
var clueDietEl = document.querySelector('#clue-diet');
var clueGeoEl = document.querySelector('#clue-geo');
var clueFirstwordEl = document.querySelector('#clue-firstword');
var guessAnimalButton = document.getElementById("guess-animal-button");
var userGuessInput = document.querySelector("#user-guess-input");
var scoreSpan = document.querySelector("#score-span");
var score = 300;
var currentAnimalName;
var startGameBtn = document.getElementById("startGame")
var startPage = document.getElementById("startPage")
var gamePage = document.getElementById("gamePage")
var startImage = document.getElementById("startImage")
var startImageInfo = document.getElementById("startImageInfo");

var quitGameBtn = document.getElementById("quit-game");
var guessAgnBtn = document.getElementById("guess-again");

var playAgain = document.getElementById("play-again");
var youtubeInfo = document.getElementById("youtube-info");
// var wikiInfo = document.getElementById("wiki-info")
var seeInfo = document.getElementById("see-info")
var info = document.getElementById("info")
var info_nameEl = document.getElementById("info-animal-name");
var infoCloseBtn = document.getElementById("info-close");
var infoPlayAgainBtn = document.getElementById("info-play-again");
var quizResultCorrectEl = document.getElementById('quiz-result-correct');
var quizResultWrongEl = document.getElementById('quiz-result-wrong');
var showAnswerEl = document.getElementById('show-answer');
var congratEl = document.getElementById('congrat');

//clue card variables
var clueEl =document.querySelector("#clue")
var clue1 = document.getElementById("clue-1")
var clue2 = document.getElementById("clue-2")
var clue3 = document.getElementById("clue-3")
var clue4 = document.getElementById("clue-4")
var clue5 = document.getElementById("clue-5")
var clue6 = document.getElementById("clue-6")
var clue7 = document.getElementById("clue-7")
var clue8 = document.getElementById("clue-8")
var clue9 = document.getElementById("clue-9")
var clueArray = [clue1, clue2, clue3, clue4, clue5, clue6, clue7,clue8, clue9]


// blur filter value
var blurNum;

//function to get Start Page Image from zoo API
function getStartImage (){
  var apiLink = "https://zoo-animal-api.herokuapp.com/api/animals/random"
  fetch(apiLink, {
    cache: "reload",
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // data.image_link
    
    startImage.setAttribute("src", data.image_link);
    var startImageAnimalName = document.createElement("li");
    startImageAnimalName.textContent = "Name: " + data.name;
    startImageInfo.appendChild(startImageAnimalName);

    var startImageAnimalLatinName = document.createElement("li");
    startImageAnimalLatinName.textContent = "Latin Name: " + data.latin_name;
    startImageInfo.appendChild(startImageAnimalLatinName);

    var startImageAnimalLife = document.createElement("li");
    startImageAnimalLife.textContent = "Lifespan: " + data.lifespan;
    startImageInfo.appendChild(startImageAnimalLife);
    
    var startImageAnimalType = document.createElement("li");
    startImageAnimalType.textContent = "Type: " + data.animal_type;
    startImageInfo.appendChild(startImageAnimalType);

    var startImageAnimalRange = document.createElement("li");
    startImageAnimalRange.textContent = "Geo-Range: " + data.geo_range;
    startImageInfo.appendChild(startImageAnimalRange);

    var startImageAnimalHabitat = document.createElement("li");
    startImageAnimalHabitat.textContent = "Habitat: " + data.habitat;
    startImageInfo.appendChild(startImageAnimalHabitat);

    var startImageAnimalDiet = document.createElement("li");
    startImageAnimalDiet.textContent = "Diet: " + data.diet;
    startImageInfo.appendChild(startImageAnimalDiet);



})
}

getStartImage()
//this is the main function to play our game, it is also where the zoo animal api is accessed
function playZooGame () {
    score = 300;
    scoreSpan.textContent = score;
    var apiLink = "https://zoo-animal-api.herokuapp.com/api/animals/random"
    
    // reset clue cards / image blur value / hide guess result modules
    var flippedCardElArr = document.querySelectorAll('.flip-card-clicked');
    for (let i = 0; i < flippedCardElArr.length; i++) {
      flippedCardElArr[i].setAttribute('class', ' flip-card');
    }
    blurNum = 30;
    blurImageEl.setAttribute('style', 'filter:blur('+blurNum+'px)')
    quizResultCorrectEl.setAttribute('style','display:none');
    quizResultWrongEl.setAttribute('style','display:none');
    youtubeInfo.textContent = '';

    fetch(apiLink, {
      cache: "reload",
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // data.image_link
      
      blurImageEl.setAttribute('src', data.image_link);
      clueTypeEl.textContent = data.animal_type;
      clueActiveEl.textContent = data.active_time;
      clueLengthEl.textContent = data.length_min + ' - '+ data.length_max ;
      clueWeightEl.textContent = data.weight_min + ' - '+data.weight_max ;
      clueHabitatEl.textContent = data.habitat;
      clueDietEl.textContent = data.diet;
      clueGeoEl.textContent = data.geo_range;
      croppedImgFrame.setAttribute('style', 'background-image:url('+data.image_link+');');
      currentAnimalName = data.name;
      
      var nameWordArr = data.name.split(" ");
      if (nameWordArr.length > 1){
        clueFirstwordEl.innerHTML = nameWordArr[0] + "<br />("+nameWordArr.length+" words)";
      } else {
        clueFirstwordEl.textContent = 'There is only one word starting with letter '+nameWordArr[0].charAt(0);
      }
    //   use action instead of parse
    //   var wikiLink = "https://en.wikipedia.org/w/api.php?action=parse&page=" + currentAnimalName.toLowerCase() +"&format=json&origin=*" 

      // var wikiLinkTwo = "https://en.wikipedia.org/w/api.php?action=query&titles=" + currentAnimalName.toLowerCase() + "&prop=images|extlinks&format=json&origin=*"
    
    })
}

playZooGame();

function youtubeAPILoop() {
  var key = "AIzaSyCK6pERvSUvo8X9ZNpbF4s6dS224J3_JpM";
  var youtubeAPI = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + currentAnimalName + " animal&key="+key;

  fetch(youtubeAPI,{
    cache: "reload",
  })
  .then(function (response) {
    // may need to use JSON.parse(response)
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    info_nameEl.textContent = currentAnimalName;
    youtubeInfo.textContent = "";
    for (let i = 0; i < data.items.length; i++) {
      var videoID = data.items[i].id.videoId;
      var videoThumbnail = data.items[i].snippet.thumbnails.default.url;
      var snippetTitle = data.items[i].snippet.title;
      var videoDescription = data.items[i].snippet.description;

      var thumbnailContainer = document.createElement("section");
      var thumbArticle = document.createElement("article");
      var thumbnailImage = document.createElement("img");
      var thumbnailTitle = document.createElement("h3");
      var descriptionParagraph = document.createElement("p");
      var thumbnailURL = document.createElement("a");

      thumbnailImage.setAttribute("src", videoThumbnail);
      thumbnailTitle.textContent = snippetTitle;
      descriptionParagraph.textContent = videoDescription;
      thumbnailURL.appendChild(thumbnailImage);
      thumbnailURL.setAttribute("href", "https://www.youtube.com/watch?v=" + videoID);
      thumbnailURL.setAttribute("target", "_blank");
      thumbArticle.append(thumbnailTitle, descriptionParagraph)

      thumbnailContainer.append(thumbnailURL, thumbArticle);

      youtubeInfo.appendChild(thumbnailContainer);
  
    }
    
    
  })
}


guessAnimalButton.addEventListener('click', function(event){
    // console.log(userGuessInput.value);
    
    if (userGuessInput.value.trim() === ""){
      console.log("enter a value")
    } else if (currentAnimalName.toLowerCase().includes(userGuessInput.value.trim().toLowerCase())) {
        score += 100;
        scoreSpan.textContent = score;
        console.log(score);

        quizResultWrongEl.setAttribute('style','display:none');
        quizResultCorrectEl.setAttribute('style','display:block');
        congratEl.setAttribute('style', 'display:block;');
        showAnswerEl.textContent = currentAnimalName;
        blurImageEl.setAttribute('style', 'filter:blur(0px)')

        console.log("Great guess!");
    } else {
        //subtract points
        score -= 50;
        console.log(score);

        scoreSpan.textContent = score;
        //image pops up telling user their answer was incorrect
        console.log("try again");
        quizResultCorrectEl.setAttribute('style','display:none');
        quizResultWrongEl.setAttribute('style','display:block');
    };
    userGuessInput.value = "";
})

clue1.addEventListener('click', function(event){
      //subtract points
      score -= 20;
      scoreSpan.textContent = score;
  });
  clue2.addEventListener('click', function(event){
    //subtract points
    score -= 10;
    scoreSpan.textContent = score;
});
clue3.addEventListener('click', function(event){
  //subtract points
  score -= 10;
  scoreSpan.textContent = score;
});
clue4.addEventListener('click', function(event){
  //subtract points
  score -= 10;
  scoreSpan.textContent = score;
});
clue5.addEventListener('click', function(event){
  //subtract points
  score -= 10;
  scoreSpan.textContent = score;
});
clue6.addEventListener('click', function(event){
  //subtract points
  score -= 50;
  scoreSpan.textContent = score;
});
clue7.addEventListener('click', function(event){
  //subtract points
  score -= 10;
  scoreSpan.textContent = score;
});
clue8.addEventListener('click', function(event){
  //subtract points
  score -= 10;
  scoreSpan.textContent = score;
});
clue9.addEventListener('click', function(event){
  //subtract points
  score -= 50;
  scoreSpan.textContent = score;
});


    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });

  
// from wrong guess, quit game then show the right answer
quitGameBtn.addEventListener("click", function(event){
    //this should switch us to the correct answer module without 'congratulation', 
    // which gives information on the animal generated by computer (wikipedia API)
    quizResultCorrectEl.setAttribute('style','display:block');
    showAnswerEl.textContent = currentAnimalName;
    blurImageEl.setAttribute('style', 'filter:blur(0px)')
    congratEl.setAttribute('style', 'display:none;');
    quizResultWrongEl.setAttribute('style','display:none');
})

playAgain.addEventListener("click", function(event){
    playZooGame ();

});

// hide answer result 
guessAgnBtn.addEventListener("click", function(event){
    quizResultWrongEl.setAttribute('style','display:none');
});


//add event listener for Start Gamee button to hide start page and reveal game page
startGameBtn.addEventListener("click", function(){
  startPage.setAttribute("class", "hide rpgui-content")
  gamePage.setAttribute("class", "show rpgui-content")
})

    
//add event listener for "See Info" button
seeInfo.addEventListener("click",function(event){
    youtubeAPILoop ();
    info.setAttribute("class", "modal is-active")
});

infoCloseBtn.addEventListener('click', function(event){
    closeModal(event.target.parentElement.parentElement);
})

infoPlayAgainBtn.addEventListener('click', function(event){
  
    closeModal(event.target.parentElement.parentElement);
    playZooGame ();
})

cardContainerEl.addEventListener('click', function(event){
    
    var clickedEl = event.target;
    // console.log(clickedEl);
    if ( !(clickedEl.matches(".flip-card-front") ) ) {
      if (clickedEl.parentElement.matches(".flip-card-front")) {
        clickedEl = clickedEl.parentElement;
      } else {
        return;
      }
    } 
    var flipCardEl = clickedEl.parentElement.parentElement;
    flipCardEl.setAttribute('class', ' flip-card-clicked');

    blurNum -= 3;
    blurImageEl.setAttribute('style', 'filter:blur('+blurNum+'px)')
})
