/*
* This function shuffle an array of string icons 
* and return the array
*/
function shuffleArray(){

  let arrayContents=[
    'fa-cat','fa-cat','fa-dove','fa-dove',
    'fa-dog','fa-dog','fa-crow','fa-crow',
    'fa-hippo','fa-hippo','fa-dragon','fa-dragon',
    'fa-fish','fa-fish','fa-horse','fa-horse'
  ]
  let currentIndex= [arrayContents.length]
  let tempoaryValue, randomIndex

  while(0 !== currentIndex){
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex = currentIndex - 1
    tempoaryValue = arrayContents[currentIndex]
    arrayContents[currentIndex] = arrayContents[randomIndex]
    arrayContents[randomIndex] = tempoaryValue

  }
  return arrayContents
}

/*
* create a 4 by 4 array, already shuffled 
* and returns it
*/

function createFourByFourArray(){

  let newShuffleArray = []

  let shuffledArray= shuffleArray()

  for(let i=0; i< shuffledArray.length; i+=4){

  newShuffleArray.push(shuffledArray.slice(i, i+4))
 
  } 

  return newShuffleArray
}

let gameInterval
let timespent

/* starts when the player click on atleast one of the cards
* Increments and update after every 1sec
*/
function startTimer(){

  let mins = 0
  let secs = 0 

   gameInterval = setInterval(function(){

    secs = parseInt(secs , 10) + 1
    mins = parseInt(mins , 10) 

    if(secs >= 60){
      mins += 1
      secs = 0

    }
    secs = secs < 10 ? "0" + secs : secs
    mins = mins < 10 ? "0" + mins : mins

    timer.innerHTML = mins + ":" + secs
    timespent = mins + ":" + secs

  }, 1000)

}

/* 
* clears the timer at the end of the game 
*/ 
function endOfGame() {
  clearInterval(gameInterval)
}


/* variables defined */
let numberOfMoves = 0
let numberOfStars = 0
let startGame = 0
let count = 0
let maxOpens = 2
let numberOfOpenCards = 0
let maxNumberOfOpenCards = 8
let firstSecondPick = []
let firstSecondPickId = []
let firstSecondparents = []


/*creates the div that is displayed when the game is over
* so the user can play again
*/
let finishedDiv = document.createElement('Div')
finishedDiv.id = "finished-div"
let timer = document.createElement('SPAN')


/* when player starts the game this methods is called. Also,
* loigc for opening and closing the mini boxes(cards)
*/
function start () {

  if(startGame === 0){
    startTimer()
    startGame++
  }

    let mainEvent = $(this).parent().attr('id')
    firstSecondparents.push(mainEvent)

    let sibling = $(this).siblings().attr('id')
    firstSecondPickId.push(sibling)

    let siblingInfo = document.getElementById(sibling).childNodes[0].innerHTML

    count++

    if (count === 1) {
      //pushes the sibling class name of the  clicked element in an array
      let changeClasses = document.getElementById(mainEvent)
      changeClasses.setAttribute('class', 'styleColWrapperFlip')
      let siblingFirstInfo = document.getElementById(sibling).childNodes[0].className
      firstSecondPick.push(siblingFirstInfo)

    }
    else if (count == 2) {
        /* pushes the sibling class name of the  
        * clicked element in an array and chececks if the element in the array are equal
        */
      let siblingSecondInfo = document.getElementById(sibling).childNodes[0].className
      firstSecondPick.push(siblingSecondInfo)
      let secondElement = firstSecondPick.pop()
      let booleanResult = firstSecondPick.includes(secondElement)

      numberOfMoves++
      /*checks if the number of times you open a card , either wrong or right and ahows the stars 
      * stars are determined based on if the number of open cards fall in those ranges below
      */
      if(numberOfMoves <= 12){
          numberOfStars = 3
      }
      else if(numberOfMoves <= 22){
        document.getElementById('full-rating1').style.display='none'
        document.getElementById('star1').style.display=''
        numberOfStars = 2
      }
      else if(numberOfMoves >= 28){
        document.getElementById('full-rating1').style.display='none'
        document.getElementById('full-rating2').style.display='none'
        document.getElementById('star1').style.display=''
        document.getElementById('star2').style.display=''
        numberOfStars = 1
      }
      document.getElementById("move").innerHTML = numberOfMoves

      if (booleanResult) {

        firstSecondPickId.forEach(theId => {
          document.getElementById(`${theId}`).style.background = 'linear-gradient(#506d71, #e86722, #8b5338)'
        })

        firstSecondparents.forEach(theParents => {
          let changeParentClasses = document.getElementById(theParents)
          changeParentClasses.setAttribute('class', 'styleColWrapperFlip')
        })

        while (firstSecondPickId.length > 0 || firstSecondPick > 0 || firstSecondparents > 0) {
          firstSecondPickId.pop()
          firstSecondPick.pop()
          firstSecondparents.pop()
        }
        count = 0
        numberOfOpenCards++
        
        /* checks the the number of open cards equals 8 
        * and call the function that ends the game 
        */
        if( maxNumberOfOpenCards === numberOfOpenCards ){
          
          endOfGame()
          completeGame()        
        }
      }
      else {

        let changeSecondParent = document.getElementById(firstSecondparents[1])
        changeSecondParent.setAttribute('class', 'styleColWrapperFlipError')

        firstSecondPickId.forEach(theId => {
        document.getElementById(`${theId}`).style.background = 'linear-gradient(red, grey)'
        let animatedMove = document.getElementById(`${theId}`)

        })

        function timer() {
  
          setTimeout(function () {
            let changeSecondParentFlip = document.getElementById(firstSecondparents[1])
            changeSecondParentFlip.setAttribute('class', 'styleColWrapperFlip2')

            let changeFirstParent = document.getElementById(firstSecondparents[0])
            changeFirstParent.setAttribute('class', 'styleColWrapperFlip2')

            while (firstSecondPickId.length > 0 || firstSecondPick > 0 || firstSecondparents > 0) {
              firstSecondPickId.pop()
              firstSecondPick.pop()
              firstSecondparents.pop()
            }
          },
          20)
        }

        timer()

        count = 0
      }
    }
}

