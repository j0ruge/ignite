import {
  printArrayContent, 
  printArrayRemovedContent, 
  myFish
} from '../utils/index.js';

printArrayContent(myFish);

//remove 1 elemento do índice 3
var removed = myFish.splice(3, 1);

printArrayContent(myFish);
printArrayRemovedContent(removed);