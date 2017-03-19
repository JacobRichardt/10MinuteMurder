import * as pixi from "pixi.js";
import World from "./world/world"

export class Main
{
	private renderer:pixi.CanvasRenderer|pixi.WebGLRenderer;
	private root:pixi.Container;
	private requestAnimationFrameHandler:number;

	private world:World;

	constructor()
	{
		this.createRenderer();

		this.world = new World();
		this.root.addChild(this.world.container);

		this.startGameLoop();
	}

	private update(delta:number):void
	{
		this.world.container.x = (this.renderer.width - this.world.container.width) / 2;
		this.world.container.y = (this.renderer.height - this.world.container.height) / 2;
	}

	private createRenderer():void
	{
		this.renderer = pixi.autoDetectRenderer(800, 600);
		this.renderer.view.style.position = "absolute";
		this.renderer.view.style.display = "block";
		this.renderer.view.style.width = "100%";

		this.renderer.autoResize = true;

		this.root = new pixi.Container();

		document.body.appendChild(this.renderer.view);
	}

	private startGameLoop():void
	{
		let lastTimestamp = window.performance.now();
		const callback = (timestamp:number) => {
			let delta = timestamp - lastTimestamp;
			lastTimestamp = timestamp;

			this.update(delta);

			this.renderer.render(this.root);

			this.requestAnimationFrameHandler = window.requestAnimationFrame(callback)
		};

		callback(lastTimestamp);
	}

	private stopGameLoop():void
	{
		window.cancelAnimationFrame(this.requestAnimationFrameHandler);
	}
}

export default new Main();