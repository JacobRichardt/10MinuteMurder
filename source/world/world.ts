import {Container, loader} from "pixi.js";
import Room from "./room";
import * as Tile from "./tile";

export default class World
{
	public container:Container;

	constructor()
	{
		this.initialize();
	}

	private initialize():void
	{
		this.container = new Container();

		Tile.loadTextures(()=> this.addRoom());
	}

	private addRoom():void
	{
		let room = new Room(this.createTestTiles());

		this.container.addChild(room.container);
	}

	private createSimpleTestTiles():(number|null)[][]
	{
		return [
			"       ",
			" 11111 ",
			" 10101 ",
			" 10101 ",
			" 10001 ",
			" 11111 "
		].map(s => s.split("").map(t => t == " " ? null : parseInt(t)));
	}
	
	private createTestTiles():(number|null)[][]
	{
		return [
			"           ",
			" 1100111   ",
			" 1000001   ",
			" 1000001   ",
			" 111000111 ",
			"   1000001 ",
			" 111000001 ",
			" 1000000011",
			" 1 00000000",
			" 1110001111",
			"   10001   "
		].map(s => s.split("").map(t => t == " " ? null : parseInt(t)));
	}
}