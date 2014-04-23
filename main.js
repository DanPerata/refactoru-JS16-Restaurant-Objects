
  


var FoodItem = function(name, calories, vegan, glutenFree, citrusFree){
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;

	return name + calories + vegan + glutenFree + citrusFree;
};
FoodItem.prototype.constructor = FoodItem;
FoodItem.prototype.toString = function(){
	var v = "";

		v = this.vegan === true ?  "is vegan, " : 'is not vegan, ';
	
	var gf = "";

		gf = this.glutenFree === true ? 'gluten free, ' : 'not gluten free, ' ; 
	var cf = "";

		cf = this.citrusFree === true ? 'is citrus free. ' : 'and contains citrus.' ;



	return this.name + " has " + this.calories + " calories " + v + gf + cf;
	}


var Item = function(name, description, price, foodItems) {
	this.name= name;
	this.description= description;
	this.price= price;
	this.foodItems= foodItems;
}

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

Plate.prototype.dietaryCheck = function() {

	// implement every or some to evaluate the array of plates for dietary restrictions
	// v = this.foodItems == true ?  "Is suitable for vegan meals, " : 'Is not vegan, ';
	
	// return v;
	};

var Order= function(orderNum, arr) {
	this.orderNum = orderNum;
	this.arr = arr;
	// orderNum+" : "+arr;
}
Order.prototype.constructor= Order;


var Menu = function(arr) {
	this.arr = arr;
}
Menu.prototype.constructor= Menu;

var Restaurant = function (name, description, Menu) {
	this.name = name;
	this.description= description;
	this.Menu = Menu;
}
Restaurant.prototype.constructor= Restaurant;


var Customer = function(vegan, glutenFree, citrusFree) {
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
}
Customer.prototype.constructor= Customer;



Drink.prototype.toString = function () {
	return this.name +" is "+this.description+ " and costs "+this.price+". It contains "+this.FoodItem.map(getName).join(' and ')
	+" for ingredients."; 
};
Plate.prototype.toString= function() {
	return this.name +" is "+this.description+ " and costs "+this.price+". It contains "+ this.FoodItem.map(getName).join(' and ')+" for ingredients.";
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

var apple = new FoodItem('apple', 20, true, true, false);
var cottonCandy = new FoodItem ('cotton candy', 300, true, true, true);
var bagel = new FoodItem ('bagel', 100, true, false, false);
var water= new FoodItem('water',0, true, true, true);
var sugar= new FoodItem('sugar',50,true,true,true);
var sprite = new Drink('Sprite', 'Bubbly Goodness', 1.50, [water,sugar]);
var ribs= new Plate('Ribs','BBQ Greatness', 10, [bagel]);
var firstCustomer = new Order(1,[ribs,sprite]);
var bbqMenu = new Menu([ribs,sprite]);
var bbqDive = new Restaurant("The Hog Pit", "BBQ Place to Eat", bbqMenu);
var billyBob = new Customer(true,false,true);
console.log(getName(bagel));
console.log(getName(ribs));



