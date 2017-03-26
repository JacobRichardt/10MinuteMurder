import {Container, Text} from "pixi.js";
import World from "../world/world"
import SuspectLineUp from "./suspectLineUp";

export default class UserInterface
{
	public container:Container;
	private world:World;

	private canSolve:boolean = false;
	private solveButton:Text;
	private lineUp:SuspectLineUp;
	private endingText:Text;

	constructor(world:World)
	{
		this.world = world;
		this.container = new Container();
	}

	public update(delta:number):void
	{
		if(this.solveButton == null && this.world.haveDiscoveredVictim && this.world.discoveredSuspects.length > 0)
			this.makeSolvable();

		if(this.lineUp && !this.endingText && this.lineUp.hasAnswered)
			this.addEndText(this.lineUp.hasAnsweredCorrectly);
	}
	private makeSolvable()
	{
		this.solveButton = new Text("Announce murder", {fontSize: 20, fill: "white"});

		this.solveButton.interactive = true;
		this.solveButton.buttonMode = true;

		this.solveButton.addListener("click", () => this.showChooseMurderer());

		this.container.addChild(this.solveButton);
	}

	private showChooseMurderer()
	{
		this.container.removeChild(this.solveButton);

		this.lineUp = new SuspectLineUp(this.world);

		this.container.addChild(this.lineUp.container);
	}

	private addEndText(hasAnsweredCorrectly: boolean):void
	{
		this.endingText = new Text(hasAnsweredCorrectly ? "Murder solved!" : "Framed an innocent person!", {fontSize: 40, fill: "white"});

		this.endingText.y = 200;

		this.container.addChild(this.endingText);
	}
}