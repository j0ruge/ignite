import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = Number(chunk.toString());
        const inverseNumber = number * -1;

        console.log(inverseNumber);

        callback(null, Buffer.from(String(inverseNumber)));
    }
};

const server = http.createServer((request, response) => {
    return request
        .pipe(new InverseNumberStream())
        .pipe(response);

});

server.listen(3334, () => console.log('Server is running'));