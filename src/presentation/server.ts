import express ,{ Router, Express } from "express";
import cors from 'cors'
import path from "path";
import morgan from "morgan";

import { corsConfig } from "../config/cors";


interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}


export class Server {
  public readonly app: Express = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    this.app.use(cors(corsConfig))
    // Middlewares
    this.app.use(morgan('dev'))
    this.app.use(express.json())

    // Public folder
    this.app.use(express.static(this.publicPath));

    // Routes
    this.app.use(this.routes);

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get('/{*splat}', (req, res) => {
      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port || 4000}`);
    });
  }

  public close() {
    this.serverListener?.close()
  }
}