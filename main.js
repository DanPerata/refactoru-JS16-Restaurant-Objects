
// Function to use supplant in program
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




// All constructors and superclasses
var FoodItem = function(name, calories, vegan, glutenFree, citrusFree){
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
};
var Item = function(name, description, price, foodItems) {
	this.name= name;
	this.description= description;
	this.price= price;
	this.foodItems= foodItems;
	// sets display to null to create a reference in the DOM
	this.display= null;
}
var Drink = function(name,description,price,foodItems) {
	Item.call(this,name,description,price,foodItems)
};

Drink.prototype = new Item();
Drink.prototype.constructor = Drink;
var Plate = function(name,description,price,foodItems) {
	Item.call(this,name,description,price,foodItems)
};

Plate.prototype = new Item();
Plate.prototype.constructor = Plate;
var Menu = function(arr) {
	this.arr = arr;
}

var Order= function(orderNum, arr) {
	this.orderNum = orderNum;
	this.arr = arr;
	// orderNum+" : "+arr;
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


// ---------- Prototype methods-----------------------------
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



Item.prototype.create =  function(){
		// creates an Item with a direct reference to itself that can be manipulated by the DOM
		this.display= $('<li class="Item"><span class= "itemName">{name}</span>   $<span class= "itemPrice">{price}</span></li>'.supplant(this));
		return this.display;
};

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

			}
			else {
				 return "Is not suitable";
			}
			console.log (this.foodItems[i]);

		};
		// On dietary check pass, add that diet as a class to the Item
			// Use find to select the child of Item and add the class of diet to it
			this.display.find('.itemName').addClass(diet);
			 return "Is suitable for " + [diet] + " meals";
			// return v;
};






// var drinkInfo = function(Drink) {
// 	this.Drink = Drink;
// 	return Drink.name +" is "+Drink.description+ "and costs "+Drink.price+". It contains "+Drink.ingredients+"for ingredients."; 
// };







Order.prototype.create =  function(){
		return $('<div class="Order">{name}</div>'.supplant(this));
};


Menu.prototype.create =  function(){
		return $('<div class="Menu">{name}</div>'.supplant(this));
};


 Restaurant.prototype.create =  function(){
		return $('<header class="Restaurant">{name}</header>'.supplant(this));
};




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

Menu.prototype.menuCheck = function(diet) {


		var suitableItems= [];
		
		for (var i = 0; i < this.arr.length; i++) {
				var menuItems = this.arr[i]
				console.log(menuItems);

				// menuItems.dietaryCheck(diet);
				console.log(menuItems.dietaryCheck(diet));
			// if( )
			// suitableItems;
			// console.log (suitableItems);

		};
		// 	 return suitableItems;
		// 	// return v;
};


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

// ------------------------------Functions----------------------------------
var getName = function(obj) {
	return obj.name;
};

var getMenu = function(obj) {
	return obj.name + " $"+obj.price;
};

// 1. on page load, run a function that loops through the li Items on the page
	var itemLoop = function (arr) {
		var allItems = [];

		console.log(arr);
		for (var i = 0; i < arr.length; i++) {
			var results = allItems.push(arr[i]);
			console.log(arr.length);
		};
		console.log(allItems);
		// return results;
	};

	var foodCheck = function (){
		superMenu.menuCheck('vegan')
	superMenu.menuCheck('glutenFree')
	superMenu.menuCheck('citrusFree')

};


// 2. It needs to run .dietaryCheck on each Item for each dietary restriction 
	// superMenu.filter(dietaryCheck(vegan))
// 3. On a passing evalualtion it pushes that Item to that specific array (ie, veganArray, gfArray, cfArray)
// 4. On click of a button, it hides the li Items not in the array 





// -------------------------------------Varibles------------------------------------------------------
var apple = new FoodItem('apple', 20, true, true, true);
var sauce = new FoodItem ('sauce', 300, true, true, false);
var beef = new FoodItem ('beef', 100, false, true, true);
var water= new FoodItem('water',0, true, true, true);
var sugar= new FoodItem('sugar',50,true,true,true);
var tortilla = new FoodItem('tortilla', 180, true, false, true);
var beans = new FoodItem('beans', 100, true, true, true);
var avocado = new FoodItem('avocado', 90, true, true, true);
var tomato = new FoodItem('tomato', 70, true, true, true);
var tequilla = new FoodItem ('tequilla', 150, true, true, true);
var lime = new FoodItem('lime', 10, true, true, false);


var sprite = new Drink('Sprite', 'Bubbly Goodness', 1.50, [water,sugar]);
var ribs= new Plate('Ribs','BBQ Greatness', 10, [beef]);
var spareRibs = new Plate('Spare Ribs', 'Smaller BBQ Greatness', 8.50, [beef,sauce,apple]);
var burrito = new Plate('Big Burrito', "Better than theirs", 7.50, [tortilla, beans]);
var guacamole = new Plate('Guacamole', "Green and tasty", 4.50, [avocado, tomato]);
var margarita = new Drink('Margarita', 'On the rocks', 7.50, [tequilla, lime]);

var firstCustomer = new Order(1,[ribs,sprite]);
var bbqMenu = new Menu([ribs,sprite]);
var superMenu = new Menu([ribs,spareRibs,burrito,guacamole,margarita,sprite]);
var superRest = new Restaurant("The Mexican Hog Pit","Best Place for Ribs and Burritoes", superMenu);
var bbqDive = new Restaurant("The Hog Pit", "BBQ Place to Eat", bbqMenu);
var billyBob = new Customer(true,false,true);




$(document).on('ready', function(){ 
	


$('#entrees').append(ribs.create());
$('#entrees').append(spareRibs.create());
$('#entrees').append(burrito.create());
$('#entrees').append(guacamole.create());


$('#drinks').append(margarita.create());
$('#drinks').append(sprite.create());
foodCheck();

// On click of a diet button, add highlight to every Item with that diet class
$('.nav').on('click','.button',function(){
	var btnSelector = $('.'+$(this).attr('data-class'));
// $('.'+$(this).attr('data-class')).removeClass('highlight');
$('.itemName').removeClass('highlight');
	console.log($(this).attr('data-class'));
	// if (btnSelector === true) {
	// btnSelector.addClass('highlight')
	// if ($('.vegan') === true) {
	btnSelector.addClass('highlight');
	// };
});

		// var btnSelector = this.display.itemName.vegan;
// $('.'+$(this).attr('data-class')).toggleClass('highlight');
// $('#button1').on('click' function(){

// })
});
