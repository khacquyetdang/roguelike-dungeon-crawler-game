var debugVar = false;
if (process.env.NODE_ENV === "production") {
    debugVar = false;
}

export const baseUrl = process.env.PUBLIC_URL;
export const debug = debugVar;

export const animationTimeOut = {
    switchHero : 2000,
    newLevel : 6000,
    gameWin : 4000,
    gameOver : Number.MAX_VALUE,
};
