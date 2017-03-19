import {loader, Sprite} from "pixi.js";

export const TileWidth = 64;
export const TileHeight = 32;

export const FloorTile = "images/floor.png";
export const WallTile = "images/wall.png";

export const CorpseItem = "images/corpse.png";

export const TileTypes = [FloorTile, WallTile];
export const ItemTypes = [CorpseItem];

export function loadTextures(callback:()=>void):void
{
	for(let tile of TileTypes)
		loader.add(tile);

	for(let tile of ItemTypes)
		loader.add(tile);

	loader.load(() => {
		callback();
	});
}

export function createTileSprite(tileType:number):Sprite
{
	return createSprite(TileTypes[tileType]);
}

export function createItemSprite(itemType:number):Sprite
{
	return createSprite(ItemTypes[itemType]);
}

function createSprite(key:string):Sprite
{
	return new Sprite(loader.resources[key].texture)
}