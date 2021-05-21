const Block = require('./block');
const fooblock = Block.mineBlock(Block.genesis(), 'food');
console.log(fooblock);