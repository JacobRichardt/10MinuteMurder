import {Sprite} from "pixi.js";
import * as Utilities from "./utilities";
import Component from "./components/component";

export default class Item
{
	public sprite:Sprite;

	public type:string|null;

	public components:Component[] = [];

	constructor(type:string)
	{
		this.type = type;
		this.sprite = Utilities.createSprite(this.type);
	}

	public addComponent(component:Component):Component
	{
		component.item = this;
		this.components.push(component);

		return component;
	}

	public getComponent<T>(type:{new (...args : any[]):T;}):T
	{
		for(let component of this.components)
		{
			if(component instanceof type)
				return component;
		}

		throw new Error("Type not found: " + type.toString());
	}

	public addClickCallback(callback:()=>void):void
	{
		this.sprite.addListener("click", callback);
		this.sprite.interactive = true;
	}
}