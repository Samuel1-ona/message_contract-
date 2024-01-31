// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity  ^0.8.9;

contract  Messages {


    string public message;


    constructor(string memory initialMassage) {
        message = initialMassage;
        
    }

    function SetMessages (string memory Newmessages) public {

        message = Newmessages;
    }


    function GetMassage() public view returns (string memory){

        return message;

    
    }
}