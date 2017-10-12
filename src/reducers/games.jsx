import {
    SET_MAPWITHROOMANDHALL, SET_GROUND, SET_PLAYER,
    SET_FOODS, SET_ITEMS,
    ADD_HEALTH, ADD_EXPERIENCE,
    EXP_WARRIOR, EXP_GLADIATOR, EXP_MAGE, EXP_BERSERKER
} from '../constant';
import Player, { PlayerEnum } from '../components/Player';
export const initialState = {
    ground: null,
    mapWithRoomAndHall: null,
    player: null,
    foods: [],
    items: [],
    health: 100,
    weapons: [],
    experience: 0,
    attack: 7,
    level: 0,
    nextLevel: 100,
    dungeon: 1
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

        case ADD_EXPERIENCE: {
            var experience = state.experience + action.experience;
            var { player } = state;
            switch (player.type) {
                case PlayerEnum.WARIOR: {
                    if (experience >= EXP_GLADIATOR) {
                        experience = 0;
                        player = new Player(player.row, player.col, PlayerEnum.GLADIATOR, player.health, 0);
                    }
                    break;
                }

                case PlayerEnum.GLADIATOR: {
                    if (experience >= EXP_BERSERKER) {
                        experience = 0;
                        player = new Player(player.row, player.col, PlayerEnum.BERSERKER, player.health, 0);
                    }
                    break;
                }

                case PlayerEnum.BERSERKER: {
                    if (experience >= EXP_MAGE) {
                        experience = 0;
                        player = new Player(player.row, player.col, PlayerEnum.MAGE, player.health, 0);
                    }
                    break;
                }
            }
            return Object.assign({}, state, {
                experience, player
            });
        }

        default: {
            return state;
        }

    }
}