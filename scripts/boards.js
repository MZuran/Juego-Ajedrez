function originalBoard() {
  clearBoard()
  rowNumber = 8
  columnNumber = 8

  addRow(rowNumber)
  addColumn(columnNumber)
  addBackground()

  spawnByCoordinates(3, 7, 1)
  spawnByCoordinates(2, 7, 1)
  spawnByCoordinates(1, 7, 1)
  spawnByCoordinates(4, 7, 1)
  spawnByCoordinates(5, 7, 1)
  spawnByCoordinates(6, 7, 1)
  spawnByCoordinates(7, 7, 1)
  spawnByCoordinates(8, 7, 1)

  spawnByCoordinates(3, 2, 2)
  spawnByCoordinates(2, 2, 2)
  spawnByCoordinates(1, 2, 2)
  spawnByCoordinates(4, 2, 2)
  spawnByCoordinates(5, 2, 2)
  spawnByCoordinates(6, 2, 2)
  spawnByCoordinates(7, 2, 2)
  spawnByCoordinates(8, 2, 2)

  spawnByCoordinates(1, 1, 4)
  spawnByCoordinates(1, 8, 3)
  spawnByCoordinates(8, 1, 4)
  spawnByCoordinates(8, 8, 3)

  spawnByCoordinates(3, 8, 5)
  spawnByCoordinates(6, 8, 5)
  spawnByCoordinates(3, 1, 6)
  spawnByCoordinates(6, 1, 6)

  spawnByCoordinates(4, 8, 7)
  spawnByCoordinates(4, 1, 8)

  spawnByCoordinates(2, 1, 10)
  spawnByCoordinates(7, 1, 10)
  spawnByCoordinates(2, 8, 9)
  spawnByCoordinates(7, 8, 9)

  spawnByCoordinates(5, 8, 11)
  spawnByCoordinates(5, 1, 12)

  tiles = document.querySelectorAll('.tile')
  addAllTheEventListenersToTiles()
  return [rowNumber, columnNumber]
}

function elongatedBoardRandomizer(size, size2) {
  clearBoard()
  if (!size) {
    size = 0
  }
  if (!size2) {
    size2 = 0
  }

  rowNumber = 8 + size
  columnNumber = 8 + size2

  //check if the number is even
  if (size2 % 2 == 0) {
    size2 = size2 / 2
  } else {
    //if the number is not even
    size2 = (size2 - 1) / 2
  }

  addRow(rowNumber)
  addColumn(columnNumber)
  addBackground()

  var numberArray = [1, 2, 3, 4, 5, 6, 7, 8]
  var scrambledArray = shuffleArray(numberArray)

  //Pawns
  spawnByCoordinates(3 + size2, 7 + size, 1)
  spawnByCoordinates(2 + size2, 7 + size, 1)
  spawnByCoordinates(1 + size2, 7 + size, 1)
  spawnByCoordinates(4 + size2, 7 + size, 1)
  spawnByCoordinates(5 + size2, 7 + size, 1)
  spawnByCoordinates(6 + size2, 7 + size, 1)
  spawnByCoordinates(7 + size2, 7 + size, 1)
  spawnByCoordinates(8 + size2, 7 + size, 1)

  //Pawns
  spawnByCoordinates(3 + size2, 2, 2)
  spawnByCoordinates(2 + size2, 2, 2)
  spawnByCoordinates(1 + size2, 2, 2)
  spawnByCoordinates(4 + size2, 2, 2)
  spawnByCoordinates(5 + size2, 2, 2)
  spawnByCoordinates(6 + size2, 2, 2)
  spawnByCoordinates(7 + size2, 2, 2)
  spawnByCoordinates(8 + size2, 2, 2)

  spawnByCoordinates(scrambledArray[0] + size2, 1, 4)
  spawnByCoordinates(scrambledArray[0] + size2, 8 + size, 3)
  spawnByCoordinates(scrambledArray[7] + size2, 1, 4)
  spawnByCoordinates(scrambledArray[7] + size2, 8 + size, 3)

  spawnByCoordinates(scrambledArray[2] + size2, 8 + size, 5)
  spawnByCoordinates(scrambledArray[5] + size2, 8 + size, 5)
  spawnByCoordinates(scrambledArray[2] + size2, 1, 6)
  spawnByCoordinates(scrambledArray[5] + size2, 1, 6)

  spawnByCoordinates(scrambledArray[3] + size2, 8 + size, 7)
  spawnByCoordinates(scrambledArray[3] + size2, 1, 8)

  spawnByCoordinates(scrambledArray[1] + size2, 1, 10)
  spawnByCoordinates(scrambledArray[6] + size2, 1, 10)
  spawnByCoordinates(scrambledArray[1] + size2, 8 + size, 9)
  spawnByCoordinates(scrambledArray[6] + size2, 8 + size, 9)

  spawnByCoordinates(scrambledArray[4] + size2, 8 + size, 11)
  spawnByCoordinates(scrambledArray[4] + size2, 1, 12)

  tiles = document.querySelectorAll('.tile')
  addAllTheEventListenersToTiles()
  return [rowNumber, columnNumber]
}

