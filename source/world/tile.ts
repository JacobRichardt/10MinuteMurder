import {loader, Sprite, Container} from "pixi.js";

export const TileWidth = 64;
export const TileHeight = 32;
export const FloorTile = "images/floor.png";
export const WallTile = "images/wall.png";
export const TileTypes = [FloorTile, WallTile];

export function loadTextures(callback:()=>void):void
{
	for(let tile of TileTypes)
		loader.add(tile);

	loader.load(() => {
		callback();
	});
}

export function createSprite(tileType:number):Sprite
{
	return new Sprite(loader.resources[TileTypes[tileType]].texture)
}

export class Tile
{
	public container:Container;

	public position:Point;
	public type:number|null;

	constructor(position:Point, type:number|null)
	{
		this.position = position;
		this.type = type;

		const coordinates = this.position.toIsometric();
		this.container = new Container();
		this.container.x = coordinates.x;
		this.container.y = coordinates.y;

		if(type != null)
		{
			const sprite = createSprite(type);
			this.container.addChild(sprite);
		}
	}
}

export class Point
{
	public x:number;
	public y:number;

	constructor(x:number = 0, y:number = 0)
	{
		this.x = x;
		this.y = y;
	}

	public toIsometric():{x:number, y:number}
	{
		return {
			x: this.x * TileWidth / 2 + this.y * TileWidth / 2,
			y: this.y * TileHeight / 2 - this.x * TileHeight / 2
		};
	}
}