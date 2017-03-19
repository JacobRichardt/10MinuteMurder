import {loader, Sprite} from "pixi.js";

export const TileWidth = 64;
export const TileHeight = 32;
export const FloorTile = "images/floor.png";
export const WallTile = "images/wall.png";
export const TileTypes = [FloorTile, WallTile];

export function loadTextures(callback:()=>void):void
{
	for(let tile of TileTypes)
		loader.add(tile);

	loader.load(() => {
		callback();
	});
}

export function createSprite(tileType:number):Sprite
{
	return new Sprite(loader.resources[TileTypes[tileType]].texture)
}