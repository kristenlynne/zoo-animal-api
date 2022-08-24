// Endpoints
// https://zoo-animal-api.herokuapp.com/animals/rand/10 (1-10)
// https://zoo-animal-api.herokuapp.com/animals/rand/

/* Todo 
x fetch data
x manipulate data and display in DOM
x create carousel of random animals
x refresh page for more random animals!
- make it so duplicate animals don't show :/
- style CSS
*/

// Event Listeners
document.addEventListener('DOMContentLoaded', getZooAnimals); 
document.querySelector('button').addEventListener('click', getZooAnimals);
// Refreshes page & fetches more animals
window.addEventListener("load", event => {
  document.querySelector('.reloadPage').onclick = function() {
      location.reload(true);
  }
});

// Fetches & iterates through data, creates carousel functionality
async function getZooAnimals() {
  const url = `https://zoo-animal-api.herokuapp.com/animals/rand/10`

  try {
    const res = await fetch(url);
    const data = await res.json();
      console.log(data);
      data.forEach(animal => {
        console.log(animal)
        addToDOM(animal)
      })
      const slidesContainer = document.getElementById("slides-container");
      const slide = document.querySelector(".slide");
      const prevButton = document.getElementById("slide-arrow-prev");
      const nextButton = document.getElementById("slide-arrow-next");
 
      nextButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft += slideWidth;
      });
 
      prevButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
      });
  }
  catch (err) {
    console.log(`Error: ${err}`)
  }
}

// manipulates DOM and gets properties from data
function addToDOM(animal) {
  const li = document.createElement('li');
  li.classList.add('slide')

  li.innerHTML = `
    <div>
      <h1>${animal.name}</h1>
      <img src="${animal.image_link}" alt="${animal.name}"/>
      <ul>
        <li><b>Latin Name:</b> ${animal.latin_name}</li>
        <li><b>Animal Type:</b> ${animal.animal_type}</li>
        <li><b>Habitat:</b> ${animal.habitat}</li>
        <li><b>Location:</b> ${animal.geo_range}</li>
        <li><b>Active Time:</b> ${animal.active_time}</li>
        <li><b>Diet:</b> ${animal.diet}</li>
        <li><b>Lifespan:</b> ${animal.lifespan} years</li>
        <li><b>Weight:</b> ${animal.weight_min} - ${animal.weight_max} lbs</li>
        <li><b>Length:</b> ${animal.length_min} - ${animal.length_max} ft</li>
      </ul>
    </div>
  `;
  document.querySelector('#slides-container').appendChild(li);
}

/////////

// -- DATA --
// active_time: "Diurnal"
// animal_type: "Bird"
// diet: "Squid, crustaceans, and fish"
// geo_range: "Sub-Antarctic islands"
// habitat: "Ocean and islands"
// id: 99
// image_link: "https://upload.wikimedia.org/wikipedia/commons/b/be/SGI-2016-South_Georgia_%28Fortuna_Bay%29%E2%80%93King_penguin_%28Aptenodytes_patagonicus%29_04.jpg"
// latin_name: "Aptenodytes patagonius"
// length_max: "3.1"
// length_min: "2.8"
// lifespan: "25"
// name: "King Penguin"
// weight_max: "45"
// weight_min: "20"