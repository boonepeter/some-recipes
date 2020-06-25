
export let apiBaseUrl = '';
export let baseUrl = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    apiBaseUrl = 'http://localhost:3003/api'
    baseUrl = 'http://localhost:3001';
} else {
    apiBaseUrl = 'https://some-recipes.azurewebsites.net/api';
    baseUrl = 'https://some-recipes.azurewebsites.net';
}

