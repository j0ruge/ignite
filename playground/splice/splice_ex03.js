import {
  printArrayContent, 
  printArrayRemovedContent, 
  myFish
} from '../utils/index.js';

printArrayContent(myFish);

//remove 1 elemento a partir do índice 2, e insere "trumpet"
var removed = myFish.splice(2, 1, "trumpet");

printArrayContent(myFish);
printArrayRemovedContent(removed);