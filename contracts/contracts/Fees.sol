//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken, ISuperApp} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { SuperTokenV1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

error Unauthorized();

contract Fees {

    address public owner;
    uint256 public fees=10;
    using SuperTokenV1Library for ISuperToken;

    ISuperToken public feetoken;

    // fDAIx:0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f
    // fDAI :0x88271d333C72e51516B67f5567c728E702b3eeE8

    mapping(address => bool) public feesPaid;
    address[] students; 

    constructor(ISuperToken _feetoken,address _owner) {
        owner = _owner;
        feetoken = _feetoken;
    }

    function addStudent(address _student) public {
        students.push(_student);
    }

    function createFlowFromContract(address receiver,int96 flowRate) public {
        feetoken.createFlow(receiver, flowRate);
    }

    function updateFlowFromContract(address receiver,int96 flowRate) internal {
        feetoken.updateFlow(receiver, flowRate);
    }

    function deleteFlowFromContract(address receiver) external {
        feetoken.deleteFlow(address(this), receiver);
    }

    function checkStudent(address student) public view returns(bool){
        for(uint i = 0; i<students.length;i++){
            if(students[i] == student){
                return true;
            }
        }
        return false;
    }
    function funding() external {
        require(checkStudent(msg.sender), "Student doesn't exist");
        uint256 time = 31536000;
        int256 rate = int256(fees / time);  
        int96 flowrate = int96(rate);
        createFlowFromContract(owner,flowrate);
    }
}