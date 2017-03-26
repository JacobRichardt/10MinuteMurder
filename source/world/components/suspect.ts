import Component from "./component";

export default class Suspect extends Component
{
	public isGuilty:boolean;

	constructor(isGuilty:boolean)
	{
		super();

		this.isGuilty = isGuilty;
	}
}