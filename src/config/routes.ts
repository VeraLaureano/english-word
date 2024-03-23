import { VERSION } from './env';

const routes = {
  words: `/api/${VERSION}/words`,
  sentences: `/api/${VERSION}/sentences`,
  private: `/api/${VERSION}/private`
};

export default routes;