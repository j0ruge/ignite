// Netflix & Spotify 



// process.stdin
//     .pipe(process.stdout);

import { Readable, Writable, Transform } from 'node:stream';


class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10);
        callback(); // Para finalizar a stream
    }
};


class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = Number(chunk.toString());
        const inverseNumber = number * -1;

        callback(null, Buffer.from(String(inverseNumber)));
    }
}

class OneToHundredStream extends Readable {
    index = 1;
    
    _read() {
        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {
                const buffer = Buffer.from(`${i}\n`, 'utf-8');
                this.push(buffer);
            }
        }, 1000);
    }
};

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream());