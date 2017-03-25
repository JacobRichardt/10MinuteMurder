import {Container} from "pixi.js";
import Tile from "./tile";
import Point from "./point";
import * as Utilities from "./utilities";

export default class Room
{
	public container:Container;
	public tiles:Tile[][];

	constructor(tileData:(number|null)[][])
	{
		this.container = new Container();

		this.createRoom(tileData)
	}

	public getEmptyTile(type:string):Tile|null
	{
		const tiles:Tile[] = Array.prototype.concat(...this.tiles).filter(t => t.type == type && t.isEmpty);

		if(tiles.length == 0)
			return null;

		return tiles[Math.floor(tiles.length * Math.random())];
	}

	private createRoom(tileData:(number|null)[][])
	{
		this.tiles = [];

		for(let y = 0; y < tileData.length; y++)
		{
			for(let x = tileData[y].length - 1; x >= 0; x--)
			{
				this.addTile(x, y, tileData[y][x])
			}
		}
	}

	private addTile(x:number, y:number, type:number):void
	{
		const tile = new Tile(new Point(x, y), Utilities.tileTypes[type]);

		if(!this.tiles[x])
			this.tiles[x] = [];

		this.tiles[x][y] = tile;

		this.container.addChild(tile.container);
	}
}