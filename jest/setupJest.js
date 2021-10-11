const { octomock } = require("octomock");

global.octomock = new octomock();
global.octomock.setup();

console.log("OctoMocked");
