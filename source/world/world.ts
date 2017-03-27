import {Container} from "pixi.js";
import Room from "./room";
import * as Utilities from "./utilities";
import Item from "./item";
import Suspect from "./components/suspect";

export default class World
{
	public container:Container;

	public haveDiscoveredVictim = false;
	public discoveredSuspects:Item[] = []

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
		this.addSuspects(room);

		this.container.addChild(room.container);
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

	private addSuspects(room: Room):void
	{
		const firstIsGuilty = Math.floor(Math.random() * 2) == 0;

		this.addSuspect(room, Utilities.suspect1Item, firstIsGuilty);
		this.addSuspect(room, Utilities.suspect2Item, !firstIsGuilty);
	}

	private addSuspect(room:Room, type:string, isGuilty:boolean):void
	{
		let tile = room.getEmptyTile(Utilities.floorTile);
		let suspect = tile.addItem(type);

		suspect.addComponent(new Suspect(isGuilty, this.discoveredSuspects));
	}

	private addCorpse(room: Room):void
	{
		const corpseTile = room.getEmptyTile(Utilities.floorTile);
		const corpse = corpseTile.addItem(Utilities.corpseItem);

		corpse.addClickCallback(() => {
			this.haveDiscoveredVictim = true;
		});
	}
}