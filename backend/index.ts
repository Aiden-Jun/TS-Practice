import express, {Request, Response, NextFunction, query} from 'express';
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

app.get('/products', (req, res) => {
  console.log('hmhhhhh');
  console.log(req.query);

  res.setHeader('Access-Control-Allow-Origin', '*');
  if (!req.query) {
    return res.json({
      products: [
        {title: 'pet monkey', price: 1, description: 'cool pet monkey'},
        {title: 'macbook 200 inch', price: 414324, description: 'cool laptop huge'},
      ],
    });
  } else {
    const {email} = req.query;
    return res.json({
      products: [
        {title: 'pet monkey', price: 1, description: 'cool pet monkey'},
        {title: 'macbook 200 inch', price: 414324, description: 'cool laptop huge'},
      ],
    });
  }
});

app.post('/login', parseBody, async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const {email, password} = req.body;
  const loginUser = await authService.getUser(email, password);
  return res.json({user: loginUser});
});

app.post('/product', parseBody, async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const {title, price, description} = req.body;
  return res.json({product: {title, price, description}});
});

app.post('/sign-up', parseBody, async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const {email, password, nickname, userType, money} = req.body;
  if (await authService.doesThisEmailExist(email)) {
    return res.json({message: 'The email provided already exists.', isSignedUp: false});
  }
  authService.addUser(email, password, nickname, userType, money);
  return res.json({
    message: 'Sucess',
    isSignedUp: true,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
