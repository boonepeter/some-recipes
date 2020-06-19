import * as dotenv from 'dotenv';
dotenv.config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI

console.log('mongo uri', MONGODB_URI);
export default {
    MONGODB_URI,
    PORT
}