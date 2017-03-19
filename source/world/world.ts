import {Container, Text} from "pixi.js";
import Room from "./room";
import * as Utilities from "./utilities";

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

		Utilities.loadTextures(()=> this.addRoom());
	}

	private addRoom():void
	{
		let room = new Room(this.createTestTiles(), () => this.solved());

		this.container.addChild(room.container);
	}

	private solved():void
	{
		let solvedMessage = new Text("Solved!", {fontSize: 40, fill: "white"});

		solvedMessage.y = 200;
		
		this.container.addChild(solvedMessage);
	}

	private createSimpleTestTiles():(number|null)[][]
	{
		return [
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