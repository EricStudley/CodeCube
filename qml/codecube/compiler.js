var ASSIGNMENT_OPERATOR = '=';
var ASSIGNMENT_TERMINATOR_SYMBOL = ';';
var IDENTIFIER_SYMBOL = '$';

var GLOBAL_ASSIGNMENTS = new Array();

var tokenTypeEnum = {
    ASSIGNMENT_IDENTIFIER: "IDENTIFIER",
    ASSIGNMENT_OPERATOR: "ASSIGNMENT_OPERATOR",
    ASSIGNMENT_TERMINATOR: "ASSIGNMENT_TERMINATOR",
    VARIABLE: "VARIABLE",
    COMMAND: "COMMAND"
}

var CommandTypeEnum = {
    CLOCKWISE_LEFT : "CLOCKWISE_LEFT",
    CLOCKWISE_RIGHT : "CLOCKWISE_RIGHT",
    CLOCKWISE_UP : "CLOCKWISE_UP",
    CLOCKWISE_DOWN : "CLOCKWISE_DOWN",
    CLOCKWISE_FRONT : "CLOCKWISE_FRONT",
    CLOCKWISE_BACK : "CLOCKWISE_BACK",
    COUNTERWISE_LEFT : "COUNTERWISE_LEFT",
    COUNTERWISE_RIGHT : "COUNTERWISE_RIGHT",
    COUNTERWISE_UP : "COUNTERWISE_UP",
    COUNTERWISE_DOWN : "COUNTERWISE_DOWN",
    COUNTERWISE_FRONT : "COUNTERWISE_FRONT",
    COUNTERWISE_BACK : "COUNTERWISE_BACK",
}

//A program consists of commands and assignments
//An assignment consists of commands

function programStringToProgramList(programString){
    var programStringCopy = programString;
    var programStringSpaced = programStringCopy.replace(ASSIGNMENT_TERMINATOR_SYMBOL," "+ASSIGNMENT_TERMINATOR_SYMBOL);
    programStringSpaced = programStringSpaced.replace(ASSIGNMENT_OPERATOR,ASSIGNMENT_OPERATOR+" ");
    programStringSpaced = programStringSpaced.split(" ");
    return programStringSpaced;
}

function isAssignment_operator(untokenizedProgramElement){
    return (untokenizedProgramElement==ASSIGNMENT_OPERATOR);
}

function isIdentifier_symbol(untokenizedProgramElement){
    return (untokenizedProgramElement==IDENTIFIER_SYMBOL);
}
function isAssignment_terminator(untokenizedProgramElement){
    return (untokenizedProgramElement==ASSIGNMENT_TERMINATOR_SYMBOL);
}
function isIdentifier(untokenizedProgramElement){
    return (isIdentifier_symbol(untokenizedProgramElement[0]) && isAssignment_operator(untokenizedProgramElement[untokenizedProgramElement.length-1]));
}
function isVariable(untokenizedProgramElement){
    return (isIdentifier_symbol(untokenizedProgramElement[0]) && !isAssignment_operator(untokenizedProgramElement[untokenizedProgramElement.length-1]));
}
function isCommand(untokenizedProgramElement){
    return commandIdentifierToCommandTypeEnum(untokenizedProgramElement[0]) ? true: false;
}


function tokenizeProgramElement(untokenizedProgramElement){
    var tokenedProgramElement = {
        type: getUntokenizedProgramElementType(untokenizedProgramElement),
        content: untokenizedProgramElement
    }
    return tokenedProgramElement;
}

function getUntokenizedProgramElementType(untokenizedProgramElement){
    if(isCommand(untokenizedProgramElement))
        return tokenTypeEnum.COMMAND;
    else if(isAssignment_operator(untokenizedProgramElement))
        return tokenTypeEnum.ASSIGNMENT_OPERATOR;
    else if(isAssignment_terminator(untokenizedProgramElement))
        return tokenTypeEnum.ASSIGNMENT_TERMINATOR;
    else if(isIdentifier(untokenizedProgramElement))
        return tokenTypeEnum.ASSIGNMENT_IDENTIFIER;
    else if(isVariable(untokenizedProgramElement))
        return tokenTypeEnum.VARIABLE;
    return;
}

