import { config } from 'dotenv';

config();

let PORT = process.env.PORT || 3001;
let MONGODB_URI = process.env.MONGODB_URI
let AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

console.log('mongo uri', MONGODB_URI);
export default {
    MONGODB_URI,
    PORT,
    AZURE_STORAGE_CONNECTION_STRING
}