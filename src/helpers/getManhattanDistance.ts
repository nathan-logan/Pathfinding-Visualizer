import TileNode from "../components/tileNode";

// manhattan distance is the distance between two points measured along axes at right angles
const getManhattanDistance = (nodeOne: TileNode, nodeTwo: TileNode): number => {
    // get the cooridinates of the nodes
    const currentNodeX = nodeOne.posX;
    const currentNodeY = nodeOne.posY;
    const targetNodeX = nodeTwo.posX;
    const targetNodeY = nodeTwo.posY;

    return Math.abs(currentNodeX - targetNodeX) + Math.abs(currentNodeY - targetNodeY);
}

export default getManhattanDistance;