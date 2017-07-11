import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import auth from './routes/auth';
import roles from './routes/roles';
import users from './routes/users';
import search from './routes/search';
import documents from './routes/documents';

const app = express();
const publicPath = express.static(path.join(__dirname, '../client/assets'));

app.use('/', publicPath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth/users', auth);
app.use('/api/roles', roles);
app.use('/api/users', users);
app.use('/api/documents', documents);
app.use('/api/search', search);

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
}));

app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 8000);

export default app;
