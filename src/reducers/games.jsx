import {
    SET_MAPWITHROOMANDHALL, SET_GROUND, SET_PLAYER,
    SET_FOODS, SET_ITEMS,
    ADD_HEALTH, ADD_EXPERIENCE,
    EXP_WARRIOR, EXP_GLADIATOR, EXP_MAGE, EXP_BERSERKER,
    GENERATE_NEXT_LEVEL,
    PLAYER_MOVE, TOGGLE_SOUND, SET_VOLUME,
    ANIMATION_GAME_OVER, ANIMATION_NONE, ANIMATION_SWITCH_HERO, ANIMATION_NEW_LEVEL,
    TURN_OFF_ANIMATION, 
} from '../constant';
import Player, { PlayerEnum, PlayerDirectionEnum } from '../components/Player';
import generateDungeonTreeForMap, {
    createRoomFromBSPTree,
    createHallFromBSPTree,
    generateGroundFromTree,
} from '../data/BSPDungeon';
import {
    getRandomInt
} from '../data/Utils';
import _ from 'lodash';


import Food, { FoodEnum } from '../components/Food';
import Monster, { MonsterEnum } from '../components/Monster';
import Bosses, { BossesType } from '../components/Bosses';
import WallCell from '../data/WallCell';

const initHealth = 30;
export const initialState = {
    ground: null,
    mapWithRoomAndHall: null,
    player: null,
    foods: [],
    items: [],
    health: initHealth,
    weapons: [],
    experience: 0,
    attack: 7,
    level: 0,
    nextLevel: 100,
    bosses: null,
    dungeon: 1,
    sound_to_play: '',
    sound_on: true,
    volume: 50,
    animation : ANIMATION_NONE,
    messages: []
}
export default function game(state = initialState, action) {
    switch (action.type) {
        case SET_VOLUME: {
            return Object.assign({}, state, {
                volume: action.volume,
                sound_to_play: ''
            });
        }
        case TOGGLE_SOUND: {
            var newSound = !state.sound_on;
            return Object.assign({}, state, {
                sound_on: newSound
            });
        }

        case TURN_OFF_ANIMATION: {
            return Object.assign({}, state, {
                animation : ANIMATION_NONE                
            });
        }
        case GENERATE_NEXT_LEVEL: {
            var newState = generateLevel(state);
            if (newState.level > 1) {
                newState.sound_to_play = 'snd_levelup.mp3';
                newState.animation = ANIMATION_NEW_LEVEL;
            }
            newState.messages.push('You started the level ' + newState.level);
            return newState;
        }
        case SET_PLAYER: {
            return Object.assign({}, state, {
                player: action.player
            });
        }
        case PLAYER_MOVE: {
            var newState = _.cloneDeep(state);//JSON.parse(JSON.stringify(state));
            var player = newState.player;
            var ground = newState.ground;

            newState.sound_to_play = 'snd_step.mp3';
            const eatFood = (row, col) => {
                var foodItem = ground[row][col].child;
                if (foodItem !== undefined && foodItem !== null
                    && foodItem instanceof Food && foodItem.isAvailable) {
                    foodItem.isAvailable = false;
                    player.addHealth(foodItem.health);
                    newState.health = player.health;
                    newState.sound_to_play = 'snd_eat.mp3';
                    newState.messages.push("You have eaten " + foodItem.getName());
                    return true;
                }
                return false;
            }

            const attackMonster = (row, col) => {
                var monsterItem = ground[row][col].child;
                if (monsterItem !== undefined && monsterItem !== null
                    && monsterItem instanceof Monster && monsterItem.strength > 0) {
                    monsterItem.strength = monsterItem.strength - player.attack;
                    player.addHealth(monsterItem.damaged);
                    newState.health = player.health;
                    newState.sound_to_play = 'snd_hit.mp3';

                    if (monsterItem.strength > 0) {
                        newState.messages.push("You attacked " + monsterItem.getName());
                        return false;
                    } else {
                        // @TODO add experience
                        newState.messages.push("You killed " + monsterItem.getName());
                        player.addExperience(monsterItem.experience);
                        newState.experience = player.experience;
                        if (state.player.type !== player.type)
                        {
                            newState.animation = ANIMATION_SWITCH_HERO;
                        }
                        return true;
                    }
                }

                var bossItem = ground[row][col].child;

                if (bossItem !== undefined && bossItem !== null
                    && bossItem instanceof Bosses && bossItem.strength > 0) {
                    newState.sound_to_play = 'snd_hit.mp3';
                    bossItem.strength = bossItem.strength - player.attack;
                    player.addHealth(bossItem.damaged);
                    newState.health = player.health;

                    if (bossItem.strength > 0) {
                        newState.messages.push("You attacked the bosses " + bossItem.getName());
                        return false;
                    } else {
                        newState.messages.push("You killed the bosses " + bossItem.getName());
                        player.addExperience(bossItem.experience);
                        newState.experience = player.experience;
                        //this.props.generateNextLevel();
                    }
                }
                return true;
            };
            switch (action.direction) {
                case PlayerDirectionEnum.LEFT: {
                    eatFood(player.row, player.col - 1);
                    if (attackMonster(player.row, player.col - 1)) {
                        //this.props.movePlayer(PlayerDirectionEnum.LEFT);
                        player.moveLeft();
                    }
                    break;
                }
                case PlayerDirectionEnum.TOP: {
                    eatFood(player.row - 1, player.col);
                    if (attackMonster(player.row - 1, player.col)) {
                        player.moveTop();
                    }
                    break;
                }
                case PlayerDirectionEnum.RIGHT: {
                    eatFood(player.row, player.col + 1);
                    if (attackMonster(player.row, player.col + 1)) {
                        player.moveRight();
                    }
                    break;
                }
                case PlayerDirectionEnum.BOTTOM: {
                    if (player.row + 1 < newState.ground.length) {
                        if (ground[player.row + 1][player.col] instanceof WallCell) {
                            return;
                        }
                        eatFood(player.row + 1, player.col);
                        if (attackMonster(player.row + 1, player.col)) {
                            //this.props.movePlayer(PlayerDirectionEnum.BOTTOM);
                            player.moveBottom();
                        }
                        //player.moveBottom();
                        //this.props.setPlayer(player);
                    }
                    break;
                }
            }
            return newState;
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
                case PlayerEnum.WARRIOR: {
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

const minWidth = 15;
const minHeight = 15;
const mapSizeWidth = 50;
const mapSizeHeight = 50;
const deltaSizeForNextLevel = 10;
const deltaMinSizeForNextLevel = 1;

function generateLevel(state) {
    const level = state.level;

    const mapSizeWidthForLevel = mapSizeWidth + state.level * deltaSizeForNextLevel;
    const mapSizeHeightForLevel = mapSizeHeight + state.level * deltaSizeForNextLevel;
    const minWidthForLevel = minWidth + state.level * deltaMinSizeForNextLevel;
    const minHeightForLevel = minHeight + state.level * deltaMinSizeForNextLevel;
    var map = generateDungeonTreeForMap(0, 0, mapSizeWidthForLevel, mapSizeHeightForLevel,
        minWidthForLevel, minHeightForLevel, mapSizeWidthForLevel, mapSizeHeightForLevel);

    var treeRoom = createRoomFromBSPTree(map, minWidthForLevel / 2, minHeightForLevel / 2);

    var treeWithRoomAndHall = createHallFromBSPTree(treeRoom, 10);

    var ground = generateGroundFromTree(treeWithRoomAndHall);

    const generatePlayerInit = () => {
        var room1 = treeWithRoomAndHall.getLeafs()[0];
        var y = getRandomInt(room1.y, room1.y + room1.height - 1);
        var x = getRandomInt(room1.x, room1.x + room1.width - 1);
        var player = new Player(x, y, PlayerEnum.WARRIOR, initHealth);

        if (state.player !== null) {
            player.type = state.player.type;
            player.health = state.player.health;
        }
        return player;
    };

    var player = generatePlayerInit();

    /**
 * @description 
 * each room will one to 3 food
 */
    const generateGameItems = () => {
        var items = [];
        const checkPositionForItem = (x, y) => {
            for (var indexItem = 0; indexItem < items.length; indexItem++) {
                var item = items[indexItem];
                if ((item.row === x && item.col === y)
                    || (player.row === x && player.col === y)) {
                    return true;
                }
            }
            return false;
        }
        var foodItems = [];
        var monsterItems = [];
        for (var roomIndex = 0; roomIndex < treeWithRoomAndHall.getLeafs().length - 1; roomIndex++) {
            // for debug
            //for (var roomIndex = 0; roomIndex < 1; roomIndex++) {

            // each room wi
            var foodMaxItemForRoom = getRandomInt(1, 3 + level);
            var room = treeWithRoomAndHall.getLeafs()[roomIndex];
            for (var indexFood = 0; indexFood < foodMaxItemForRoom; indexFood++) {
                var foodKind = getRandomInt(1, 3);
                var foodY = getRandomInt(room.y, room.y + room.height - 1);
                var foodX = getRandomInt(room.x, room.x + room.width - 1);
                while (checkPositionForItem(foodX, foodY)) {
                    foodY = getRandomInt(room.y, room.y + room.height - 1);
                    foodX = getRandomInt(room.x, room.x + room.width - 1);
                }
                var foodType = getRandomInt(FoodEnum.BREAD, FoodEnum.MEAT);

                var food = new Food(foodX, foodY, foodType);
                ground[food.row][food.col].child = food;
                foodItems.push(food);
                items.push(food);
            }

            var monsterMaxItemForRoom = getRandomInt(0, 1 + level);

            for (var indexMonster = 0; indexMonster < monsterMaxItemForRoom; indexMonster++) {
                var monsterY = getRandomInt(room.y, room.y + room.height - 1);
                var monsterX = getRandomInt(room.x, room.x + room.width - 1);
                while (checkPositionForItem(monsterX, monsterY)) {
                    monsterY = getRandomInt(room.y, room.y + room.height - 1);
                    monsterX = getRandomInt(room.x, room.x + room.width - 1);
                }
                var monsterType = getRandomInt(MonsterEnum.RAT, MonsterEnum.CRAB);

                var monster = new Monster(monsterX, monsterY, monsterType);
                monsterItems.push(monster);
                items.push(monster);
                ground[monster.row][monster.col].child = monster;
            }

        }

        var bossesRoom = treeWithRoomAndHall.getLeafs()[treeWithRoomAndHall.getLeafs().length - 1];
        var bossesY = getRandomInt(bossesRoom.y, bossesRoom.y + bossesRoom.height - 1);
        var bossesX = getRandomInt(bossesRoom.x, bossesRoom.x + bossesRoom.width - 1);
        while (checkPositionForItem(bossesX, bossesY)) {
            bossesY = getRandomInt(bossesRoom.y, bossesRoom.y + bossesRoom.height - 1);
            bossesX = getRandomInt(bossesRoom.x, bossesRoom.x + bossesRoom.width - 1);
        }
        var bossesType = BossesType.GOO;

        switch (level) {
            case 1:
            {
                bossesType = BossesType.TENGU;
                break;
            }
            case 2:
            {
                bossesType = BossesType.DM300;
                break;
            }
            case 3:
            {
                bossesType = BossesType.DWARF_KING;
                break;
            }
            case 4:
            {
                bossesType = BossesType.YOG_DZEWA;
                break;
            }
            default:
            {
                bossesType = BossesType.GOO;
                break;
            }
        }

        var bosses = new Bosses(bossesX, bossesY, bossesType);
        ground[bosses.row][bosses.col].child = bosses;

        items.push(bosses);
        return {
            foods: foodItems,
            items: items,
            bosses: bosses
        };
    };

    var { foods, items, bosses } = generateGameItems();
    //console.assert(ground[player.row][player.col] === undefined);
    // if (ground[player.row + 1] === undefined);

    var newState = Object.assign({}, state, {
        level: level + 1, player, ground,
        messages : state.messages.slice(0),
        foods,
        items,
        bosses,
    });
    return newState;

}