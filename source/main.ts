import * as pixi from "pixi.js";
import Test from "./test"
import Room from "./map/room"

export class Main
{
	private renderer:pixi.CanvasRenderer|pixi.WebGLRenderer;
	private root:pixi.Container;
	private requestAnimationFrameHandler:number;

	private test:Test;
	private room:Room;

	constructor()
	{
		this.createRenderer();

		//this.test = new Test(this.root);

		this.room = new Room(10, 6)
		this.room.container.x = 300;
		this.room.container.y = 100;
		this.root.addChild(this.room.container);

		this.startGameLoop();
	}

	private update(delta:number):void
	{
		//this.test.update(delta);
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