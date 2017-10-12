import {
    SET_MAPWITHROOMANDHALL, SET_GROUND, SET_PLAYER,
    SET_FOODS, SET_ITEMS,
    ADD_HEALTH, ADD_EXPERIENCE,
    EXP_WARRIOR, EXP_GLADIATOR, EXP_MAGE, EXP_BERSERKER,
    GENERATE_NEXT_LEVEL,
} from '../constant';
import Player, { PlayerEnum } from '../components/Player';
import generateDungeonTreeForMap, {
    createRoomFromBSPTree,
    createHallFromBSPTree,
    generateGroundFromTree,    
} from '../data/BSPDungeon';
import {
    getRandomInt
} from '../data/Utils';


import Food, { FoodEnum } from '../components/Food';
import Monster, { MonsterEnum } from '../components/Monster';
import Bosses, { BossesType } from '../components/Bosses';


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
        case GENERATE_NEXT_LEVEL : {
            return generateLevel(state);
        }
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

        var player = new Player(x, y, PlayerEnum.WARRIOR, 100);
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
    
    return Object.assign({}, state, {
        level, player, ground,
        foods,
        items,
        bosses,
    });

}