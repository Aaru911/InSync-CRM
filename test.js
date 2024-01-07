var os = require('os');

var networkInterfaces = os.networkInterfaces();

console.log(networkInterfaces.en0[1].address);