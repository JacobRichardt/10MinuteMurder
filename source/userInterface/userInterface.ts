import {Container, Text} from "pixi.js";
import World from "../world/world"
import SuspectLineUp from "./suspectLineUp";

export default class UserInterface
{
	public container:Container;
	private world:World;

	private canSolve:boolean = false;
	private solveButton:Text;

	constructor(world:World)
	{
		this.world = world;
		this.container = new Container();
	}

	public update(delta:number):void
	{
		if(this.solveButton == null && this.world.haveDiscoveredVictim && this.world.discoveredSuspects.length > 0)
			this.makeSolvable();
	}
	private makeSolvable()
	{
		this.solveButton = new Text("Announce murder", {fontSize: 20, fill: "white"});

		this.solveButton.interactive = true;
		this.solveButton.buttonMode = true;

		this.solveButton.addListener("click", () => this.showChooseMurderer());

		this.container.addChild(this.solveButton)
	}

	private showChooseMurderer()
	{
		this.container.removeChild(this.solveButton);

		let lineUp = new SuspectLineUp(this.world);

		this.container.addChild(lineUp.container);
	}
}