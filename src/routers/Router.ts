import { PersonController } from "../controller/PersonController";
import { Router, Request, Response } from "express"

class Routers {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes(): void {
    this.router.post("/", this.getAllValuesRouter)
    this.router.post("/api/addvalues/person", this.addValuesRouter)
    this.router.put("/api/editvalue/person/:id", this.editValuesRouter)
    this.router.delete("/api/deletevalue/person/:id", this.deleteValueRouter)
  }

  private getAllValuesRouter(req: Request, res: Response) {
    try {
      const controller = new PersonController()
      controller.getAllValues(req, res)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "internal server error" })
    }
  }

  private addValuesRouter(req: Request, res: Response) {
    try {
      const controller = new PersonController()
      controller.addValues(req, res)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "internal server error" })
    }
  }

  private editValuesRouter(req: Request, res: Response) {
    try {
      const controller = new PersonController()
      controller.editValues(req, res)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "internal server error" })
    }
  }

  private deleteValueRouter(req: Request, res: Response) {
    try {
      const controller = new PersonController()
      controller.deleteValue(req, res)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "internal server error" })
    }
  }
  
}

export default new Routers().router