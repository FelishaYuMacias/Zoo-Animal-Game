var cardContainerEl = document.querySelector('#card-container');
var croppedImg = document.querySelector('#cropped-img');
var imageContainerEl = document.querySelector('#img-container');
var clueTypeEl = document.querySelector('#clue-type');
var blurImageEl = document.querySelector('#blur-image');
var clueTypeEl = document.querySelector('#clue-type');
var clueActiveEl = document.querySelector('#clue-active');
var clueLengthEl = document.querySelector('#clue-length');
var clueWeightEl = document.querySelector('#clue-weight');
var clueHabitatEl = document.querySelector('#clue-habitat');
var clueDietEl = document.querySelector('#clue-diet');
var clueGeoEl = document.querySelector('#clue-geo');
var clueFirstwordEl = document.querySelector('#clue-firstword');

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

            var nameWordArr = data.name.split(" ");
            if (nameWordArr.length > 1){
                clueFirstwordEl.textContent = nameWordArr[0];
            } else {
                clueFirstwordEl.textContent = 'There is only one word';
            }

        })
}

playZooGame();

var blurNum = 25;

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
