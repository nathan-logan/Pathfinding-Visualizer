import Board from './components/board';
import astar from './algorithms/astar';

// instantiate a new board
const pathfindingBoard = new Board(25, 25);

// initialise the board in the dom
$(window.document).ready(() => pathfindingBoard.createGrid())

$("button#startPathfinding").click(() => {

    const { startPoint, targetPoint, nodes, boardArray } = pathfindingBoard

    // execute the algorithm
    astar(nodes, startPoint, targetPoint, boardArray)
})

$("button#drawWalls").click(() => {
    $("button#drawWalls").toggleClass("active");
    pathfindingBoard.enableDrawing();
})

$("#newStartingNode").click(() => {
    $("#newStartingNode").toggleClass("active");
    pathfindingBoard.newStartingNode();
})

$("#newEndingNode").click(() => {
    $("#newEndingNode").toggleClass("active");
    pathfindingBoard.newEndingNode();
})