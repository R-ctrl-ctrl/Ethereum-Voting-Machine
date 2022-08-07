// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.5.0 < 0.9.0;

contract Voting{
        uint public qnum;
        struct Questions{
            string question;
            address asker;
            uint questionNumber;
        }

        enum Options{Yes,No,Ignore}

        struct Votes{
            address voterAddress;
            Options option;
            uint questionNumber;
        }

        Questions[] public questions;
        Votes[] public votes;

        function askQuestion(string memory str) public {
                Questions memory q = Questions(str,msg.sender,qnum);
                questions.push(q);
                qnum++;
        }

        Options public option;

       function Vote(uint _questionNumber ,  Options _option) public{
           require(_questionNumber <= qnum);
           bool isvoted = isVoted(_questionNumber);
           if(isvoted == true){
               return;
           }
            option = _option;
            Votes memory v = Votes(msg.sender,option,_questionNumber);
            votes.push(v);
       }



        function isVoted(uint _questionNumber) public view returns(bool){
            for(uint i = 0 ; i<votes.length;i++){
                Votes memory v = votes[i];
                if(v.voterAddress == msg.sender && v.questionNumber  ==  _questionNumber ){
                    return true;
                }
            }
            return false;
        }


    //    

           function giveQuestion(uint num) public view returns(string memory,address,uint){
                Questions memory ques = questions[num];
                return (ques.question,ques.asker,ques.questionNumber);
       }

       function giveVotes(uint num) public view returns(address,Options,uint){
           Votes memory vo = votes[num];
           return (vo.voterAddress,vo.option,vo.questionNumber);
       }

       function questionLength() public view returns(uint){
           return questions.length;
       }

       function votesLength() public view returns(uint){
           return votes.length;
       }

        




}