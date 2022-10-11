var cardContainerEl = document.querySelector('#card-container');
var croppedImg = document.querySelector('#cropped-img');
var imageContainerEl = document.querySelector('#img-container');

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
        })
}

playZooGame();
cardContainerEl.addEventListener('click', function(event){
    
    var clickedEl = event.target;
    console.log(clickedEl);
    if ( !(clickedEl.matches(".flip-card-front") ) ) return;

    console.log(clickedEl.parentElement.parentElement);
    var flipCardEl = clickedEl.parentElement.parentElement;
    console.log(flipCardEl.setAttribute('class', ' flip-card-clicked'));
})

var blurNum = 30;

cardContainerEl.addEventListener('click', function(event){
    
    var clickedEl = event.target;
    console.log(clickedEl);
    if ( !(clickedEl.matches(".flip-card-front") ) ) return;

    console.log(clickedEl.parentElement.parentElement);

    var flipCardEl = clickedEl.parentElement.parentElement;
    console.log(flipCardEl.setAttribute('class', ' flip-card-clicked'));

    var imgEl = imageContainerEl.children[0].children[0];
    console.log(imgEl);

    blurNum -= 2;
    imgEl.setAttribute('style', 'filter:blur('+blurNum+'px)')
})
