function Wagon (capacity) {
    this.capacity = capacity;
    this.passengers = [];
}

Wagon.prototype = {
    constructor: Wagon,
    getAvailableSeatCount: function () {
        return (this.capacity - this.passengers.length);
    },
    join: function (traveler) {
        if(this.capacity > this.passengers.length){
            this.passengers.push(traveler)
        }
        return;
    },
    shouldQuarantine: function () {
        let flag = false;
        this.passengers.forEach(element => {
            if(element.isHealthy === false){
                flag = true;
            }
        });
        if(flag){
            return true;
        } else {
            return false;
        }
    },
    totalFood: function () {
        let count = 0;
        this.passengers.forEach(element => {
            count += element.food;
        });
        return count;
    }
}

function Traveler (name) {
    this.name = name;
    this.food = 1;
    this.isHealthy = true;
}

Traveler.prototype = {
    constructor: Wagon,
    hunt: function () {
        this.food += 2;
        return;
    },
    eat: function () {
        if(this.food > 0){
            this.food--;
        } else {
            this.isHealthy = false
        }
        return;
    }
}

// Create a wagon that can hold 2 people
let wagon = new Wagon(2);
// Create three travelers
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');
console.log(`${wagon.getAvailableSeatCount()} should be 2`);
wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);
wagon.join(juan);
wagon.join(maude); // There isn't room for her!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);
henrietta.hunt(); // get more food
juan.eat();
juan.eat(); // juan is now hungry (sick)
console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);