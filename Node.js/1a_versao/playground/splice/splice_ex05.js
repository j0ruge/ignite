import {
  printArrayContent, 
  printArrayRemovedContent, 
  myFish
} from '../utils/index.js';

printArrayContent(myFish);

//remove 2 elementos a partir do indice 3
var removed = myFish.splice(3, Number.MAX_VALUE);

printArrayContent(myFish);
printArrayRemovedContent(removed);