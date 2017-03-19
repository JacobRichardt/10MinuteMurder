import {Container} from "pixi.js";
import Tile from "./tile";
import Point from "./point";
import * as Utilities from "./utilities";

export default class Room
{
	public container:Container;
	public tiles:Tile[][];

	private _hasPlacedCorpse = false;
	private _solvedCallback:()=>void;

	constructor(tileData:(number|null)[][], solvedCallback:()=>void)
	{
		this.container = new Container();
		this._solvedCallback = solvedCallback;

		this.createRoom(tileData)
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
		const tile = new Tile(new Point(x, y), type);

		if(!this.tiles[x])
			this.tiles[x] = [];

		this.tiles[x][y] = tile;

		if(!this._hasPlacedCorpse && tile.type == 0 && Math.round(Math.random() * 4) == 0)
		{
			this._hasPlacedCorpse = true;

			let sprite = Utilities.createItemSprite(0);
			sprite.addListener("click", this._solvedCallback);
			sprite.buttonMode = true;
			sprite.interactive = true;
			tile.container.addChild(sprite);
		}


		this.container.addChild(tile.container);
	}
}