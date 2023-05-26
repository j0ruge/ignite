import {
  printArrayContent, 
  printArrayRemovedContent, 
  myFish
} from '../utils/index.js';

printArrayContent(myFish);

//remove 2 elementos a partir do índice 0, e insere "parrot", "anemone" e "blue"
var removed = myFish.splice(0, 2, "parrot", "anemome", "blue");

printArrayContent(myFish);
printArrayRemovedContent(removed);