function elongatedBoard(size, size2) {
  clearBoard()
  if (!size) {
    size = 0
  }
  if (!size2) {
    size2 = 0
  }

  rowNumber = 8 + size
  columnNumber = 8 + size2

  //check if the number is even
  if (size2 % 2 == 0) {
    size2 = size2 / 2
  } else {
    //if the number is not even
    size2 = (size2 - 1) / 2
  }

  addRow(rowNumber)
  addColumn(columnNumber)
  addBackground()

  spawnByCoordinates(3 + size2, 7 + size, 1)
  spawnByCoordinates(2 + size2, 7 + size, 1)
  spawnByCoordinates(1 + size2, 7 + size, 1)
  spawnByCoordinates(4 + size2, 7 + size, 1)
  spawnByCoordinates(5 + size2, 7 + size, 1)
  spawnByCoordinates(6 + size2, 7 + size, 1)
  spawnByCoordinates(7 + size2, 7 + size, 1)
  spawnByCoordinates(8 + size2, 7 + size, 1)

  spawnByCoordinates(3 + size2, 2, 2)
  spawnByCoordinates(2 + size2, 2, 2)
  spawnByCoordinates(1 + size2, 2, 2)
  spawnByCoordinates(4 + size2, 2, 2)
  spawnByCoordinates(5 + size2, 2, 2)
  spawnByCoordinates(6 + size2, 2, 2)
  spawnByCoordinates(7 + size2, 2, 2)
  spawnByCoordinates(8 + size2, 2, 2)

  spawnByCoordinates(1 + size2, 1, 4)
  spawnByCoordinates(1 + size2, 8 + size, 3)
  spawnByCoordinates(8 + size2, 1, 4)
  spawnByCoordinates(8 + size2, 8 + size, 3)

  spawnByCoordinates(3 + size2, 8 + size, 5)
  spawnByCoordinates(6 + size2, 8 + size, 5)
  spawnByCoordinates(3 + size2, 1, 6)
  spawnByCoordinates(6 + size2, 1, 6)

  spawnByCoordinates(4 + size2, 8 + size, 7)
  spawnByCoordinates(4 + size2, 1, 8)

  spawnByCoordinates(2 + size2, 1, 10)
  spawnByCoordinates(7 + size2, 1, 10)
  spawnByCoordinates(2 + size2, 8 + size, 9)
  spawnByCoordinates(7 + size2, 8 + size, 9)

  spawnByCoordinates(5 + size2, 8 + size, 11)
  spawnByCoordinates(5 + size2, 1, 12)

  tiles = document.querySelectorAll('.tile')
  addAllTheEventListenersToTiles(tiles)
  return [rowNumber, columnNumber]
}

function moatBoard() {
  elongatedBoard(1)

  makeMoat(5,1)
  makeMoat(5,2)
  makeMoat(5,3)
  makeMoat(5,4)
  makeMoat(5,5)
  makeMoat(5,6)
  makeMoat(5,7)
  makeMoat(5,8)
}