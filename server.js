const http = require('http');
/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');

    const {
        method,
        url
    } = request;

    if (url == '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: `Anda sedang melakukan ${method} pada root url...`,
            }));
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Method ${method} tidak didukung root url!`,
            }));
        }
    } else if (url == '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: `Anda sedang melakukan ${method} pada about url...`,
            }));
        } else if (method === 'POST') {
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            });
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: `${name} sedang melakukan ${method} pada about url...`,
                }));
            });
        } else if (method === 'PUT') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: `Anda sedang melakukan ${method} pada about url...`,
            }));
        } else if (method === 'DELETE') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: `Anda sedang melakukan ${method} pada about url...`,
            }));
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Method ${method} tidak didukung root url!`,
            }));
        }
    } else {
        response.statusCode = 404;
        response.end('<p>URL tidak ditemukan!</p>')
        response.end(JSON.stringify({
            message: `Method ${method} tidak didukung root url!`,
        }));
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});