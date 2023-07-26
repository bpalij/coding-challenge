import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import csvParser from 'csv-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const filePath = process.env.FILE_PATH;

app.get('/data', (req: Request, res: Response) => {
  
  let streamStarted = false;
  let firstLine = true;
  if (!filePath) {
    res.status(500).send('no filepath');
  }

  fs.createReadStream(filePath as string)
    .on('error', (e) => {
        res.status(500).send(e);
    })
    .pipe(csvParser())
    .on('data', (row) => {
      if(!streamStarted) {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Transfer-Encoding': 'chunked'
        });
        res.write("[");
        streamStarted = true;
      }
      if (!firstLine) {
        res.write(',');
      }
      res.write(JSON.stringify(row));
      firstLine = false;
    })
    .on('end', () => {
      res.write("]");
      res.end();
    })
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
