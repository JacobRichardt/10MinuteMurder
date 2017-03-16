import * as pixi from "pixi.js";
import Test from "./test"

export class Main
{
	private renderer:pixi.CanvasRenderer|pixi.WebGLRenderer;
	private root:pixi.Container;
	private requestAnimationFrameHandler:number;

	private test:Test;

	constructor()
	{
		this.createRenderer();

		this.test = new Test(this.root);

		this.startGameLoop();
	}

	private update(delta:number):void
	{
		this.test.update(delta);
	}

	private createRenderer():void
	{
		this.renderer = pixi.autoDetectRenderer(800, 600);
		this.renderer.view.style.position = "absolute";
		this.renderer.view.style.display = "block";
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