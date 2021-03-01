import path from 'path';

module.exports = {
    entry: './server.js',
    mode: 'production',
    target: 'node',
    output: {
        path: path.resolve(__dirname, '.'),
        filename: 'server.bundle.js'
    }
}