/* When the body is loaded then this function is called 
* to create the layout for the board game
*/
function insertElements(){
  let restartButton = document.getElementById("restart").addEventListener("click", restartGame)

  timer.innerHTML = 00 + ":" + 00

  document.getElementById("timing").appendChild(timer)
 

  let main = document.createElement('Div')
  main.id = "main"

  document.getElementById('checking-main').append(main)
  
  document.getElementById('star1').style.display='none'
  document.getElementById('star2').style.display='none'
  document.getElementById('star3').style.display='none'

  document.getElementById("move").innerHTML = numberOfMoves

  let content = createFourByFourArray()

  for (let row = 0; row < content.length; row++) {

    let containerDiv = document.createElement('Div')
    containerDiv.className = "styleContainerDiv"

    document.getElementById("main") .appendChild(containerDiv)

    for (let col = 0; col < content[row].length; col++) {
    
    let colWrapper = document.createElement('Div')
    colWrapper.className = "styleColWrapper"
    colWrapper.id = `styleColWrapper${row}${col}`

    document.getElementsByClassName("styleContainerDiv")[row].appendChild(colWrapper)

    let insideBoardFront = document.createElement('Div')
    insideBoardFront.className = "styleInsideBoardFront"
    insideBoardFront.id = `styleInsideBoardFront${row}${col}`

    document.getElementsByClassName("styleContainerDiv")[row].getElementsByClassName("styleColWrapper")[col].appendChild(insideBoardFront)
    document.getElementById(insideBoardFront.id).style.background = 'linear-gradient(#d46a1e, #8e2446, #5d0019)'
    
    let insideBoardBack = document.createElement('Div')
    insideBoardBack.className = "styleInsideBoardBack"
    insideBoardBack.id = `styleInsideBoardBack${row}${col}`

    insideBoardBack.addEventListener('click', start)

    
    document.getElementsByClassName("styleContainerDiv")[row].getElementsByClassName("styleColWrapper")[col].appendChild(insideBoardBack)

    let insideBoadContent = document.createElement('I')
    insideBoadContent.className = `fas ${content[row][col]}`
    insideBoadContent.className += ' content' 

    document.getElementsByClassName("styleContainerDiv")[row].getElementsByClassName('styleInsideBoardFront')[col].appendChild(insideBoadContent)


  }

}
}

/*This function is called to 
* restart the build of the game
*/
function startAgain(){
  insertElements()
}

/*This function is called to clear the layout 
* and reset the game
*/
function restartGame(){
  document.getElementById('full-rating1').style.display=''
  document.getElementById('full-rating2').style.display=''
  document.getElementById('full-rating3').style.display=''
  document.getElementById('main').remove()
  endOfGame()
  numberOfMoves = 0
  numberOfStars = 0
  numberOfOpenCards = 0
  startGame = 0

  startAgain()

}

/* set the layout displayed when the player opens all the cards 
* and finishes the game
*/
function completeGame(){

  document.getElementById("main").style.display = "none"
  document.getElementById("star-pointId").style.display = "none"
  document.getElementById("game-titleId").style.display = "none"
  document.getElementById("checking-main").style.background = "#330424"
  document.getElementById("checking-main").style.position = "relative"
  document.getElementById("checking-main").appendChild(finishedDiv) 

  let winningMessage = document.createElement('P')
  winningMessage.id = 'winning-message'
  

  winningMessage.innerHTML = 'CONGRATULATIONS! YOU WON'
  document.getElementById("finished-div").appendChild(winningMessage)

  console.log('winning message', winningMessage)

  let timeSpent = document.createElement('P')
  timeSpent.id = 'timeSpent'

  timeSpent.innerHTML = `Time duration was : ${timespent}`
  document.getElementById("finished-div").appendChild(timeSpent)

  let subWinningMessage = document.createElement('P')
  subWinningMessage.id = 'subWinning-message'
  subWinningMessage.innerHTML = `With ${numberOfMoves} moves and ${numberOfStars} stars`
  document.getElementById("finished-div").appendChild(subWinningMessage)

  let playAgain = document.createElement("BUTTON")
  playAgain.id = 'play-again'
  playAgain.innerHTML = `Play Again`
  document.getElementById("finished-div").appendChild(playAgain)

  playAgain.addEventListener('click', clickButton)

}

// To restart the game
function  clickButton(){

    document.getElementById("star-pointId").style.display = ""
    document.getElementById("game-titleId").style.display = ""
    document.getElementById("checking-main").style.background = ""
    document.getElementById('full-rating1').style.display=''
    document.getElementById('full-rating2').style.display=''
    document.getElementById('full-rating3').style.display=''
    
    endOfGame()
    numberOfMoves = 0
    numberOfStars = 0
    numberOfOpenCards = 0
    startGame = 0

    document.getElementById('main').remove()
    document.getElementById("winning-message").remove()
    document.getElementById("subWinning-message").remove()
    document.getElementById("timeSpent").remove()
    document.getElementById("play-again").remove()
    document.getElementById("finished-div").remove()

    startAgain()

}





document.addEventListener("DOMContentLoaded", insertElements)
