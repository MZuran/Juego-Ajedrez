// Function to add a specified number of new div elements with class "divv" and unique ids as children of an element with id "board"
function addRow(x) {
  var board = document.getElementById('board') // Get the element with id "board"
  for (var i = 1; i <= x; i++) {
    // Loop x number of times
    var newDiv = document.createElement('div') // Create a new div element
    newDiv.className = 'divv' // Add the class "divv" to the div element
    newDiv.id = 'row' + i // Add a unique id to the div element based on the row number
    board.appendChild(newDiv) // Add the div element as a child of the element with id "board"
  }
}

// Function to add a specified number of new li elements with class "box" and unique ids as children of each div element with class "divv"
function addColumn(x) {
  var divs = document.querySelectorAll('.divv') // Get all the div elements with class "divv"
  for (var i = 0; i < divs.length; i++) {
    // Loop through each div element
    var rowNumber = parseInt(divs[i].id.replace('row', '')) // Get the row number from the div element's id
    for (var j = 1; j <= x; j++) {
      // Loop x number of times
      var newLi = document.createElement('li') // Create a new li element
      newLi.className = 'box' // Add the class "box" to the li element
      newLi.id = 'r' + rowNumber + 'c' + j // Add a unique id to the li element based on the row and column numbers
      divs[i].appendChild(newLi) // Add the li element as a child of the current div element
    }
  }
}

function extractRowColumn(boxId) {
  // Split the box ID into row and column parts using the 'r' and 'c' characters as separators
  var parts = boxId.split('r')[1].split('c')
  var row = parseInt(parts[0]) // Convert the row part to an integer
  var col = parseInt(parts[1]) // Convert the column part to an integer
  return [row, col] // Return the row and column as an array of two integers
}

function addBackground() {
  var boxes = document.querySelectorAll('.box') // Get all the div elements with class "box"
  for (var i = 0; i < boxes.length; i++) {
    // Loop through each div element
    var newDiv = document.createElement('div') // Create a new div element

    var position = extractRowColumn(boxes[i].id)
    var sum = position[0] + position[1]

    //check if the number is even
    if (sum % 2 == 0) {
      newDiv.className = 'dark-tile tile' // Add the class "dark-tile tile" to the div element
    } else {
      //if the number is not even
      newDiv.className = 'bright-tile tile' // Add the class "bright-tile tile" to the div element
    }

    boxes[i].appendChild(newDiv) // Add the div element as a child of the current div element
  }
}

// Function to remove all child elements from each div element with class "divv"
function clearBoard() {
  var board = document.getElementById("board"); // Get the board element
  var divvs = board.querySelectorAll(".divv"); // Get all elements with the 'divv' class attached to it
  for (var i = 0; i < divvs.length; i++) {
    divvs[i].remove(); // Remove the element and all of its children
  }

  tiles = null
}

function getId(row, column) {
  return 'r' + row + 'c' + column; // Concatenate the row and column with 'r' and 'c' characters to form the box ID string
}

function spawnByRCID(row, column, piece) {
  var Id = getId(row, column)

  var div = document.getElementById(Id)
  const newChild = document.createElement('div');
  newChild.className = dict[piece] + ' piece';

  div.querySelector('.tile').appendChild(newChild);
}

function spawnByCoordinates(column, row, piece) {
  var Id = getId(row, column)

  var div = document.getElementById(Id)
  const newChild = document.createElement('div');
  newChild.className = dict[piece] + ' piece';

  div.querySelector('.tile').appendChild(newChild);
}

function makeOrange(row, column) {
  var boxId = getId(row, column); // Get the box ID using the getId() function
  var boxElement = document.getElementById(boxId); // Get the element with the box ID
  if (!boxElement) {
    //console.log("Box element doesn't exist");
    return;
  }
  var tileElement = boxElement.querySelector('.tile'); // Get the child element with the 'tile' class
  if (!tileElement) {
    //console.log("Tile element doesn't exist");
    return;
  }
  if (checkForWallTile(row, column)) {
    return;
  }
  tileElement.classList.add('orange-tile'); // Add the 'orange-tile' class to the 'tile' element
}

function makeGreen(row, column) {
  var boxId = getId(row, column); // Get the box ID using the getId() function
  var boxElement = document.getElementById(boxId); // Get the element with the box ID
  var tileElement = boxElement.querySelector('.tile'); // Get the child element with the 'tile' class
  tileElement.classList.add('green-tile'); // Add the 'green-tile' class to the 'tile' element
}

function makeWall(row, column) {
  var boxId = getId(row, column);
  var boxElement = document.getElementById(boxId);
  var tileElement = boxElement.querySelector('.tile');
  tileElement.classList.replace(tileElement.classList[0], 'wall-tile');
}

