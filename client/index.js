const herd = document.getElementById("herd");

function createGoatCard(goat) {

    // create a card
    const card = document.createElement("div")

    // add a relevant class
    card.classList.add("goat");

    // add some content
    // card.textContent = goat["name"]; // don't use card.innerHTML
    const header = document.createElement("h2");
    header.textContent = goat["name"];
    card.appendChild(header);

    // create element to display fav colour
    const colourBox = document.createElement("p");
    colourBox.textContent = `${["name"]}'s favourite colour is `;
    const colourName = document.createElement("span");
    colourName.textContent = goat["favColour"];
    colourName.style.color = goat["favColour"];
    colourBox.appendChild(colourName);
    card.appendChild(colourBox);

    // Customise classes
    card.classList.add(goat["age"] < 5 ? "young" : "old"); // terniary operator stmnt

    // attach it to the container
    herd.appendChild(card);

}

async function callTheHerd() {

    // Request all the goats from the API
    const res = await fetch("http://localhost:3000/goats");

    // Extracting JSON data from the response
    const data = await res.json();

    // Log them
    // console.log(data);

    // For each goat, create an HTML element (or collection of elements) and add it to the herd container

    data.forEach(g => createGoatCard(g));

}

callTheHerd();
