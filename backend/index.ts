import express, {Request, Response, NextFunction, query} from 'express';
import AuthService from './service/auth-service.js';
import {ProductService} from './service/product-service.js';
const app = express();
const port = 3000;

const authService = new AuthService();
const productService = new ProductService();

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

app.get('/products', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const {type} = req.query;

  if (!type) {
    return res.json({
      products: [
        {title: 'pet monkey', price: 1, description: 'cool pet monkey'},
        {title: 'macbook 200 inch', price: 414324, description: 'cool laptop huge'},
      ],
    });
  } else if (type === 'selling') {
    const {email} = req.query;
    const products = await productService.getSellingProducts();
    return res.json({products});
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
  const {userId, title, price, description} = req.body;
  const result = await productService.addSellerProduct(userId, title, price, description);
  if (result) {
    return res.json({product: {title, price, description}, message: '상품이 추가되었습니다'});
  } else {
    return res.json({product: undefined, message: '상품 추가에 실패했습니다. 다시 시도해주세요'});
  }
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
