import App from './app.js';

if (typeof window !== 'undefined') {
  const app = new App();
  app.main();
}
