# DAPP-election-vote-eth-blockchain
Decentralized application to vote in election based on eth blockchain

## Install this project : 

First you have to download metamask as chrome extension

Then download Ganache here : https://truffleframework.com/ganache

You will need Node.js as well 

When you have all of that, use npm to get truffle : 
``` npm install -g truffle```

Create a directory, clone this projet, and lunch ```npm install```

## Test

To launch test, go to the project directory, and launch in CLI ```truffle test```

This project use Mocha and Chai as Test development

## Project

To launch the projet : 

- Start Ganache
- Connect metaMask to a local network (basicaly http:/localhost:7545)
- If needed, launch in CLI ```truffle migrate```  to compile smart contract and get datas
- Then do ```npm run dev``` to run the project have have a look on http:/localhost:3000
