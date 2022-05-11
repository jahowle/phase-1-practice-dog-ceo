//Set the server URL to a global variable so that I can use it in functions easier
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let selection
let breedList

//Initial function that will kick off process of getting the dog data on the page but only after the dom is ready
document.addEventListener("DOMContentLoaded", getAllDogs);
document.addEventListener("DOMContentLoaded", getDogBreeds);
document.addEventListener("DOMContentLoaded", () => {
    let element = document.querySelector('#breed-dropdown')
    breedList = document.getElementsByClassName("item");
    element.addEventListener("change", () => {
        selection = element.value
        applyFilter(selection);
        console.log(selection);
    })
})

function applyFilter(letter) {
    // console.log(breedList[0].innerText.charAt(0));
    for (const thing of breedList) {
        if (letter === thing.innerText.charAt(0)){
            thing.style.display = "";
        } else {
            thing.style.display = "none";
        }
    }
}

function renderOneDog(dog) {
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
        <img src="${dog}">
    `
    document.querySelector("#dog-image-container").appendChild(card);
}

function addBreed(breed) {
    let item = document.createElement('li')
    item.className = 'item'
    item.textContent = `${breed}`
    item.addEventListener('click', () => {
        item.style.color = "blue";
    })
    document.querySelector("#dog-breeds").appendChild(item);
    
}

//Fetch function to get dog data that is being called in the initial document load event
function getAllDogs() {
    fetch(imgUrl)
    .then(res => res.json())
    .then(array => array.message.forEach(dog => renderOneDog(dog)))
        
        //console.log(array.message[0]))
}

function getDogBreeds() {
    fetch(breedUrl)
    .then(res => res.json())
    .then(breeds => {
        const keys = Object.keys(breeds.message)
        
        keys.forEach(breed => addBreed(breed))
    })
}

