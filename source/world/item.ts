import {Sprite} from "pixi.js";
import * as Utilities from "./utilities";

export default class Item
{
	public sprite:Sprite;

	public type:string|null;

	constructor(type:string)
	{
		this.type = type;
		this.sprite = Utilities.createSprite(this.type);
	}

	public addClickCallback(callback:()=>void):void
	{
		this.sprite.addListener("click", callback);
		this.sprite.interactive = true;
	}
}