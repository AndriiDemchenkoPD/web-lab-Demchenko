let buttons = document.querySelectorAll(".filter-btn");
let cards = document.querySelectorAll(".card");
let minRange = document.getElementById("minRange");
let maxRange = document.getElementById("maxRange");
let rangeValue = document.getElementById("rangeValue");

let selectedFilter = "all";
let minCalories = parseInt(minRange.value);
let maxCalories = parseInt(maxRange.value);

rangeValue.textContent = minCalories + " - " + maxCalories + " кКал";

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        for (let j = 0; j < buttons.length; j++) {
            buttons[j].classList.remove("active");
        }
        this.classList.add("active");
        selectedFilter = this.dataset.filter;
        filterCards();
    });
}

minRange.addEventListener("input", function() {
    minCalories = parseInt(minRange.value);
    maxCalories = parseInt(maxRange.value);
    
    if (maxCalories - minCalories < 30) {
        minCalories = maxCalories - 30;
        minRange.value = minCalories;
    }
    
    rangeValue.textContent = minCalories + " - " + maxCalories + " кКал";
    filterCards();
});

maxRange.addEventListener("input", function() {
    minCalories = parseInt(minRange.value);
    maxCalories = parseInt(maxRange.value);
    
    if (maxCalories - minCalories < 30) {
        maxCalories = minCalories + 30;
        maxRange.value = maxCalories;
    }
    
    rangeValue.textContent = minCalories + " - " + maxCalories + " кКал";
    filterCards();
});

function filterCards() {
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let cardType = card.dataset.type;
        let cardCalories = parseInt(card.dataset.calories);
        
        let typeOk = false;
        if (selectedFilter === "all") {
            typeOk = true;
        } else if (cardType === selectedFilter) {
            typeOk = true;
        }
        
        let caloriesOk = false;
        if (cardCalories >= minCalories && cardCalories <= maxCalories) {
            caloriesOk = true;
        }
        
        if (typeOk && caloriesOk) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    }
}