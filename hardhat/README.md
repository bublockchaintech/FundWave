# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

- 1.Account - DAO - Owner
- Last 5 Account - Multi Signature

0xdD870fA1b7C4700F2BD7f44238821C26f7392148,
0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB,
0x583031D1113aD414F02576BD6afaBfb302140225,
0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C,
0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c

- DAO Address - 0x32316fE3DDf621fdAa71437Df19b94F9830c1118

1. Create DAO Contract with 1.account
2. Create MultiSignature Wallet with last 5 account
3. requestForMultiSignature wallet to DAO.
4. approveRequest from DAO.
5. Initialize the stage
6. Set stage to creation
7. Create MultiSignature Wallet with last 5 to last 10

0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC,
0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C,
0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7,
0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678,
0x17F6AD8Ef982297579C203069C1DbfFE4348c372

8. request wallet from dao owner.
9. Create project with second account
10. setStageToFund
11. Fund from second, third and fourth accounts
    - 1,1 - 18000000000000000000,9
    - 1,2 - 4000000000000000000,4
    - Money pool has 22000000000000000000
12. setStageToExecution
