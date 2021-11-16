export function printArrayContent(variable){
  console.log(`Conteúdo da variável: ${variable} com ${variable.length} elementos`);  
};
  
export function printArrayRemovedContent(variable){
  if(variable.length === 0){
    return console.log('Nenhum item foi removido do Array.');
  }
  const result = variable.length === 1 ? `Foi removido ${variable.length} um elemento do array: "${variable}"` : `Foram removidos "${variable}", totalizando ${variable.length} elementos.`  
  console.log(result);  
};

export var myFish = ["angel", "clown", "mandarin", "surgeon"];