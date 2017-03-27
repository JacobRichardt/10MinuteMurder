import Component from "./component";
import * as Utilities from "../utilities";
import Item from "../item";

export default class Suspect extends Component
{
	public isGuilty:boolean;
	public isDiscovered = false;
	private discoveredSuspects: Item[];

	constructor(isGuilty:boolean, discoveredSuspects:Item[])
	{
		super();

		this.isGuilty = isGuilty;
		this.discoveredSuspects = discoveredSuspects;
	}

	public initialize():void
	{
		if(this.isGuilty)
		{
			this.item.container.addChild(Utilities.createSprite(Utilities.suspectBloodSplatterItem));
		}

		this.item.addClickCallback(() => {
			if(!this.isDiscovered)
			{
				this.isDiscovered = true;
				this.discoveredSuspects.push(this.item);
			}
		});
	}
}