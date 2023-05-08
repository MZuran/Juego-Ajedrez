var dict = {
  //odd numbers will always be white pieces
  //even numbers will always be black pieces
  0: 'empty',
  1: 'white-pawn',
  2: 'black-pawn',
  3: 'white-rook',
  4: 'black-rook',
  5: 'white-bishop',
  6: 'black-bishop',
  7: 'white-queen',
  8: 'black-queen',
  9: 'white-knight',
  10: 'black-knight',
  11: 'white-king',
  12: 'black-king',
}

var selectedPiece = null
function moveOptions(classes, id, coordinates) {
  /*console.log('Clicked on a piece inside a tile');
    console.log("I'm a " + classes[0] + " " + classes[1])
    console.log("My grandparent's id is " + id + " and i'm at " + coordinates[1] + " " + coordinates[0])*/
  //1 Always means white. 2 Always means black.

  switch (classes[0]) {
    case dict[1]: //white pawns
      pawnLogic(classes, id, coordinates, 1)
      break

    case dict[2]: //black pawns
      pawnLogic(classes, id, coordinates, 2)
      break

    case dict[3]: //white rooks
      rookLogic(classes, id, coordinates, 1)
      break

    case dict[4]: //black rooks
      rookLogic(classes, id, coordinates, 2)
      break

    case dict[5]: //white bishops
      bishopLogic(classes, id, coordinates, 1)
      break

    case dict[6]: //black bishops
      bishopLogic(classes, id, coordinates, 2)
      break

    case dict[7]: //white queen
      queenLogic(classes, id, coordinates, 1)
      break

    case dict[8]: //black queen
      queenLogic(classes, id, coordinates, 2)
      break

    case dict[9]: //white knights
      knightLogic(classes, id, coordinates, 1)
      break

    case dict[10]: //black knigths
      knightLogic(classes, id, coordinates, 2)
      break

    case dict[11]: //white king
      kingLogic(classes, id, coordinates, 1)
      break

    case dict[12]: //black king
      kingLogic(classes, id, coordinates, 2)
      break
  }
}

//Here's where the logic for each piece starts
//Warning: Spaghetti code

function pawnLogic(classes, id, coordinates, color) {
  //rowNumber
  //columnNumber

  //When it comes to color: 1 Always means white. 2 Always means black.

  //Make the piece's own square green
  makeGreen(coordinates[0], coordinates[1])

  //Declaration of direction and start variables
  var direction = 1
  var start = false

  //If it's black, go the other way
  if (color == 2) {
    direction = -1

    //Check if Black Pieces are at the start position
    if (coordinates[0] == 2) {
      start = true
    }
  }

  //Check if White Pieces are at the start position
  if (color == 1) {
    if (coordinates[0] == rowNumber - 1) {
      start = true
    }
  }

  //Check if square forwards is free
  if (!checkForColor(coordinates[0] - 1 * direction, coordinates[1]) || checkForColor(coordinates[0] - 1 * direction, coordinates[1]) == 'moat') {
    makeOrange(coordinates[0] - 1 * direction, coordinates[1])

    //If in start position, check if square 2 spaces forwards is free
    if (
      start &&
      !checkForColor(coordinates[0] - 2 * direction, coordinates[1])
    ) {
      makeOrange(coordinates[0] - 2 * direction, coordinates[1])
    }
  }

  //Check if you can capture an enemy piece one space forwards and one space to the right
  if (
    checkForColor(coordinates[0] - 1 * direction, coordinates[1] + 1) !=
      color &&
    checkForPiece(coordinates[0] - 1 * direction, coordinates[1] + 1)
  ) {
    //console.log("I can capture!")
    makeOrange(coordinates[0] - 1 * direction, coordinates[1] + 1)
  }

  //Check if you can capture an enemy piece one space forwards and one space to the left
  if (
    checkForColor(coordinates[0] - 1 * direction, coordinates[1] - 1) !=
      color &&
    checkForPiece(coordinates[0] - 1 * direction, coordinates[1] - 1)
  ) {
    //console.log("I can capture!")
    makeOrange(coordinates[0] - 1 * direction, coordinates[1] - 1)
  }
}

