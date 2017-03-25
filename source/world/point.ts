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
			x: this.x * Utilities.tileWidth / 2 + this.y * Utilities.tileWidth / 2,
			y: this.y * Utilities.tileHeight / 2 - this.x * Utilities.tileHeight / 2
		};
	}
}