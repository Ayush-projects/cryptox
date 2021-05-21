const Block = require('./block');
class Blockchain{
    constructor()
    {
        this.chain = [Block.genesis()];


    }
    addBlock(data)
    {
        const block = Block.mineBlock(this.chain[this.chain.length-1],data);
        this.chain.push(block);
        return block;
    }
    isValidChain(chain)
    {
        if(JSON.stringify(chain[0]) !=JSON.stringify(Block.genesis()))
        {  
          return false;

        }
      
        for(let i=1; i<chain.length; i++)
        {
            const block = chain[i];
            const lastBlock = chain[i-1];
            if(block.lastHash != lastBlock.hash || block.hash != Block.blockHash(block))
            {
              
                return false;
            }
            
                

        }
        return true;
        
    }
    replaceChain(newChain)
    {   console.log(newChain)
        if(newChain.length<=this.chain.length)
        {
            console.log("Received chain is not longer than current chain");
            return;
        }
        else if(!this.isValidChain(newChain))
        {
            console.log("The Received Chain is not valid");
        }
        else
        {
            console.log("Replacing Chain with the new Chain");
            this.chain = newChain;

        }
     

    }
}

module.exports = Blockchain;