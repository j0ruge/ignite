const fs = require("fs");
//const { parse } = require("csv-parse");
import {parse} from 'csv-parse'

const sample_file = '../posts.csv';

fs.createReadStream(sample_file)
    .on('error', () => {
        // Tratativa do erro
    })
    .pipe(parse())
    .on('data',(row)=>{
        let str = `${row["BUYER NAME"]} bought ${row["CANDY PURCHASED"]} pieces of candy on ${row["PURCHASE DATE"]} and paid $${row["CASH PAID"]}.`;
         console.log(str)
         console.log('-------------------');
    })
    .on('end', () => {
        // Tratativa do fim do arquivo
    })
    console.log('Fim da execução');