import * as pixi from "pixi.js";

export class Main
{
	private renderer:pixi.CanvasRenderer|pixi.WebGLRenderer;
	private stage:pixi.Container;

	constructor()
	{
		this.createRenderer();
		this.loadTextures();
	}

	private createRenderer():void
	{
		this.renderer = pixi.autoDetectRenderer(150, 150);
		this.renderer.view.style.position = "absolute";
		this.renderer.view.style.display = "block";
		this.renderer.autoResize = true;
		this.renderer.resize(800, 600);

		this.stage = new pixi.Container();
		this.renderer.render(this.stage);

		document.body.appendChild(this.renderer.view);
	}

	private loadTextures():void
	{
		pixi.loader
			.add("images/floor.png")
			.load(()=> {
				let sprite = new PIXI.Sprite(PIXI.loader.resources["images/floor.png"].texture);
				let sprite2 = new PIXI.Sprite(PIXI.loader.resources["images/floor.png"].texture);
				sprite2.x = 32

				this.stage.addChild(sprite);
				this.stage.addChild(sprite2);
				this.renderer.render(this.stage);
			})
	}
}

export default new Main();