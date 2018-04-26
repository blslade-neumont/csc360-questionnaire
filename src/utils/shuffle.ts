

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * Adapted from https://stackoverflow.com/a/12646864/768597
 */
export function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
