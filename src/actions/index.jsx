import {
    SET_MAPWITHROOMANDHALL, SET_GROUND, SET_PLAYER, SET_FOODS,
    SET_ITEMS, ADD_HEALTH, ADD_EXPERIENCE, GENERATE_NEXT_LEVEL,
    PLAYER_MOVE,
    TOGGLE_SOUND,
    SET_VOLUME, TURN_OFF_ANIMATION
} from '../constant';

/**
 * 
 * @description this function is to avoid rewrite the action creator each time
 * @param {*} type 
 * @param {*} argNames
 * @returns an action with type and argument 
 */
function makeActionCreator(type, ...argNames) {
    return function (...args) {
        let action = { type }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action;
    }
}
/**
 * 
 * @param {*} mapWithRoomAndHall 
 */
export const setMapWithRoomAndhall = makeActionCreator(SET_MAPWITHROOMANDHALL, 'mapWithRoomAndHall');

/**
 * 
 * @param {*} ground matrix of games with wall, room, and hall 
 */
export const setGround = makeActionCreator(SET_GROUND, 'ground');

/**
 * 
 * @param {Player} player 
 */
export const setPlayer = makeActionCreator(SET_PLAYER, 'player');

/**
 * 
 * @param {*} foodItems array of Food 
 */
export const setFoods = makeActionCreator(SET_FOODS, 'foodItems');


/**
 * 
 * @param {*} items array of Food, Ennemy, Weapon 
 */
export const setItems = makeActionCreator(SET_ITEMS, 'items');

/**
 * 
 * @param {*} health 
 */
export const addHealth = makeActionCreator(ADD_HEALTH, 'health');

/**
 * 
 * @param {*} experience 
 */
export const addExperience = makeActionCreator(ADD_EXPERIENCE, 'experience');


/**
 * 
 * @param {*} experience 
 */
export const generateNextLevel = makeActionCreator(GENERATE_NEXT_LEVEL);


/**
 * 
 * @param {*} experience 
 */
export const movePlayer = makeActionCreator(PLAYER_MOVE, 'direction');


export const toggleSound = makeActionCreator(TOGGLE_SOUND);


/**
 * 
 * @param {*} experience 
 */
export const setVolume = makeActionCreator(SET_VOLUME, 'volume');

export const turnOffAnimation = makeActionCreator(TURN_OFF_ANIMATION);