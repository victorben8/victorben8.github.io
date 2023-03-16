let game_data;
let current_room = 0;
let items_picked = [];
let command = [];


function terminalOut (info) {
let terminal = document.getElementById("terminal");

terminal.innerHTML += info;
terminal.scrollTop = terminal.scrollHeight;
}

function findDoorNumber (door) {
let doors_num = game_data.doors.length;
	
for (let i = 0; i < doors_num; i++) {
if (game_data.doors[i].id == door) {
return i;
}
}
return -1;
}

function findRoomNumber (room) {
let rooms_num = game_data.rooms.length;
	
for (let i = 0; i < rooms_num; i++) {
if (game_data.rooms[i].id == room) {
return i;
}
}
	
return -1;
}

function findItemNumber (item) {
let items_num = game_data.items.length;
	
for (let i = 0; i < items_num; i++) {
if (game_data.items[i].id == item) {
return i;
}
}
	
return -1;
}

function executeCommand () {
command = document.getElementById("commands").value.trim().split(" ");
document.getElementById("commands").value = "";
console.log(command);
	
if (command.length == 0 || command == "") {
terminalOut("<p>Escribe una instrucción</p>");
return;
}
	
if (command.length == 1) {
parseCommand(command[0]);
}
else {
parseInstruction(command);
}
}

function parseCommand (command) {
switch (command) {
	
case 'ver':
terminalOut("<p>" + game_data.rooms[current_room].description + "</p>");
break;
		
case 'ir':
			
let doors = "";
let doors_num = game_data.rooms[current_room].doors.length;
			
for (let i = 0; i < doors_num; i++) {
doors += game_data.rooms[current_room].doors[i] + " ";
}
			
terminalOut("<p>Puedes ir a: " + doors + "</p>");
			
break;
			
case 'coger':
			
let items = "";
let items_num = game_data.rooms[current_room].items.length;
			
for (let i = 0; i < items_num; i++) {
items += game_data.rooms[current_room].items[i] + " ";
}
			
terminalOut("<p>Hay : " + items + "</p>");
		
break;
			
case 'inventario':
		
let items_inventory = "";
let items_num_inventory = items_picked.length;
		
for (let i = 0; i < items_num_inventory; i++) {
items_inventory += items_picked[i] + " ";
}
			
terminalOut("<p>Tu inventario es: " + items_inventory + "</p>");
		
break;
			
default:
terminalOut("<p>Comando " + command + "no encontrado</p>");
}
}

function parseInstruction (instruction) {
switch (instruction[0]) {
		
case 'ver':
		
let item_number = findItemNumber(instruction[1]);
			
if (item_number < 0) {
terminalOut("<p>Eso " + instruction[1] + "no se encuentra aquí</p>");
return;
}
			
let item_description = game_data.items[item_number].description;
		
terminalOut("<p><strong>" + instruction[1] + ":</strong> " + item_description + "</p>");
			
break;
			
case 'ir':
			
let door_number = findDoorNumber(instruction[1]);
			
if (door_number < 0) {
return;
}
			
let room_number = findRoomNumber(game_data.doors[door_number].rooms[0]);
			
if (room_number == current_room) {
current_room = findRoomNumber(game_data.doors[door_number].rooms[1]);
}
else {
current_room = room_number;
}
			
let next_room_name = game_data.rooms[current_room].name;
			
terminalOut("<p>Pasas a " + next_room_name + "</p>");
			
break;
			
case 'coger':
			
game_data.rooms[current_room].items.forEach(function (item) {
if (item == instruction[1]) {
				
let item_num = game_data.rooms[current_room].items.indexOf(item);
					
if (item_num < 0) {
return;
}
				
item_num = findItemNumber(item);
console.log(game_data.items[item_num]);

if (game_data.items[item_num].pickable == false) {
terminalOut("<p>No cojas eso!</p>");
return;
}
					
game_data.rooms[current_room].items.forEach(item => {
if (item == instruction[1]) {
items_picked.push(game_data.rooms[current_room].items.splice(item_num, 1));
}
});
					
terminalOut("<p>Has cogido " + item + ".</p>");
return;
}
});
		
break;
			
case 'inventario':

let item_inventory_num = findItemNumber(instruction[1]);
			
if (item_inventory_num < 0) {
terminalOut("<p>No tienes eso en tu inventario.");
return;
}
			
let item_inventory_description = game_data.items[item_inventory_num].description;
			
terminalOut("<p><strong>" + instruction[1] + ":</strong> " + item_inventory_description + "</p>");
			
break;
			
default:
terminalOut("<p>Comando " + instruction[0] + "no encontrado</p>");
}
}

function game (data) {
game_data = data;
	
terminalOut("<p>¡Bienvenido a ENTIerrame! Quizás desearías no estar aquí...</p>");
terminalOut("<p>Estás en " + data.rooms[current_room].name + ". ¿Qué quieres hacer?</p>");
}

fetch("https://victorben8.github.io/game.json").then(response => response.json()).then(data => game(data));