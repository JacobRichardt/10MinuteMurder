import * as pixi from "pixi.js";

export default class test
{
	private sprite:pixi.Sprite;

	constructor(private root:pixi.Container)
	{
		this.load();
	}

	public load():void
	{
		pixi.loader
			.add("images/floor.png")
			.load(()=> {
				this.sprite = new PIXI.Sprite(PIXI.loader.resources["images/floor.png"].texture);
				this.root.addChild(this.sprite);
			})
	}

	public update(delta:number):void
	{
		if(this.sprite)
			this.sprite.x += (0.1 * delta);
	}
}