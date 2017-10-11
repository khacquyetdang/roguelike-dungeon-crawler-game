import { SET_MAPWITHROOMANDHALL, SET_GROUND, SET_PLAYER, SET_FOODS, 
    SET_ITEMS, ADD_HEALTH, ADD_EXPERIENCE } from '../constant';

/**
 * 
 * @param {*} mapWithRoomAndHall 
 */
export function setMapWithRoomAndhall(mapWithRoomAndHall) {
    return {
        type : SET_MAPWITHROOMANDHALL,
        mapWithRoomAndHall
    }
}

/**
 * 
 * @param {*} ground matrix of games with wall, room, and hall 
 */
export function setGround(ground) {
    return {
        type : SET_GROUND,
        ground
    }
}

/**
 * 
 * @param {Player} player 
 */
export function setPlayer(player) {
    return {
        type : SET_PLAYER,
        player
    }
}

/**
 * 
 * @param {*} foodItems array of Food 
 */
export function setFoods(foodItems) {
    return {
        type : SET_FOODS,
        foodItems
    }
}


/**
 * 
 * @param {*} items array of Food, Ennemy, Weapon 
 */
export function setItems(items) {
    return {
        type : SET_ITEMS,
        items
    }
}

/**
 * 
 * @param {*} health 
 */
export function addHealth(health) {
    return {
        type: ADD_HEALTH,
        health
    }
}

/**
 * 
 * @param {*} experience 
 */
export function addExperience(experience) {
    return {
        type: ADD_EXPERIENCE,
        experience
    }
}