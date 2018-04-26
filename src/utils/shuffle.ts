

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * Adapted from https://stackoverflow.com/a/12646864/768597
 */
export function shuffle<T>(array: T[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
