import {Container, Sprite} from "pixi.js";
import * as Tile from "./tile";

export default class Room
{
	public container:Container;

	constructor(tileData:(number|null)[][])
	{
		this.container = new Container();

		this.createRoom(tileData)
	}

	private createRoom(tileData:(number|null)[][])
	{
		for(let y = 0; y < tileData.length; y++)
		{
			for(let x = tileData[y].length - 1; x >= 0; x--)
			{
				if(tileData[y][x] != null)
					this.container.addChild(this.createTile(new Tile.Point(x, y), tileData[y][x]));
			}
		}
	}

	private createTile(point:Tile.Point, type:number):Sprite
	{
		const sprite = Tile.createSprite(type);
		const coordinates = point.toIsometric();

		sprite.x = coordinates.x;
		sprite.y = coordinates.y;

		return sprite;
	}
}