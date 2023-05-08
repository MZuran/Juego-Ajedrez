/* ----------------------------------------------------------------------------------------------------------------------------------*/
var boardSize = elongatedBoard(0, 0)

var rowNumber = boardSize[0]
var columnNumber = boardSize[1]

var tiles = document.querySelectorAll('.tile')

var selectedPiece = {
  id: '',
  classes: '',
  coordinates: [],
}

function addAllTheEventListenersToTiles(tiles) {
  // Loop through all tile elements and attach event listeners to them
  tiles.forEach((tile) => {
    tile.addEventListener('click', (event) => {
      //If the user clicks on a blank square without any pieces
      if (
        !event.target.classList.contains('orange-tile') &&
        !event.target.classList.contains('green-tile') &&
        !event.target.classList.contains('piece')
      ) {
        removeColors()
      }

      if (event.target.classList.contains('orange-tile')) {
        var coordinates = extractRowColumn(event.target.parentElement.id)
        movePiece(selectedPiece, coordinates[0], coordinates[1])
        removeColors()

        const hasMoat = event.target.querySelector('.moat') !== null
        if (hasMoat) {
          console.log('moved onto a moat!')
        }
      }

      //If the user clicks on a square with a piece
      if (event.target.classList.contains('piece')) {
        // Do something with the clicked piece element inside a tile
        var classes = event.target.classList
        var id = tile.parentElement.id
        var coordinates = extractRowColumn(id)

        //console.log(coordinates)

        //If the Square the clicked piece is on is orange
        if (checkForOrangeTile(coordinates[0], coordinates[1])) {
          //Do something If the Square the clicked piece is on is orange
          movePiece(selectedPiece, coordinates[0], coordinates[1])
          removeColors()
        } else if (checkForGreenTile(coordinates[0], coordinates[1])) {
          //If the Square the clicked piece is on isn't orange but it's on green instead
          removeColors()
        } else {
          //If the Square the clicked piece is in neither orange nor green
          selectedPiece.id = id
          selectedPiece.classes = classes
          selectedPiece.coordinates = coordinates

          //console.log(selectedPiece.classes[1])

          removeColors()
          moveOptions(classes, id, coordinates)
        }
      }
    })
  })
}
