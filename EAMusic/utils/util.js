// Taken from https://github.com/Allvaa/lavalink-musicbot/blob/master/src/util.js.

module.exports = class Util {
    static chunk(arr, size) {
        const temp = [];
        for (let i = 0; i < arr.length; i += size) {
            temp.push(arr.slice(i, i + size));
        }
        return temp;
    }
}