import {loader, Sprite} from "pixi.js";

export const tileWidth = 64;
export const tileHeight = 32;

export const floorTile = "images/floor.png";
export const wallTile = "images/wall.png";

export const corpseItem = "images/corpse.png";
export const suspect1Item = "images/suspect1.png";
export const suspect2Item = "images/suspect2.png";

export const tileTypes = [floorTile, wallTile];
export const itemTypes = [corpseItem, suspect1Item, suspect2Item];

export function loadTextures(callback:()=>void):void
{
	for(let tile of tileTypes)
		loader.add(tile);

	for(let tile of itemTypes)
		loader.add(tile);

	loader.load(() => {
		callback();
	});
}

export function createTileSprite(tileType:number):Sprite
{
	return createSprite(tileTypes[tileType]);
}

export function createSprite(key:string):Sprite
{
	return new Sprite(loader.resources[key].texture)
}