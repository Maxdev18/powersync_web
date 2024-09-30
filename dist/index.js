"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const dotenv_1 = __importDefault(require("dotenv"));
const url_1 = __importDefault(require("url"));
// Dependency configurations
dotenv_1.default.config();
// Server configurations
const hostname = '127.0.0.1';
const port = parseInt(process.env.PORT) || 8080;
// Create the server
const server = (0, node_http_1.createServer)((req, res) => {
    const method = req.method;
    const url = req.url;
    const query = url_1.default.parse(req.url, true).query;
    console.log(query, url);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    if (method == 'GET') {
        if (url == '/') {
            res.write("<html><body><h1>Home server route</h1></body></html>");
        }
        else if (url == '/api/v1/products/get-products') {
            res.write("<html><body><h1>Getting products</h1></body></html>");
        }
        else if (url == '/api/v1/users/get-user-account') {
            res.write("<html><body><h1>Getting user account</h1></body></html>");
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write("<html><body><h1>404 Not found</h1></body></html>");
        }
    }
    else if (method == 'POST') {
        if (url == '/api/v1/products/add-product') {
            res.write("<html><body><h1>Adding product</h1></body></html>");
        }
        else if (url == '/api/v1/categories/add-category') {
            res.write("<html><body><h1>Adding category</h1></body></html>");
        }
        else if (url == '/api/v1/users/add-user') {
            res.write("<html><body><h1>Adding user</h1></body></html>");
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write("<html><body><h1>404 Not found</h1></body></html>");
        }
    }
    else if (method == 'PUT') {
        if (url == '/api/v1/categories/update-category-name') {
            res.write("<html><body><h1>Updating category name</h1></body></html>");
        }
        else if (url == '/api/v1/categories/update-category-list') {
            res.write("<html><body><h1>Updating category</h1></body></html>");
        }
        else if (url == '/api/v1/products/update-product-name') {
            res.write("<html><body><h1>Updating product name</h1></body></html>");
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write("<html><body><h1>404 Not found</h1></body></html>");
        }
    }
    else if (method == 'DELETE') {
        if (url.includes('/api/v1/products/delete-product?id=')) {
            res.write("<html><body><h1>Deleting product</h1></body></html>");
        }
        else if (url == '/api/v1/categories/delete-category') {
            res.write("<html><body><h1>Deleting category</h1></body></html>");
        }
        else if (url == '/api/v1/users/delete-user?id=') {
            res.write("<html><body><h1>Deleting user</h1></body></html>");
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write("<html><body><h1>404 Not found</h1></body></html>");
        }
    }
    else {
        // 405 status code indicates a method not supported by the server
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.end();
    }
    res.end();
});
// Listen to server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=index.js.map