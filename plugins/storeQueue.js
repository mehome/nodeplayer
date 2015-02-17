var storeQueue = {};
var fs = require('fs');
var mkdirp = require('mkdirp');

storeQueue.path = process.env.HOME + '/.nodeplayer/stored-queue.json';

storeQueue.init = function(_player, callback) {
    player = _player;
    config = _player.config;

    mkdirp(process.env.HOME + '/.nodeplayer');
    if(fs.existsSync(storeQueue.path)) {
        player.queue = JSON.parse(fs.readFileSync(storeQueue.path));
    }

    callback();
};

storeQueue.onBackendsInitialized = function() {
    player.prepareSongs();
};

storeQueue.onQueueModify = function(queue) {
    fs.writeFileSync(storeQueue.path, JSON.stringify(player.queue, undefined, 4));
};
storeQueue.postSongsRemoved = storeQueue.onQueueModify;

module.exports = storeQueue;
