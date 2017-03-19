import {Container, Text} from "pixi.js";
import Room from "./room";
import * as Utilities from "./utilities";
import Tile from "./tile";

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
		let room = new Room(this.createTestTiles());

		this.addCorpse(room);

		this.container.addChild(room.container);
	}

	private solved():void
	{
		let solvedMessage = new Text("Murder mystery solved!", {fontSize: 40, fill: "white"});

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
			" 11001111   ",
			" 10000001   ",
			" 10000001   ",
			" 1110000111 ",
			"   10000001 ",
			" 11100000011",
			" 10000000001",
			" 1 000000001",
			" 11100001111",
			"   110011   "
		].map(s => s.split("").map(t => t == " " ? null : parseInt(t)));
	}

	private addCorpse(room: Room)
	{
		const tiles:Tile[] = Array.prototype.concat(...room.tiles).filter(t => t.type == Utilities.FloorTile);
		const corpseTile = tiles[Math.floor(tiles.length * Math.random())];
		const corpse = corpseTile.addItem(Utilities.CorpseItem);

		corpse.addClickCallback(() => {
			this.solved();
		});
	}
}