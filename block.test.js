const Block = require('./block');
describe('Block' , ()=>{
let data,lastBlock,block;
beforeEach(()=>{
 data = 'bar';
lastBlock = Block.genesis();
block = Block.mineBlock(lastBlock, data);
});
it('Sets the `data` to match with input data', ()=>{
    expect(block.data).toEqual = data;
});
it('Sets the `lastHash` to match the hash of last block', ()=>{
expect(block.lastHash).toEqual = lastBlock.lastHash;
});
});