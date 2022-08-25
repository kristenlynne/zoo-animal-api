// Endpoints
// https://zoo-animal-api.herokuapp.com/animals/rand/10 (1-10)
// https://zoo-animal-api.herokuapp.com/animals/rand/

/* Todo 
x fetch data
x manipulate data and display in DOM
x create carousel of random animals
x refresh page for new set of random animals!
x style CSS
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
