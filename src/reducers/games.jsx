import { SET_MAPWITHROOMANDHALL, SET_GROUND, SET_PLAYER, 
    SET_FOODS, SET_ITEMS,
    ADD_HEALTH } from '../constant';

export const initialState = {
    ground: null,
    mapWithRoomAndHall: null,
    player: null,
    foods: [],
    items: [],
    health: 100,
    weapons: [],
    attack: 7,
    level: 0,
    nextLevel: 100,
    dungeon: 0
}
export default function game(state = initialState, action) {
    switch (action.type) {
        case SET_PLAYER: {
            return Object.assign({}, state, {
                player: action.player
            });
        }
        case SET_MAPWITHROOMANDHALL: {
            return Object.assign({}, state, {
                mapWithRoomAndHall: action.mapWithRoomAndHall
            });
        }
        case SET_GROUND: {
            return Object.assign({}, state, {
                ground: action.ground
            });
        }
        case SET_FOODS: {
            return Object.assign({}, state, {
                foods: action.foodItems
            });            
        }
        case SET_ITEMS: {
            return Object.assign({}, state, {
                items: action.items
            });            
        }
        case ADD_HEALTH: {
            var health = state.health + action.health;
            return Object.assign({}, state, {
                health: health
            });     
        }

        default: {
            return state;
        }

    }
}