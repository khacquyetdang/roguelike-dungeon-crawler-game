import { SET_MAPWITHROOMANDHALL, SET_GROUND, SET_PLAYER } from '../constant';

export const initialState = {
    ground: null,
    mapWithRoomAndHall: null,
    player: null,
    health: 100,
    weapon: null,
    attack: 7,
    level: 0,
    nextLevel: 100,
    dungeon: 0
}
export function game(state = initialState, action)
switch (action.type) {
    case SET_PLAYER: {
        return Object.assign({}, state, {
            player: action.player
        });
    }
    case SET_MAPWITHROOMANDHALL: {
        return Object.assign({}, state, {
            ground: action.mapWithRoomAndHall
        });
    }
    case SET_GROUND: {
        return Object.assign({}, state, {
            ground: action.ground
        });
    }
    default: {
        return state;
    }

}