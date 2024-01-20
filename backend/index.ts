import express, {Request, Response, NextFunction} from 'express';
import AuthService from './service/auth-service.js';
const app = express();
const port = 3000;

const authService = new AuthService();

app.use(express.urlencoded());

const parseBody = (req: Request, res: Response, next: NextFunction) => {
  req.body = JSON.parse(Object.keys(req.body)[0]);
  next();
};
app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.json({
    message: 'hello',
  });
});
app.post('/login', parseBody, async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const {email, password} = req.body;
  console.log(email);
  console.log(password);
  const loginUser = authService.getUser(email, password);
  return res.json(loginUser);
});
app.post('/sign-up', parseBody, async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const {email, password} = req.body;
  return res.json({
    message: 'post 확인 성공',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
