import {
  printArrayContent, 
  printArrayRemovedContent, 
  myFish
} from '../utils/index.js';

printArrayContent(myFish);
/**
 * remove 0 elementos a partir do índice 2, e insere "drum",
 * na prática ele "empurra" o item para o próximo índice e o novo elemento passará a ser o índice 2
 */ 
var removed = myFish.splice(2, 0, "drum");

printArrayContent(myFish);
printArrayRemovedContent(removed);