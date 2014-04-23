

if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(
            /\{([^{}]*)\}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
}

var FoodItem = function(name, calories, vegan, glutenFree, citrusFree){
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
};

FoodItem.prototype.create =  function(){
		return $('<div class="food-item">{name}</div>'.supplant(this));
};

FoodItem.prototype.toString = function(){
	var v = "";

		v = this.vegan === true ?  "is vegan, " : 'is not vegan, ';
	
	var gf = "";

		gf = this.glutenFree === true ? 'gluten free, ' : 'not gluten free, ' ; 
	var cf = "";

		Addcf = this.citrusFree === true ? 'is citrus free. ' : 'and contains citrus.' ;



	return this.name + " has " + this.calories + " calories " + v + gf + cf;
	}


var Item = function(name, description, price, foodItems) {
	this.name= name;
	this.description= description;
	this.price= price;
	this.foodItems= foodItems;
}
Item.prototype.create =  function(){
		return $('<div class="Item">{name}</div>'.supplant(this));
};

var getName = function(obj) {
	return obj.name;
};

var getMenu = function(obj) {
	return obj.name + " $"+obj.price;
};


var Drink = function(name,description,price,foodItems) {
	Item.call(this,name,description,price,foodItems)
};
Drink.prototype = new Item();
Drink.prototype.constructor = Drink;
// var drinkInfo = function(Drink) {
// 	this.Drink = Drink;
// 	return Drink.name +" is "+Drink.description+ "and costs "+Drink.price+". It contains "+Drink.ingredients+"for ingredients."; 
// };



var Plate = function(name,description,price,foodItems) {
	Item.call(this,name,description,price,foodItems)
};
Plate.prototype = new Item();
Plate.prototype.constructor = Plate;

Item.prototype.dietaryCheck = function(diet) {

	// implement every or some to evaluate the array of plates for dietary restrictions
	// v = this.foodItems == true ?  "Is suitable for vegan meals, " : 'Is not vegan, ';
	
	// return v;
	// this.foodItems.every(function(){
	// v =	this.vegan  ?  "Is suitable for vegan meals, " : 'Is not vegan, ';
	// return v;
// console.log('Hello',this.foodItems[0][diet], this.foodItems[1][diet], this.foodItems[2][diet]);

for (var i = 0; i < this.foodItems.length; i++) {
		this.foodItems[i]
	// v = this.foodItems[i] === true ? 'Is suitable for vegan meals' : 'Is not suitable';
	if (this.foodItems[i][diet] === true) {

	}else {
		 return "Is not suitable";
	}
	console.log (this.foodItems[i]);

};
	 return "Is suitable for " + [diet] + " meals";
	// return v;
	};

var Order= function(orderNum, arr) {
	this.orderNum = orderNum;
	this.arr = arr;
	// orderNum+" : "+arr;
}
Order.prototype.create =  function(){
		return $('<div class="Order">{name}</div>'.supplant(this));
};

var Menu = function(arr) {
	this.arr = arr;
}

Menu.prototype.create =  function(){
		return $('<div class="Menu">{name}</div>'.supplant(this));
};

var Restaurant = function (name, description, Menu) {
	this.name = name;
	this.description= description;
	this.Menu = Menu;
}
 Restaurant.prototype.create =  function(){
		return $('<header class="Restaurant">{name}</header>'.supplant(this));
};


var Customer = function(vegan, glutenFree, citrusFree) {
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
}

Customer.prototype.create =  function(){
		return $('<div class="Customer">{name}</div>'.supplant(this));
};


Drink.prototype.toString = function () {
	return this.name +" is "+this.description+ " and costs "+this.price+". It contains "+this.foodItems.map(getName).join(' and ')
	+" for ingredients."; 
};
Plate.prototype.toString= function() {
	return this.name +" is "+this.description+ " and costs "+this.price+". It contains "+ this.foodItems.map(getName).join(' and ')+" for ingredients.";
};
Order.prototype.toString = function() {
	return "This is order#"+this.orderNum+"! Placing an order for  "+this.arr.map(getName).join(' and ') +".";
};

Menu.prototype.toString = function () {
	return this.arr.map(getMenu).join('\n');
}

Restaurant.prototype.toString = function() {
	return "Welcome to the "+this.name+"! We are a "+this.description+". Please enjoy our menu items:\n "+ this.Menu;
}
Customer.prototype.toString = function() {
	var v = "";
	
	v = this.vegan === true ?  "Needs to limited to vegan selections, " : 'Doesn\'t have to be vegan, ';
	
	var gf = "";

	gf = this.glutenFree === true ? 'Needs to be limited to gluten free selections, ' : 'Doesn\'t have to be gluten free, ' ; 
	var cf = "";

	cf = this.citrusFree === true ? 'Needs to be limited to citrus free selections. ' : 'Doesn\'t have to be citrus free.' ;
	
	return "Hi, my diet: \n"+ v+'\n'+gf+'\n'+cf
}


var apple = new FoodItem('apple', 20, false, true, false);
var cottonCandy = new FoodItem ('cotton candy', 300, true, true, true);
var bagel = new FoodItem ('bagel', 100, true, false, true);
var water= new FoodItem('water',0, true, true, true);
var sugar= new FoodItem('sugar',50,true,true,true);
var tortilla = new FoodItem('tortilla', 180, true, false, true);
var beans = new FoodItem('beans', 100, true, true, true);
var avocado = new FoodItem('avocado', 90, true, true, true);
var tomato = new FoodItem('tomato', 70, true, true, true);
var tequilla = new FoodItem ('tequilla', 150, true, true, true);
var lime = new FoodItem('lime', 10, true, true, false);


var sprite = new Drink('Sprite', 'Bubbly Goodness', 1.50, [water,sugar]);
var ribs= new Plate('Ribs','BBQ Greatness', 10, [bagel]);
var spareRibs = new Plate('Spare Ribs', 'Smaller BBQ Greatness', 8.50, [bagel,cottonCandy,apple]);
var burrito = new Plate('Big Burrito', "Better than theirs", 7.50, [tortilla, beans]);
var guacamole = new Plate('Guacamole', "Green and tasty", 4.50, [avocado, tomato]);
var margarita = new Drink('Margarita', 'On the rocks', 7.50, [tequilla, lime]);

var firstCustomer = new Order(1,[ribs,sprite]);
var bbqMenu = new Menu([ribs,sprite]);
var superMenu = new Menu([ribs,spareRibs,burrito,guacamole,margarita,sprite]);
var superRest = new Restaurant("The Mexican Hog Pit","Best Place for Ribs and Burritoes", superMenu);
var bbqDive = new Restaurant("The Hog Pit", "BBQ Place to Eat", bbqMenu);
var billyBob = new Customer(true,false,true);

console.log(superMenu)



$(document).on('ready', function(){ 
	var container =  $('<div class = "container"></div>');
	$('body').append(container).append(superRest.create());
	$('body').append($('<nav id = "nav">Plates & Drinks</nav>'));

		



});
