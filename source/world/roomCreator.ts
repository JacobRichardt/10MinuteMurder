import Random from "../random";

type roomGridCell = (number|null);
type roomGrid = roomGridCell[][];

export default class RoomCreator
{
	public static CreateRoom():roomGrid
	{
		let numberOfRectangles = Random.getNextInteger(4);

		let width = Random.getNextInteger(4, 8);
		let height = Random.getNextInteger(4, 8);

		let room:(number|null)[][] = [];

		for(let x = 0; x < width; x++)
		{
			let row:number[] = [];
			room.push(row);

			for(let y = 0; y < height; y++)
			{
				row.push(0);
			}
		}

		RoomCreator.addWalls(room)

		return room;
	}

	private static addWalls(room:roomGrid):void
	{
		for(let x = 0; x < room.length; x++)
		{
			let row = room[x];

			for(let y = 0; y < row.length; y++)
			{
				if(row[y] != 0)
					continue;

				if(x == 0)
				{
					room.unshift(RoomCreator.createRow(row.length))
					x = 1;
				}
				else if(x == room.length - 1)
				{
					room.push(RoomCreator.createRow(row.length))
				}

				if(y == 0)
				{

				}
				else if(y == row.length - 1)
				{

				}

				if(room[x - 1][y] != 0)
					room[x - 1][y] = 1;
				if(room[x + 1][y] != 0)
					room[x + 1][y] = 1;
			}
		}
	}

	private static createRow(length:number):roomGridCell[]
	{
		let row = [];
		for(let x = 0; x < length; x++)
			row.push(null);

		return row;
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