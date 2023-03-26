// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract StudentTeacherVerifier {
    mapping(address => bool) private students;
    mapping(address => bool) private teachers;

    event StudentAdded(address indexed studentAddress);
    event TeacherAdded(address indexed teacherAddress);

    function addStudent(address studentAddress) public {
        students[studentAddress] = true;
        emit StudentAdded(studentAddress);
    }

    function addTeacher(address teacherAddress) public {
        teachers[teacherAddress] = true;
        emit TeacherAdded(teacherAddress);
    }

    function isStudent(address userAddress) public view returns (bool) {
        return students[userAddress];
    }

    function isTeacher(address userAddress) public view returns (bool) {
        return teachers[userAddress];
    }

    function verify(address userAddress) public view returns (string memory) {
        if (isStudent(userAddress)) {
            return "User is a student";
        } else if (isTeacher(userAddress)) {
            return "User is a teacher";
        } else {
            return "User is neither a student nor a teacher";
        }
    }
}
