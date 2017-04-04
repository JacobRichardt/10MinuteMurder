import Random from "../random";

type roomGridCell = (number|null);
type roomGrid = roomGridCell[][];

export default class RoomCreator
{
	public static CreateRoom():roomGrid
	{
		let room:(number|null)[][] = [[0]];
		let numberOfRectangles = Random.getNextInteger(1, 4);

		for(let i = 0; i < numberOfRectangles; i++)
			RoomCreator.AddRectangle(room);

		RoomCreator.addWalls(room);
		
		console.log(room.map(row => row.map(v => v == null ? " " : v.toString()).join("")).join("\n"));

		return room;
	}

	private static AddRectangle(room:roomGrid):void
	{
		let startX = Random.getNextInteger(0, room.length - 1);
		let startY = Random.getNextInteger(0, room[0].length - 1);

		while(room[startX][startY] !== 0)
		{
			startX = Random.getNextInteger(0, room.length - 1);
			startY = Random.getNextInteger(0, room[0].length - 1);
		}

		let width = Random.getNextInteger(4, 6);
		let height = Random.getNextInteger(4, 6);

		while(startY + height >= room[0].length)
			RoomCreator.addColumn(room, room[0].length);

		while(startX + width >= room.length)
			room.push(RoomCreator.createRow(room[0].length))

		for(let x = startX; x < startX + width; x++)
		{
			for(let y = startY; y < startY + height; y++)
			{
				room[x][y] = 0;
			}
		}
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
					room.unshift(RoomCreator.createRow(row.length));
					x = 1;
				}
				else if(x == room.length - 1)
				{
					room.push(RoomCreator.createRow(row.length));
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