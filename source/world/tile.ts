import {Container} from "pixi.js";
import Point from "./point";
import * as Utilities from "./utilities";

export default class Tile
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
			const sprite = Utilities.createTileSprite(type);
			this.container.addChild(sprite);
		}
	}
}