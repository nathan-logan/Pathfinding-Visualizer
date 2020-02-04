class TileNode {
    id: string;
    type: string;
    class: string;
    wall: boolean;
    posX: number;
    posY: number;
    parent: TileNode;
    h: number;
    g: number = Infinity;
    f: number = Infinity;
}

export default TileNode;