function tokenize(untokenizedProgramList,index){
    var tokenizedProgramList = new Array();
    var tokenizingAssignment = false;
    var tokenizedAssignment;
    var tokenizedAssignmentList = new Array();

    for (var i = index; i < untokenizedProgramList.length; i++) {
        var tokenizedProgramElement = tokenizeProgramElement(untokenizedProgramList[i]);

        if(tokenizedProgramElement.type==tokenTypeEnum.ASSIGNMENT_OPERATOR)//Skips over = symbol
            continue;

        //This is a statement so we must assign contents to the assignment
        else if(tokenizedProgramElement.type==tokenTypeEnum.ASSIGNMENT_IDENTIFIER){
            tokenizedAssignment = tokenizedProgramElement;
            tokenizingAssignment = true;
        }

        //Terminator means we must return all the assignment data to the previous recursion
        else if(tokenizedProgramElement.type==tokenTypeEnum.ASSIGNMENT_TERMINATOR){
            tokenizedAssignment["data"] = tokenizedAssignmentList;
            tokenizedProgramList.push(tokenizedAssignment)
            tokenizedAssignmentList = new Array();
            tokenizingAssignment = false;
        }
        else if(tokenizedProgramElement.type==tokenTypeEnum.VARIABLE){
            tokenizedProgramList.push(tokenizedProgramElement)
        }
        //We know it's a command, we just need to find out which command it is now
        else if(tokenizedProgramElement.type==tokenTypeEnum.COMMAND){
            tokenizedProgramElement["count"] = getNumbersFromString(tokenizedProgramElement.content);
            tokenizedProgramElement["name"] = commandIdentifierToCommandTypeEnum(removeNumbersFromString(tokenizedProgramElement.content));
            if(!tokenizedProgramElement["count"])
                tokenizedProgramElement["count"]=1;
            if(tokenizingAssignment){
                tokenizedAssignmentList.push(tokenizedProgramElement)
            }
            else{
                tokenizedProgramList.push(tokenizedProgramElement)
            }
        }
        else {

        }
    }

    return tokenizedProgramList;
}

function getNumbersFromString(stringWithNumber){
    var numbers = stringWithNumber.match(/\d+\.?\d*/g);
    //alert(stringWithNumber);
    if(numbers)
        return numbers[0];
}
function removeNumbersFromString(stringWithNumber){
    return stringWithNumber.replace(/[0-9]+/g,'');
}

function printoutList(tokenizedProgramList){
    for(var i = 0; i < tokenizedProgramList.length; i++){
        document.write(tokenizedProgramList[i].type+": "+tokenizedProgramList[i].content+"<br />");
        //console.log(tokenizedProgramList[i]);
    }
}
function tokenizer(programString){
    var untokenizedProgramList = programStringToProgramList(programString);
    var tokenizedProgramList = tokenize(untokenizedProgramList,0);
    return tokenizedProgramList;
}

function commandIdentifierToCommandTypeEnum(commandIdentifier){
    switch(commandIdentifier){
        case "L": return CommandTypeEnum.CLOCKWISE_LEFT;
        case "R": return CommandTypeEnum.CLOCKWISE_RIGHT;
        case "U": return CommandTypeEnum.CLOCKWISE_UP;
        case "D": return CommandTypeEnum.CLOCKWISE_DOWN;
        case "F": return CommandTypeEnum.CLOCKWISE_FRONT;
        case "B": return CommandTypeEnum.CLOCKWISE_BACK;
        case "L'": return CommandTypeEnum.COUNTERKWISE_LEFT;
        case "R'": return CommandTypeEnum.COUNTERWISE_RIGHT;
        case "U'": return CommandTypeEnum.COUNTERWISE_UP;
        case "D'": return CommandTypeEnum.COUNTERWISE_DOWN;
        case "F'": return CommandTypeEnum.COUNTERWISE_FRONT;
        case "B'": return CommandTypeEnum.COUNTERWISE_BACK;
    }
}

function addAssignmentsToGlobalAssignments(assignment){
    for(var i = 0; i < assignment.length; i++){
        var assignmentName = assignment[i].content.substring(0, assignment[i].content.length - 1);
        GLOBAL_ASSIGNMENTS[assignmentName] = assignment[i].data;
    }
}

function getAssignmentInProgram(tokenList){
    var assignments = [];
    for(var i = 0; i < tokenList.length; i++){
        if(tokenList[i].type == tokenTypeEnum.ASSIGNMENT_IDENTIFIER){
            assignments.push(tokenList[i]);
            tokenList.splice(i,1);
        }
    }
    return assignments;
}
function replaceVariablesInProgram(tokenList){
    for(var i = 0; i < tokenList.length; i++){
        if(tokenList[i].type == tokenTypeEnum.VARIABLE){
            var assignmentName = tokenList[i].content;
            tokenList[i] = GLOBAL_ASSIGNMENTS[assignmentName];
        }
    }
}

