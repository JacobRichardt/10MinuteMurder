import Random from "../random";
export default class RoomCreator
{
	public static CreateRoom():(number|null)[][]
	{
		let numberOfRectangles = Random.getNextInteger(4);

		let width = Random.getNextInteger(3, 6);
		let height = Random.getNextInteger(3, 6);

		let result:(number|null)[][] = [];

		for(let x = 0; x < width + 2; x++)
		{
			let row:number[] = [];
			result.push(row);

			for(let y = 0; y < height + 2; y++)
			{
				if(x == 0 || x == width + 1 || y == 0 || y == height + 1)
					row.push(1);
				else
					row.push(0);

			}
		}

		return result;
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
}