function rookLogic(classes, id, coordinates, color) {
  //rowNumber
  //columnNumber

  //When it comes to color: 1 Always means white. 2 Always means black.

  //Make the piece's own square green
  makeGreen(coordinates[0], coordinates[1])

  var left = [0, -1]
  var right = [0, 1]
  var up = [-1, 0]
  var down = [1, 0]

  //sumCoordinates (array1, array2, multiplication of array2)

  //Check if squares forwards are free
  var forwards = 1
  var above = sumCoordinates(coordinates, up, forwards)
  var below = sumCoordinates(coordinates, down, forwards)
  var leftmost = sumCoordinates(coordinates, left, forwards)
  var rightmost = sumCoordinates(coordinates, right, forwards)

  //Checking Above
  while (!checkForColor(above[0], above[1])) {
    makeOrange(above[0], above[1])

    forwards = forwards + 1
    above = sumCoordinates(coordinates, up, forwards)
  }
  if (checkForColor(above[0], above[1]) != color) {
    makeOrange(above[0], above[1])
  }

  //Checking Below
  forwards = 1
  while (!checkForColor(below[0], below[1])) {
    makeOrange(below[0], below[1])

    forwards = forwards + 1
    below = sumCoordinates(coordinates, down, forwards)
  }
  if (checkForColor(below[0], below[1]) != color) {
    makeOrange(below[0], below[1])
  }

  //Checking Right
  forwards = 1
  while (!checkForColor(rightmost[0], rightmost[1])) {
    makeOrange(rightmost[0], rightmost[1])

    forwards = forwards + 1
    rightmost = sumCoordinates(coordinates, right, forwards)
  }
  if (checkForColor(rightmost[0], rightmost[1]) != color) {
    makeOrange(rightmost[0], rightmost[1])
  }

  //Checking Left
  forwards = 1
  while (!checkForColor(leftmost[0], leftmost[1])) {
    makeOrange(leftmost[0], leftmost[1])

    forwards = forwards + 1
    leftmost = sumCoordinates(coordinates, left, forwards)
  }
  if (checkForColor(leftmost[0], leftmost[1]) != color) {
    makeOrange(leftmost[0], leftmost[1])
  }
}

function bishopLogic(classes, id, coordinates, color) {
  //rowNumber
  //columnNumber

  //When it comes to color: 1 Always means white. 2 Always means black.

  //Make the piece's own square green
  makeGreen(coordinates[0], coordinates[1])

  var diagonal3 = [-1, -1]
  var diagonal4 = [-1, 1]
  var diagonal1 = [1, -1]
  var diagonal2 = [1, 1]

  //sumCoordinates (array1, array2, multiplication of array2)

  //Check if squares forwards are free
  var forwards = 1
  var diagonal1most = sumCoordinates(coordinates, diagonal1, forwards)
  var diagonal2most = sumCoordinates(coordinates, diagonal2, forwards)
  var diagonal3most = sumCoordinates(coordinates, diagonal3, forwards)
  var diagonal4most = sumCoordinates(coordinates, diagonal4, forwards)

  while (!checkForColor(diagonal1most[0], diagonal1most[1])) {
    makeOrange(diagonal1most[0], diagonal1most[1])

    forwards = forwards + 1
    diagonal1most = sumCoordinates(coordinates, diagonal1, forwards)
  }
  if (checkForColor(diagonal1most[0], diagonal1most[1]) != color) {
    makeOrange(diagonal1most[0], diagonal1most[1])
  }

  forwards = 1

  while (!checkForColor(diagonal2most[0], diagonal2most[1])) {
    makeOrange(diagonal2most[0], diagonal2most[1])

    forwards = forwards + 1
    diagonal2most = sumCoordinates(coordinates, diagonal2, forwards)
  }
  if (checkForColor(diagonal2most[0], diagonal2most[1]) != color) {
    makeOrange(diagonal2most[0], diagonal2most[1])
  }

  forwards = 1

  while (!checkForColor(diagonal4most[0], diagonal4most[1])) {
    makeOrange(diagonal4most[0], diagonal4most[1])

    forwards = forwards + 1
    diagonal4most = sumCoordinates(coordinates, diagonal4, forwards)
  }
  if (checkForColor(diagonal4most[0], diagonal4most[1]) != color) {
    makeOrange(diagonal4most[0], diagonal4most[1])
  }

  forwards = 1

  while (!checkForColor(diagonal3most[0], diagonal3most[1])) {
    makeOrange(diagonal3most[0], diagonal3most[1])

    forwards = forwards + 1
    diagonal3most = sumCoordinates(coordinates, diagonal3, forwards)
  }
  if (checkForColor(diagonal3most[0], diagonal3most[1]) != color) {
    makeOrange(diagonal3most[0], diagonal3most[1])
  }
}

