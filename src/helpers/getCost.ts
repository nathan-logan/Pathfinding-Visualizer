import TileNode from "../components/tileNode";

// getCost is the actual "cost" from the starting node to the current node
const getCost = (nodeOne: TileNode, nodeTwo: TileNode) => {
    const currentNodeX = nodeOne.posX;
    const currentNodeY = nodeOne.posY;
    const targetNodeX = nodeTwo.posX;
    const targetNodeY = nodeTwo.posY;

    if (currentNodeY === targetNodeY) {
        return currentNodeX - targetNodeX;
    }
    if (currentNodeX === targetNodeX) {
        return currentNodeY - targetNodeY;
    }
}

export default getCost;