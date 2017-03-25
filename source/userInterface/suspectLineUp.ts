import {Container, Text, Graphics} from "pixi.js";
import World from "../world/world"
import * as Utilities from "../world/utilities";

export default class SuspectLineUp
{
	public container:Container;
	private world:World;

	constructor(world:World)
	{
		this.world = world;
		this.container = new Container();

		this.createLineUp();
	}

	private createLineUp() {
		let background = new Graphics();
		background.beginFill(0x66CCFF);
		background.lineStyle(4, 0xFF3300, 1);
		background.drawRect(0, 0, Utilities.tileWidth * this.world.discoveredSuspects.length, Utilities.tileHeight * 2);
		background.endFill();

		this.container.addChild(background);

		for(let i = 0; i < this.world.discoveredSuspects.length; i++){
			let suspect = this.world.discoveredSuspects[i];
			let sprite = Utilities.createSprite(suspect.type);
			sprite.x = i * Utilities.tileWidth;

			sprite.interactive = true;
			sprite.buttonMode = true;

			sprite.addListener("click", () => {

			});

			this.container.addChild(sprite);
		}
	}
}