// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DAppDrive {
    // counter
    uint public counter;

    // structure
    struct Driver {
        uint id;
        address walletAddress;
        string name;
        uint age;
        uint cardNo;
        string image;
    }
    // structure objects
    // Driver private driver;

    // Mapping of structure Data
    mapping(uint256 => Driver) private storeDriver;

    constructor() {
        storeDriver[0] = Driver(
            counter,
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
            'Imran Khan',
            23,
            1730111256489,
            'https://ipfs-2.thirdwebcdn.com/ipfs/QmY5HAGSLZgdkQeHp85GkysUF1kwXWU2mzytqqEawDQkhw/new.jpg'
            );    
    }

    // method for putting values to the mapping 'storeDriver'
    function setDriver(
        address _walletAddress,
        string memory _name,
        uint _age,
        uint _cardNo,
        string memory _image
        ) public {
        counter++;

        storeDriver[counter] = Driver(
            counter,
            _walletAddress,
            _name,
            _age,
            _cardNo,
            _image
            );
    }

    // method to get values from the mapping 'storeDriver' of the specified index
    function getDriver(uint _index) public view returns(Driver memory) {
        return storeDriver[_index];
    }
}