function queenLogic(classes, id, coordinates, color) {
  rookLogic(classes, id, coordinates, color)
  bishopLogic(classes, id, coordinates, color)
}

function knightLogic(classes, id, coordinates, color) {
  //rowNumber
  //columnNumber

  //When it comes to color: 1 Always means white. 2 Always means black.

  //Make the piece's own square green
  makeGreen(coordinates[0], coordinates[1])

  if (checkForColor(coordinates[0] + 2, coordinates[1] + 1) != color) {
    makeOrange(coordinates[0] + 2, coordinates[1] + 1)
  }
  if (checkForColor(coordinates[0] - 2, coordinates[1] + 1) != color) {
    makeOrange(coordinates[0] - 2, coordinates[1] + 1)
  }
  if (checkForColor(coordinates[0] - 2, coordinates[1] - 1) != color) {
    makeOrange(coordinates[0] - 2, coordinates[1] - 1)
  }
  if (checkForColor(coordinates[0] + 2, coordinates[1] - 1) != color) {
    makeOrange(coordinates[0] + 2, coordinates[1] - 1)
  }

  if (checkForColor(coordinates[0] + 1, coordinates[1] + 2) != color) {
    makeOrange(coordinates[0] + 1, coordinates[1] + 2)
  }
  if (checkForColor(coordinates[0] - 1, coordinates[1] + 2) != color) {
    makeOrange(coordinates[0] - 1, coordinates[1] + 2)
  }
  if (checkForColor(coordinates[0] + 1, coordinates[1] - 2) != color) {
    makeOrange(coordinates[0] + 1, coordinates[1] - 2)
  }
  if (checkForColor(coordinates[0] - 1, coordinates[1] - 2) != color) {
    makeOrange(coordinates[0] - 1, coordinates[1] - 2)
  }
}

function kingLogic(classes, id, coordinates, color) {
  //rowNumber
  //columnNumber

  //When it comes to color: 1 Always means white. 2 Always means black.

  //Make the piece's own square green
  makeGreen(coordinates[0], coordinates[1])

  var left = [0, -1]
  var right = [0, 1]
  var up = [-1, 0]
  var down = [1, 0]
  var diagonal3 = [-1, -1]
  var diagonal4 = [-1, 1]
  var diagonal1 = [1, -1]
  var diagonal2 = [1, 1]

  var directions = [
    up,
    down,
    left,
    right,
    diagonal1,
    diagonal2,
    diagonal3,
    diagonal4,
  ]

  for (var i = 0; i < 8; i++) {
    if (
      checkForColor(
        sumCoordinates(directions[i], coordinates)[0],
        sumCoordinates(directions[i], coordinates)[1],
      ) != color
    ) {
      makeOrange(
        sumCoordinates(directions[i], coordinates)[0],
        sumCoordinates(directions[i], coordinates)[1],
      )
    }
  }

  console.log(sumCoordinates(directions[0], coordinates))
}