function runCommand(commandTokenName){
    switch(commandTokenName){
        case CommandTypeEnum.CLOCKWISE_LEFT: clockwiseLeft(); break;
        case CommandTypeEnum.CLOCKWISE_RIGHT: clockwiseRight(); break;
        case CommandTypeEnum.CLOCKWISE_UP: clockwiseUp(); break;
        case CommandTypeEnum.CLOCKWISE_DOWN: clockwiseDown(); break;
        case CommandTypeEnum.CLOCKWISE_FRONT: clockwiseFront(); break;
        case CommandTypeEnum.CLOCKWISE_BACK: clockwiseBack(); break;
        case CommandTypeEnum.COUNTERWISE_LEFT: counterwiseLeft(); break;
        case CommandTypeEnum.COUNTERWISE_RIGHT: counterwiseRight(); break;
        case CommandTypeEnum.COUNTERWISE_UP: counterwiseUp(); break;
        case CommandTypeEnum.COUNTERWISE_DOWN: counterwiseDown(); break;
        case CommandTypeEnum.COUNTERWISE_FRONT: counterwiseFront(); break;
        case CommandTypeEnum.COUNTERWISE_BACK: counterwiseBack(); break;
    }
}

function runCommands(commandTokens){
    for(var i = 0; i < commandTokens.length; i++){
        if(commandTokens[i] instanceof Array){
            for(var x = 0; x<commandTokens[i].length; x++){
                if(commandTokens[i][x].count){
                    for(var y = 0; y<commandTokens[i][x].count; y++){
                        runCommand(commandTokens[i][x].name);
                    }
                }
            }
        }else{
            if(commandTokens[i].count){
                for(var y = 0; y<commandTokens[i].count; y++){
                    runCommand(commandTokens[i].name);
                }

            }
        }
    }
}

function interpert(programString){
    var tokenList = tokenizer(programString);
    var assignments = getAssignmentInProgram(tokenList);
    addAssignmentsToGlobalAssignments(assignments);
    replaceVariablesInProgram(tokenList);
    runCommands(tokenList);

    if(Compiler.solved()){
        outputText.text = "You solved the cube in " + tokenList.length + " commands."
    }
    else{
        outputText.text = "You failed to solve the cube after " + tokenList.length + " commands."
    }
}


function shiftX(){
    clockwiseRight()
    counterwiseLeft()
}

function shiftY(){
    clockwiseUp()
    counterwiseDown()
}

function shiftZ(){
    clockwiseFront()
    counterwiseBack()
}

function getRandom(minimum,maximum){
    var now=new Date()
    return Math.floor(Math.random(now.getSeconds())*(maximum-minimum+1))+minimum;
}

function shuffle(){
    for(var i = 0; i < 20; i++){
        switch(getRandom(1,12)){
        case 1: clockwiseLeft(); break;
        case 2: clockwiseRight(); break;
        case 3: clockwiseUp(); break;
        case 4: clockwiseDown(); break;
        case 5: clockwiseFront(); break;
        case 6: clockwiseBack(); break;
        case 7: counterwiseLeft(); break;
        case 8: counterwiseRight(); break;
        case 9: counterwiseUp(); break;
        case 10: counterwiseDown(); break;
        case 11: counterwiseFront(); break;
        case 12: counterwiseBack(); break;
        }
    }
}

function parse(commandString){
    var commands = commandString.split(" ");
    for(var i = 0; i < commands.length; i++){
        switch(commands[i]){
        case "L": clockwiseLeft(); break;
        case "R": clockwiseRight(); break;
        case "U": clockwiseUp(); break;
        case "D": clockwiseDown(); break;
        case "F": clockwiseFront(); break;
        case "B": clockwiseBack(); break;
        case "L'": counterwiseLeft(); break;
        case "R'": counterwiseRight(); break;
        case "U'": counterwiseUp(); break;
        case "D'": counterwiseDown(); break;
        case "F'": counterwiseFront(); break;
        case "B'": counterwiseBack(); break;
        default: outputText.text = "Error parsing input."; break;
        }
    }
}

function solved(){
    if((zero.color==one.color & one.color==two.color & two.color==three.color & three.color==zero.color) &
            (four.color==five.color & five.color==six.color & six.color==seven.color & seven.color==four.color) &
            (eight.color==nine.color & nine.color==ten.color & ten.color==eleven.color & eleven.color==eight.color) &
            (twelve.color==thirteen.color & thirteen.color==fourteen.color & fourteen.color==fifteen.color & fifteen.color==twelve.color) &
            (sixteen.color==seventeen.color & seventeen.color==eighteen.color & eighteen.color==nineteen.color & nineteen.color==sixteen.color) &
            (twenty.color==twentyone.color & twentyone.color==twentytwo.color & twentytwo.color==twentythree.color & twentythree.color==twenty.color)){
        return true
    }
    else{
        return false
    }
}