function makeMoat(row, column) {
  var boxId = getId(row, column); // Get the box ID using the getId() function
  var boxElement = document.getElementById(boxId); // Get the element with the box ID
  var tileElement = boxElement.querySelector('.tile'); // Get the child element with the 'tile' class
  
  var moatElement = document.createElement('div'); // Create a new div element
  moatElement.classList.add('moat', 'obstacle'); // Add the 'moat' and 'obstacle' classes to the new div element
  tileElement.appendChild(moatElement); // Add the new div element to the 'tile' element
}

function removeColors() {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.classList.remove('orange-tile', 'green-tile');
  });
}

function checkForObstacle(row, column) {
  const boxId = getId(row, column);
  const element = document.getElementById(boxId);
  const tileElement = element.querySelector(".tile");
  const obstacleElement = tileElement.querySelector(".obstacle");
  if (!obstacleElement) {
    return false;
  }
  return obstacleElement.classList.item(0);
}

function checkForColor(row, column) {
  var id = getId(row, column);
  var element = document.getElementById(id);
  if (!element) {
      //console.log(`Element with id ${id} does not exist`);
      return 3;
  }
  var tile = element.getElementsByClassName('tile')[0];
  if (!tile) {
      //console.log(`Tile element not found in ${id}`);
      return 3;
  }
  if (checkForWallTile(row, column)) {
    //console.log('Returned Wall')
    return 'wall';
  }
  if (checkForObstacle(row, column)) {
    //console.log('Returned Obstacle')
    return checkForObstacle(row, column);
  }
  var piece = tile.getElementsByClassName('piece')[0];
  if (!piece) {
      return 0;
  }
  var classes = piece.className.split(' ');
  var color = classes[0].split('-');

  if (color[0] == 'white') {
      return 1;
  } else if (color[0] == 'black') {
      return 2;
  } 
  return 3;
}


function checkForPiece(row, column) {
  var id = getId(row, column);
  var element = document.getElementById(id);
  if (!element) {
      //console.log(`Element with id ${id} does not exist`);
      return null;
  }
  var tile = element.getElementsByClassName('tile')[0];
  if (!tile) {
      //console.log(`Tile element not found in ${id}`);
      return null;
  }
  var piece = tile.getElementsByClassName('piece')[0];
  if (!piece) {
      return false;
  }
  return true;
}

function getTypeValue(classType) {
  for (let key in dict) {
    if (dict[key] === classType) {
      return parseInt(key);
    }
  }
  return null;
}

function checkForOrangeTile(row, column) {
  var id = getId(row, column);
  var element = document.getElementById(id);
  var tile = element.querySelector('.tile');

  if (tile.classList.contains('orange-tile')) {
    return true;
  } else {
    return false;
  }
}

function checkForWallTile(row, column) {
  var id = getId(row, column);
  var element = document.getElementById(id);
  var tile = element.querySelector('.tile');

  if (tile.classList.contains('wall-tile')) {
    return true;
  } else {
    return false;
  }
}

function checkForGreenTile(row, column) {
  var id = getId(row, column);
  var tileElement = document.getElementById(id).getElementsByClassName('tile')[0];
  if (tileElement.classList.contains('green-tile')) {
    return true;
  } else {
    return false;
  }
}

function movePiece(selectedPiece, row, column) {
  removeChild(selectedPiece.id)

  const id = getId(row, column);
  const tile = document.querySelector(`#${id} .tile`);
  const piece = tile.querySelector(".piece");
  
  if (piece) {
    console.log(piece.classList);
    console.log('Captured!')
    piece.setAttribute("class", selectedPiece.classes);

    if (checkForObstacle(row,column) == 'moat') {
      console.log('Both Pieces Sunk')
      piece.remove()
    }

  } else {
    const newPiece = document.createElement("div");
    newPiece.setAttribute("class", selectedPiece.classes);
    tile.appendChild(newPiece);
  }
}

/*function removeChild(id) {
  const element = document.getElementById(id);
  const tileElement = element.querySelector(".tile");
  while (tileElement.firstChild) {
    tileElement.removeChild(tileElement.firstChild);
  }
}*/

function removeChild(id) {
  const element = document.getElementById(id);
  const pieceElement = element.querySelector(".piece");
  if (pieceElement) {
    pieceElement.parentNode.removeChild(pieceElement);
  }
}

function sumCoordinates(array1, array2, times) {
  if (times) {
    array2 = [array2[0] * times, array2[1] * times];
  }
  return [array1[0] + array2[0], array1[1] + array2[1]];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}