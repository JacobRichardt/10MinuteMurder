import {Container, Sprite} from "pixi.js";
import * as Utilities from "./utilities";
import Component from "./components/component";

export default class Item
{
	public container:Container;
	private sprite:Sprite;

	public type:string|null;

	public components:Component[] = [];

	constructor(type:string)
	{
		this.type = type;
		this.container = new Container();
		this.sprite = Utilities.createSprite(this.type);
		this.container.addChild(this.sprite);
	}

	public addComponent(component:Component):Component
	{
		component.item = this;
		this.components.push(component);

		component.initialize();

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