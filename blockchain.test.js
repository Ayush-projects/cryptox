const Blockchain = require('./blockchain');
const Block = require('./block');
describe('Blockchain',()=>{
let bc, bc2;
beforeEach(()=>{
bc = new Blockchain();
bc2 = new Blockchain();

});
it('Start with genesis block',()=>{
     expect(bc.chain[0]).toEqual(Block.genesis());

});
it('Adds a new block' , ()=>{
const data = "foo";
bc.addBlock(data);
expect(bc.chain[bc.chain.length-1].data).toEqual(data);
});
it('validates a valid chain', ()=>{
    bc2.addBlock('foo');
    expect(bc.isValidChain(bc2.chain)).toBe(true);
});
it('Invalidate a chain with corrupt Genesis Block', ()=>{

    bc2.chain[0].data = "bad data";
    expect(bc.isValidChain(bc2.chain)).toBe(false);
});
it('invalidates a corrupt chain', ()=>
{
bc2.addBlock('foo');
bc2.chain[1].data = 'Not Foo';
expect(bc.isValidChain(bc2.chain)).toBe(false);
}); 
it('Replaces the chain with a valid chain', ()=>{
bc2.addBlock('goo');
bc.replaceChain(bc2.chain);
expect(bc.chain).toEqual(bc2.chain);



});





});