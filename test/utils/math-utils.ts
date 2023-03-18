import { BigNumber, utils } from "ethers";

// inspired from https://github.com/sigmachirality/empty-house/blob/main/frontend/src/utils/sampler.ts
export function randomExponent() {
    const randomHex = utils.randomBytes(8);
    return BigNumber.from(randomHex).toBigInt();
}

export function randMoveDelta(xOld: number, yOld: number) {
    function checkBounds(delta: any, xOld: number, yOld: number) {
        const xNew = xOld + delta[0];
        const yNew = yOld + delta[1];
        if (xNew > 5 || xNew < 0 || yNew > 5 || yNew < 0) {
            return false;
        }
        return true;
    }

    let allMoveDeltas = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    // filter out those that go out of bounds on the board
    let allowedMoveDeltas = [];
    for (let i = 0; i < allMoveDeltas.length; i++) {
        if (checkBounds(allMoveDeltas[i], xOld, yOld)) {
            allowedMoveDeltas.push(allMoveDeltas[i]);
        }
    }

    // console.log("xNew:", xOld, "yNew:", yOld);
    // console.log(allowedMoveDeltas);

    // now randomly pick one among them
    const randIndex = randomIntFromInterval(0, allowedMoveDeltas.length - 1);
    return allowedMoveDeltas[randIndex];
}


export function randMoveDelta2() {
    let xDelta = randomIntFromInterval(0, 2) - 1;
    let yDelta;
    if (xDelta === 0) {
        if (randomIntFromInterval(0, 1) === 0) {
            yDelta = -1;
        } else {
            yDelta = 1;
        }
    } else {
        yDelta = randomIntFromInterval(0, 2) - 1;
    }

    return [xDelta, yDelta];
}

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}