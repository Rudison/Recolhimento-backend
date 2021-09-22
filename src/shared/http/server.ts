import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import multer from 'multer';
import uploadConfig from '@config/upload';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(uploadConfig.directory));

app.use(routes);
app.use(errors());

// const allowlist = ['http://localhost:8080', 'http://192.168.104.169:8080'];

// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    // response.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    // response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // response.header('Access-Control-Allow-Headers', 'Content-Type');

    // response.header('Access-Control-Allow-Origin: http://localhost:8080');
    // response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // response.header('Access-Control-Allow-Credentials: true');
    // response.header('Access-Control-Max-Age: 86400');

    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error: ${error}`
    });
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
const type = upload.single('file');

app.post('/uploads', type, async (req, res) => {
  res.send({ upload: true, files: req.files });
});

app.listen(3333, () => {
  console.log('Servidor Online Porta (3333). 🚀');
});
