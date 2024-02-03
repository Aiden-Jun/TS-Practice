import App from './store.js';

if (typeof window !== 'undefined') {
  const app = new App();
  app.main();
}