function reset(){
    zero.color="#ffffff"
    one.color="#ffffff"
    two.color="#ffffff"
    three.color="#ffffff"
    four.color="#008000"
    five.color="#008000"
    six.color="#008000"
    seven.color="#008000"
    eight.color="#ff0000"
    nine.color="#ff0000"
    ten.color="#ff0000"
    eleven.color="#ff0000"
    twelve.color="#0000ff"
    thirteen.color="#0000ff"
    fourteen.color="#0000ff"
    fifteen.color="#0000ff"
    sixteen.color="#ffa500"
    seventeen.color="#ffa500"
    eighteen.color="#ffa500"
    nineteen.color="#ffa500"
    twenty.color="#ffff00"
    twentyone.color="#ffff00"
    twentytwo.color="#ffff00"
    twentythree.color="#ffff00"
}

function clockwiseLeft(){
    blank.color = four.color
    four.color = six.color
    six.color = seven.color
    seven.color = five.color
    five.color = blank.color

    blank.color = eight.color
    eight.color = zero.color
    zero.color = nineteen.color
    nineteen.color = twenty.color
    twenty.color = blank.color

    blank.color = ten.color
    ten.color = two.color
    two.color = seventeen.color
    seventeen.color = twentytwo.color
    twentytwo.color = blank.color
}

function clockwiseRight(){
    blank.color = twelve.color
    twelve.color = fourteen.color
    fourteen.color = fifteen.color
    fifteen.color = thirteen.color
    thirteen.color = blank.color

    blank.color = nine.color
    nine.color = twentyone.color
    twentyone.color = eighteen.color
    eighteen.color = one.color
    one.color = blank.color

    blank.color = eleven.color
    eleven.color = twentythree.color
    twentythree.color = sixteen.color
    sixteen.color = three.color
    three.color = blank.color
}

function clockwiseUp(){
    blank.color = zero.color
    zero.color = two.color
    two.color = three.color
    three.color = one.color
    one.color = blank.color

    blank.color = nine.color
    nine.color = thirteen.color
    thirteen.color = seventeen.color
    seventeen.color = five.color
    five.color = blank.color

    blank.color = eight.color
    eight.color = twelve.color
    twelve.color = sixteen.color
    sixteen.color = four.color
    four.color = blank.color
}

function clockwiseDown(){
    blank.color = twenty.color
    twenty.color = twentytwo.color
    twentytwo.color = twentythree.color
    twentythree.color = twentyone.color
    twentyone.color = blank.color

    blank.color = ten.color
    ten.color = six.color
    six.color = eighteen.color
    eighteen.color = fourteen.color
    fourteen.color = blank.color

    blank.color = eleven.color
    eleven.color = seven.color
    seven.color = nineteen.color
    nineteen.color = fifteen.color
    fifteen.color = blank.color
}

function clockwiseFront(){
    blank.color = eight.color
    eight.color = ten.color
    ten.color = eleven.color
    eleven.color = nine.color
    nine.color = blank.color

    blank.color = seven.color
    seven.color = twentyone.color
    twentyone.color = twelve.color
    twelve.color = two.color
    two.color = blank.color

    blank.color = five.color
    five.color = twenty.color
    twenty.color = fourteen.color
    fourteen.color = three.color
    three.color = blank.color
}

function clockwiseBack(){
    blank.color = sixteen.color
    sixteen.color = eighteen.color
    eighteen.color = nineteen.color
    nineteen.color = seventeen.color
    seventeen.color = blank.color

    blank.color = fifteen.color
    fifteen.color = twentytwo.color
    twentytwo.color = four.color
    four.color = one.color
    one.color = blank.color

    blank.color = thirteen.color
    thirteen.color = twentythree.color
    twentythree.color = six.color
    six.color = zero.color
    zero.color = blank.color
}

function counterwiseLeft(){
    clockwiseLeft()
    clockwiseLeft()
    clockwiseLeft()
}

function counterwiseRight(){
    clockwiseRight()
    clockwiseRight()
    clockwiseRight()
}

function counterwiseUp(){
    clockwiseUp()
    clockwiseUp()
    clockwiseUp()
}

function counterwiseDown(){
    clockwiseDown()
    clockwiseDown()
    clockwiseDown()
}

function counterwiseFront(){
    clockwiseFront()
    clockwiseFront()
    clockwiseFront()
}

function counterwiseBack(){
    clockwiseBack()
    clockwiseBack()
    clockwiseBack()
}
