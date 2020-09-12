const config = {
  web: {
    client_id: 'yourid.apps.googleusercontent.com',
    project_id: 'galleryvr',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: 'your-secret',
    redirect_uris: ['http://localhost:3000/google/redirect'],
    javascript_origins: ['http://localhost:3000'],
  },
};
export default config;
