import { SET_MAPWITHROOMANDHALL, SET_GROUND, SET_PLAYER } from '../constant';

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
