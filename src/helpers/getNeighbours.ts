import TileNode from "../components/tileNode";

const getNeighbours = (node: TileNode, nodes: TileNode[]): TileNode[] => {
    // coordinates of current node
    const currentNodeX = node.posX;
    const currentNodeY = node.posY;

    const neighbours: TileNode[] = [];

    nodes.map(n => {
        // if the neighbouring node is a wall, early return
        if (n.wall) return;
        // find out if a neighbour exists
        if (n.posX === currentNodeX - 1 && n.posY === currentNodeY) neighbours.push(n)
        if (n.posX === currentNodeX + 1 && n.posY === currentNodeY) neighbours.push(n)
        if (n.posY === currentNodeY - 1 && n.posX === currentNodeX) neighbours.push(n)
        if (n.posY === currentNodeY + 1 && n.posX === currentNodeX) neighbours.push(n)
    })
    return neighbours;


}

export default getNeighbours;