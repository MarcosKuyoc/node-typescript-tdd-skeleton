import express, {Request, Response} from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Bienvenido a nuestra API REST');
});

app.get('ping', (_req: Request, res: Response) => {
  console.log('Alguien ha solicitado un ping!');
  res.send('pong!');
});

app.listen(PORT, () => {
  console.log(`Iniciando la aplicacion en el puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
})