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

		RoomCreator.addWalls(room);

		console.log(room);

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
					RoomCreator.addColumn(room, 0);
					y = 1;
				}
				else if(y == row.length - 1)
				{
					RoomCreator.addColumn(room, row.length);
				}
				
				RoomCreator.addWallsAroundCell(x, y, room);
			}
		}
	}

	private static addWallsAroundCell(x:number, y:number, room:roomGrid):void
	{
		if(room[x - 1][y] != 0)
			room[x - 1][y] = 1;
		if(room[x + 1][y] != 0)
			room[x + 1][y] = 1;

		if(room[x][y - 1] != 0)
			room[x][y - 1] = 1;
		if(room[x][y + 1] != 0)
			room[x][y + 1] = 1;
	}

	private static createRow(length:number):roomGridCell[]
	{
		let row = [];
		for(let x = 0; x < length; x++)
			row.push(null);

		return row;
	}

	private static addColumn(grid:roomGrid, index:number):void
	{
		for(let x = 0; x < grid.length; x++)
		{
			grid[x].splice(index, 0, null);
		}
	}
}