import * as pixi from "pixi.js";

export default class Main
{
	private renderer:pixi.CanvasRenderer|pixi.WebGLRenderer;

	constructor()
	{
		this.createRenderer();
	}

	private createRenderer():void
	{
		this.renderer = pixi.autoDetectRenderer(150, 150);
		this.renderer.view.style.position = "absolute";
		this.renderer.view.style.display = "block";
		this.renderer.resize(800, 600);
		document.body.appendChild(this.renderer.view);
	}
}

var main = new Main();