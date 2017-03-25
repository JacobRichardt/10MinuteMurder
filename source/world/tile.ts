import {Container} from "pixi.js";
import Point from "./point";
import * as Utilities from "./utilities";
import Item from "./item";

export default class Tile
{
	public container:Container;

	public position:Point;
	public type:string|null;

	public items:Item[] = [];

	constructor(position:Point, type:string|null)
	{
		this.position = position;
		this.type = type;

		const coordinates = this.position.toIsometric();
		this.container = new Container();
		this.container.x = coordinates.x;
		this.container.y = coordinates.y;

		if(type != null)
		{
			const sprite = Utilities.createSprite(type);
			this.container.addChild(sprite);
		}
	}

	public get isEmpty():boolean
	{
		return this.items.length == 0;
	}

	public addItem(type:string):Item
	{
		const item = new Item(type);

		this.items.push(item);

		this.container.addChild(item.sprite);

		return item;
	}
}