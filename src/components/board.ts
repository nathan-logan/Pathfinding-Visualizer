import TileNode from './tileNode'
import getManhattanDistance from '../helpers/getManhattanDistance';

class Board {
    height: number;
    width: number;
    startPoint: TileNode;
    targetPoint: TileNode;
    walls: number[][];
    nodes: TileNode[];
    boardArray: string[];
    drawingEnabled: boolean = false;
    mouseDown: boolean = false;
    newStartNode: boolean = false;
    newEndNode: boolean = false;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.boardArray = [];
        this.nodes = [];
    }

    createGrid = () => {
        let tableRows = '';
        for (let r = 0; r < this.height; r++) {
            const currentRowArray = []
            let currentTableRow = `<div class="row ${r}">`;
            for (let c = 0; c < this.width; c++) {
                const newNode = new TileNode();
                newNode.id = `${r}-${c}`;
                // set the coordinates of the node
                newNode.posX = c;
                newNode.posY = r;
                newNode.wall = false;
                if (r === Math.floor(this.height / 2) && c === Math.floor(this.width / 4)) {
                    newNode.class = "start unsolved";
                    newNode.type = "start";
                    this.startPoint = newNode;
                } else if (r === Math.floor(this.height / 2) && c === Math.floor(3 * this.width / 4)) {
                    newNode.class = "target unsolved";
                    newNode.type = "target";
                    this.targetPoint = newNode;
                } else {
                    newNode.class = "unsolved";
                    newNode.type = "normal";
                }
                // initialize the heuristic distance of the current node
                currentRowArray.push(currentTableRow);
                currentTableRow += `<div id="${newNode.id}" class="${newNode.class}"></div>`;
                this.nodes.push(newNode);
            }
            this.boardArray.push(currentTableRow);
            tableRows += `${currentTableRow}</div>`;
        }
        const board = document.getElementById("board");
        board.innerHTML = tableRows;
        this.addEventListeners();
    }
    addEventListeners = () => {
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                const currentId = `${r}-${c}`;
                const currentNode = this.getNodeById(currentId);
                const currentElement = $(`#${currentId}`);

                currentElement.mousedown(e => {
                    e.preventDefault();
                    // check if user has clicked the draw walls button
                    if (this.drawingEnabled) {
                        this.mouseDown = true
                    }
                })
                currentElement.mouseup(e => {
                    e.preventDefault();
                    // check if user has clicked the draw walls button
                    if (this.drawingEnabled) {
                        this.mouseDown = false

                    }
                })
                currentElement.click(e => {
                    e.preventDefault();
                    if (this.newStartNode) {
                        $(`#${currentNode.id}`).addClass("start");
                        this.startPoint = currentNode;
                        $("#newStartingNode").removeClass("active");
                        this.newStartNode = false;
                    }
                    if (this.newEndNode) {
                        $(`#${currentNode.id}`).addClass("target");
                        this.targetPoint = currentNode;
                        $("#newEndingNode").removeClass("active");
                        this.newEndNode = false;
                    }
                    if (!this.drawingEnabled) return;
                    if (currentNode.type === "start" || currentNode.type === "target" || currentNode.type === "wall") {
                        this.revertNodeToDefault(currentNode);
                    }
                })
                currentElement.mouseenter(e => {
                    e.preventDefault();
                    if (this.drawingEnabled && this.mouseDown) {
                        $(`#${currentNode.id}`).addClass("wall")
                        currentNode.type = "wall";
                        currentNode.wall = true;
                    }
                })
            }

        }
    }
    getNodeById = (id: string): TileNode => {
        return this.nodes.find(n => n.id === id);
    }
    enableDrawing = () => {
        this.drawingEnabled = !this.drawingEnabled;
    }
    revertNodeToDefault = (node: TileNode) => {
        node.type = "normal";
        node.wall = false;
        $(`#${node.id}`).removeClass();
        $(`#${node.id}`).addClass("unsolved");
    }
    newStartingNode = () => {
        $("div").removeClass("start");
        this.mouseDown = false;
        this.drawingEnabled = false;
        this.newStartNode = true;
    }
    newEndingNode = () => {
        $("div").removeClass("target");
        this.mouseDown = false;
        this.drawingEnabled = false;
        this.newEndNode = true;
    }
}

export default Board;