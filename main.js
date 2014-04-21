
  


var FoodItem = function(name, calories, vegan, glutenFree, citrusFree){
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;

	return name + calories + vegan + glutenFree + citrusFree;
};

var toString = function(FoodItem){
	var v = "";
	if (FoodItem.vegan === true){
		v = 'is vegan,';
	}
	else{
		v = 'is not vegan,';
	}

	var gf = "";
	if (FoodItem.glutenFree === true){
		gf = " gluten free,"
	}
	else{
		gf= "not gluten free,"
	}

	var cf = "";
	if (FoodItem.citrusFree === true){

		cf = " and is citrus free."
	}
	else{
		cf = " and contains citrus."
	}

console.log(v);



	return FoodItem.name + " has " + FoodItem.calories + " calories " + v + gf + cf;
	}

var apple = new FoodItem('apple', 20, true, true, false);
var cottonCandy = new FoodItem ('cotton candy', 300, true, true, true);
var bagel = new FoodItem ('bagel', 100, true, false, false);
var water= new FoodItem('water',0, true, true, true);
var sugar= new FoodItem('sugar',50,true,true,true);

var Item = function(name, description, price, FoodItem) {
	this.name= name;
	this.description= description;
	this.price= price;
	this.FoodItem= FoodItem;
}
var Drink = function(name,description,price,FoodItem) {
	Item.call(this,name,description,price,FoodItem)
};
Drink.prototype = new Item();
Drink.prototype.constructor = Drink;
// var drinkInfo = function(Drink) {
// 	this.Drink = Drink;
// 	return Drink.name +" is "+Drink.description+ "and costs "+Drink.price+". It contains "+Drink.ingredients+"for ingredients."; 
// };



var Plate = function(name,description,price,FoodItem) {
	Item.call(this,name,description,price,FoodItem)
};
Plate.prototype = new Item();
Plate.prototype.constructor = Plate;
var sprite = new Drink('Sprite', 'Bubbly Goodness', 1.50, [water,sugar]);

var ribs= new Plate('Ribs','BBQ Greatness', 10, bagel);


var Order= function(orderNum, arr) {
	this.orderNum = orderNum;
	this.arr = arr;
	return orderNum+" : "+arr;
}

var firstCustomer = new Order(1,[ribs,sprite]);

var Menu = function(arr) {
	this.arr = arr;
}
var Restaurant = function (name, description, Menu) {
	this.name = name;
	this.description= description;
	this.Menu = Menu;
}

var Customer = function(vegan, glutenFree, citrusFree) {
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
}

var toStringDrink = function(Drink) {
	this.Drink = Drink;
	return Drink.name +" is "+Drink.description+ " and costs "+Drink.price+". It contains "+Drink.FoodItem[0].name+" and "+
	Drink.FoodItem[1].name+" for ingredients."; 
};
var toStringPlate = function(Plate) {
	this.Plate = Plate;
	return Plate.name +" is "+Plate.description+ " and costs "+Plate.price+". It contains "+ Plate.FoodItem.name+" for ingredients.";
};






