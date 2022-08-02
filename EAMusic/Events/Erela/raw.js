const client = require("../../index.js");

module.exports = {
    name: "raw"
}
client.on("raw", (d) => client.manager.updateVoiceState(d));