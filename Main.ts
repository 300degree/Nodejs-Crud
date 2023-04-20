import Express, { Application, Request, Response } from "express"
import Router from "./src/routers/Router"
import bodyParser from "body-parser"
import * as env from "./src/config/configs.json"
import * as path from "path"

class Main {
  private app: Application
  private port: number
  private protocol: string
  private routers = Router

  constructor() {
    this.routers = Router
    this.port = env.PROTOCOL_PORT
    this.protocol = env.HOST
    this.app = Express()
    this.middleware()
    this.router()
    this.index()
  }

  private router(): void {
    this.app.use(this.routers)
  }

  private index(): void {
    this.app.use(Express.static(__dirname + "/public"))
    this.app.get("/", (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname + "index.html"))
    })
  }

  private middleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(Router)
  }
  
  public listen(): void {
    this.app.listen(this.port, () => {
      console.table([
        { MEDTHOD: "GET", HOST: `http://${this.protocol}:${this.port}`, POST: this.port },
        { MEDTHOD: "POST", HOST: `http://${this.protocol}:${this.port}/api/addvalues/person`, POST: this.port },
        { MEDTHOD: "PUT", HOST: `http://${this.protocol}:${this.port}/api/editvalue/person`, POST: this.port },
        { MEDTHOD: "DELETE", HOST: `http://${this.protocol}:${this.port}/api/deletevalue/person`, POST: this.port },
      ])
    })
  }

}

const main = new Main().listen()
