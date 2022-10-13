var cardContainerEl = document.querySelector('#card-container');
var croppedImg = document.querySelector('#cropped-img');
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
//tags modal
var modalContainerCorrect= document.getElementById("correct");
var modalContainerIncorrect= document.getElementById("incorrect");
var quitGameBtn = document.getElementById("quit-game");
var guessAgnBtn = document.getElementById("guess-again");
var correctGuessPic = document.getElementById("correctly-guessed-picture");
var playAgain = document.getElementById("play-again");
var wikiInfo = document.getElementById("wiki-info")
var seeInfo = document.getElementById("see-info")
var info = document.getElementById("info")
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


var width = croppedImg.clientWidth;
var height = croppedImg.clientHeight;
var imgMargin_left = width / 2 - 50;
var imgMargin_top = height / 2 - 50;
croppedImg.setAttribute('style', 'margin-left:-'+imgMargin_left+'px;margin-top:-'+imgMargin_top+'px;');


//this is the main function to play our game, it is also where the zoo animal api is accessed
function playZooGame () {
    var apiLink = "https://zoo-animal-api.herokuapp.com/animals/rand"
    
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
      clueLengthEl.textContent = data.length_min + ' - '+ data.length_max + ' ft.';
      clueWeightEl.textContent = data.weight_min + ' - '+data.weight_max + ' lbs.';
      clueHabitatEl.textContent = data.habitat;
      clueDietEl.textContent = data.diet;
      clueGeoEl.textContent = data.geo_range;
      croppedImg.setAttribute('src', data.image_link);
      currentAnimalName = data.name;
      correctGuessPic.setAttribute("src", data.image_link);
      
      var nameWordArr = data.name.split(" ");
      if (nameWordArr.length > 1){
        clueFirstwordEl.textContent = nameWordArr[0];
      } else {
        clueFirstwordEl.textContent = 'There is only one word';
      }
      var wikiLink = "https://en.wikipedia.org/w/api.php?action=parse&page=" + currentAnimalName.toLowerCase() +"&format=json&origin=*" 

      fetch(wikiLink,{
        cache: "reload",
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.parse.text["*"]);
        wikiInfo.innerHTML=data.parse.text["*"]
      })
    })
}

playZooGame();

var blurNum = 25;

guessAnimalButton.addEventListener('click', function(event){
    // console.log(userGuessInput.value);
    
    if (currentAnimalName.toLowerCase().includes(userGuessInput.value.toLowerCase())) {
        modalContainerCorrect.setAttribute("class", "modal is-active");
        console.log("Great guess!");
    } else {
        //subtract points
        score -= 50;
        scoreSpan.textContent = score;
        //image pops up telling user their answer was incorrect
        modalContainerIncorrect.setAttribute("class", "modal is-active");
    };
    userGuessInput.value = " ";
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
  
    quitGameBtn.addEventListener("click", function(event){
        closeModal(event.target.parentElement.parentElement);
        //this should switch us to the third modal, which gives information on the animal generated by computer (wikipedia API)
        modalContainerCorrect.setAttribute("class", "modal is-active");
    })

    playAgain.addEventListener("click", function(event){
        closeModal(event.target.parentElement.parentElement);
        // clue1.setAttribute("class", " clue flip-card-front")
        playZooGame ();

    });

    //closes modal for wrong guess
    guessAgnBtn.addEventListener("click", function(event){
        closeModal(event.target.parentElement.parentElement);
    });
    
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
    
    //add event listener for Start Gamee button to hide start page and reveal game page

    startGameBtn.addEventListener("click", function(){
      startPage.setAttribute("class", "hide rpgui-container framed rpgui-center")
      gamePage.setAttribute("class", "show")
    })

    //add event listener for "See Info" button

    seeInfo.addEventListener("click",function(event){
      closeModal(event.target.parentElement.parentElement);
      info.setAttribute("class", "modal is-active")
  });

cardContainerEl.addEventListener('click', function(event){
    
    var clickedEl = event.target;
    // console.log(clickedEl);
    if ( !(clickedEl.matches(".flip-card-front") ) ) return;

    var flipCardEl = clickedEl.parentElement.parentElement;
    flipCardEl.setAttribute('class', ' flip-card-clicked');

    var imgEl = imageContainerEl.children[0].children[0];

    blurNum -= 2;
    imgEl.setAttribute('style', 'filter:blur('+blurNum+'px)')
})
