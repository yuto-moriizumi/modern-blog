import serverless from 'serverless-http';
import app from './src/app';

// デフォルトexportだと、handlerを見つけられなくなる
// eslint-disable-next-line import/prefer-default-export
export const myhandler = serverless(app);
