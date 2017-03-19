import * as Utilities from "./utilities";

export default class Point
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
			x: this.x * Utilities.TileWidth / 2 + this.y * Utilities.TileWidth / 2,
			y: this.y * Utilities.TileHeight / 2 - this.x * Utilities.TileHeight / 2
		};
	}
}