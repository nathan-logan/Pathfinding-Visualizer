import TileNode from "../components/tileNode";
import getManhattanDistance from "../helpers/getManhattanDistance";
import getNeighbours from "../helpers/getNeighbours";

const astar = (nodes: TileNode[], start: TileNode, target: TileNode, boardArray: string[]) => {
    const openSet: TileNode[] = [start];
    const closedSet: TileNode[] = [];

    start.h = getManhattanDistance(start, target);
    start.g = 0;
    start.f = getManhattanDistance(start, target);
    openSet.push(start);

    while (openSet.length) {
        // lowest 'f' score
        let lowestIndex: number = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i;
            }
        }
        const currentNode: TileNode = openSet[lowestIndex];

        // end case if target is found
        if (currentNode === target) {
            // find the path
            const path: TileNode[] = [];
            let temp = currentNode
            while (temp.parent) {
                $(`#${temp.id}`).addClass("solution");
                path.push(temp.parent);
                temp = temp.parent;
            }
            console.log("DONE!");
            return;
        }

        // remove from queue and add to processed nodes array
        openSet.splice(openSet.indexOf(currentNode), 1);
        closedSet.push(currentNode);

        const neighbours = getNeighbours(currentNode, nodes);
        neighbours.map(neighbour => {
            $(`#${neighbour.id}`).addClass("solved");
            // early return if the neighbour is a wall
            if (neighbour.wall) return;
            // early return if the neighbour has already been evaluated
            if (closedSet.includes(neighbour)) return;

            const gScore = currentNode.g + 1;

            if (gScore < neighbour.g) {
                // this path is better than any previous one
                neighbour.g = gScore;
                neighbour.h = getManhattanDistance(neighbour, target);
                neighbour.f = neighbour.g + neighbour.h;
                neighbour.parent = currentNode;
            }

            if (!openSet.includes(neighbour)) {
                openSet.push(neighbour);
            }
        })
    }
    if (!openSet.length) {
        return console.log("target coulnd't be found :(")
    }
}

export default astar;