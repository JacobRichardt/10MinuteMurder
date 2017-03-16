import * as pixi from "pixi.js";

export default class Room
{
	public static TileWidth = 64;
	public static TileHeight = 32;
	public static FloorTile = "images/floor.png";
	public static WallTile = "images/wall.png";
	public static TileTypes = [null, Room.FloorTile, Room.WallTile];

	public tiles:number[][];

	public container:pixi.Container;

	constructor(width:number, height:number)
	{
		this.container = new pixi.Container();

		this.loadTexture(() => {
			this.CreateRoom(width, height);
		});
	}

	private CreateRoom(width: number, height: number)
	{
		this.tiles = [
			"00000000000".split("").map(v => parseInt(v)),
			"02211222000".split("").map(v => parseInt(v)),
			"02111112000".split("").map(v => parseInt(v)),
			"02111112000".split("").map(v => parseInt(v)),
			"02221112220".split("").map(v => parseInt(v)),
			"00021111120".split("").map(v => parseInt(v)),
			"02221111120".split("").map(v => parseInt(v)),
			"02111111122".split("").map(v => parseInt(v)),
			"02011111111".split("").map(v => parseInt(v)),
			"02221112222".split("").map(v => parseInt(v)),
			"00021112000".split("").map(v => parseInt(v))
		];

		for(let y = 0; y < this.tiles.length; y++)
		{
			for(let x = 0; x < this.tiles[y].length; x++)
			{
				if(Room.TileTypes[this.tiles[y][x]] != null)
					this.container.addChild(this.createTile(x, y, Room.TileTypes[this.tiles[y][x]]));
			}
		}
	}

	private createTile(x:number, y:number, type:string):pixi.Sprite
	{
		const sprite = new pixi.Sprite(pixi.loader.resources[type].texture);
		const coordinates = Room.toIsometric(x * Room.TileHeight, y * Room.TileHeight);

		sprite.x = coordinates.x;
		sprite.y = coordinates.y;

		return sprite;
	}

	private static toIsometric(x:number, y:number):{x:number, y:number}
	{
		return {
			x: x - y,
			y: (x + y) / 2
		};
	}

	private loadTexture(callback:()=>void)
	{
		pixi.loader
			.add(Room.FloorTile)
			.add(Room.WallTile)
			.load(()=> {
				callback();
			})
	}
}