export class Random
{
	// from https://gist.github.com/Protonk/5367430
	// m is basically chosen to be large (as it is the max period)
	// and for its relationships to a and c
	// a - 1 should be divisible by m's prime factors
	// c and m should be co-prime

	private static m = 4294967296;
	private static a = 1664525;
	private static c = 1013904223;

	private _seed:number;
	private z:number;

	constructor()
	{
		this.seed = Math.round(Math.random() * Random.m);
	}

	public get seed():number
	{
		return this._seed;
	}

	public set seed(value:number)
	{
		this.z = this._seed = value;
	}

	public getNext():number
	{
		this.z = (Random.a * this.z + Random.c) % Random.m;
		return this.z / Random.m;
	}

	public getNextInteger(max:number, min = 0):number
	{
		return Math.floor(this.getNext() * (max - min)) + min;
	}
}

export default new Random();