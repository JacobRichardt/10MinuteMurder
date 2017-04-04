import {Container} from "pixi.js";
import Room from "./room";
import * as Utilities from "./utilities";
import Item from "./item";
import Suspect from "./components/suspect";
import RoomCreator from "./roomCreator";
import Random from "../random";

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
		let room = new Room(RoomCreator.CreateRoom());

		this.addCorpse(room);
		this.addSuspects(room);

		this.container.addChild(room.container);
	}

	private addSuspects(room: Room):void
	{
		let numberOfSuspects = Random.getNextInteger(2, 5);
		let guiltySuspectIndex = Random.getNextInteger(0, numberOfSuspects - 1);

		for(let i = 0; i < numberOfSuspects; i++)
		{
			this.addSuspect(room, Random.getNextBoolean() ? Utilities.suspect1Item : Utilities.suspect2Item, i == guiltySuspectIndex);
		}
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