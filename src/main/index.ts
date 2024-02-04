import setupApp from './config/app';
import env from './config/env';

const app = setupApp();
app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${env.port}`);
});
