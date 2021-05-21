const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY, MINE_RATE} = require('./config.js')
class Block{
    constructor(timestamp, lastHash, hash, data,nonce,difficulty)
    {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }
    toString(){
        return `Block - 
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash}
        Hash     : ${this.hash}
        Nonce    :  ${this.nonce}
        Difficulty: ${this.difficulty}
        Data     : ${this.data};
        `
    }
    static genesis()
    {
            return new this('Genesis Time', '--------', 'a7pgh-fgk',[],0, DIFFICULTY);
    }
    static mineBlock(lastBlock, data)
   {   let nonce=0, timestamp,hash;
 
       const lastHash = lastBlock.hash;
       let {difficulty} = lastBlock;
        
     
      do{
          nonce++;
          timestamp = Date.now();
          difficulty = Block.adjustDifficulty(lastBlock, timestamp);
          hash = Block.hash(timestamp,lastHash,data,nonce,difficulty);
        
      }
      while(hash.substring(0,difficulty)!== '0'.repeat(difficulty));
      
       return new this(timestamp, lastHash,hash, data,nonce,difficulty);

   }
   static hash(timestamp,lastHash,data,nonce,difficulty)
   {
       return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
   }
   static blockHash(block)
   {
       const {timestamp, lastHash, data,difficulty} = block;
       return Block.hash(timestamp,lastHash,data.nonce,difficulty);
   }
   static adjustDifficulty(lastBlock,currentTime){
       let {difficulty} = lastBlock;
       difficulty = lastBlock.timestamp + MINE_RATE >currentTime ? difficulty + 1: difficulty - 1;
       return difficulty;
   }

};
module.exports = Block;