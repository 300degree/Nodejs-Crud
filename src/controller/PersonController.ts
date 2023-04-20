import * as env from "../config/configs.json"
import { Request, Response } from "express"
import { Pool } from "pg";

export class PersonController {
  private pool: Pool

  constructor() {
    this.pool = new Pool({
      user: env.USER,
      host: env.HOST,
      database: env.DATABASE,
      password: env.PASSWORD,
      port: env.PORT,
    })
  }

  public async getAllValues(_req: Request, res: Response): Promise<void> {
    try {
      const values = await this.pool.query("SELECT * FROM persons")
      res.status(200).json(values.rows)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "internal server error" })
    }
  }

  public async addValues(req: Request, res: Response): Promise<void> {
    try {
      const { name, occupation, country, phone } = req.body

      if (!name || !occupation || !country || !phone) {
        res.status(400).json({message: "missing required fields"})
        return
      }

      const values = [ name, occupation, country, phone ]
      const query = "INSERT INTO persons (name, occupation, country, phone) VALUES($1, $2, $3, $4)"
      const checkValue = "SELECT * FROM persons WHERE name=$1 AND occupation=$2 AND country=$3 AND phone=$4"
      const checkQuery = [ name, occupation, country, phone ]
      const { rows } = await this.pool.query(checkValue, checkQuery)

      if (rows.length > 0) {
        res.status(409).json({ message: "already exists" })
      } else {
        await this.pool.query(query, values)
        res.status(201).json({ message: "successful"})
      } 
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "internal server error" })
    }
  }

  public async editValues(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const { name, occupation, country, phone } = req.body
      
      if (!name || !occupation || !country || !phone) {
        res.status(400).json({message: "missing required fields"})
        return
      }

      const query = "UPDATE persons SET name=$1, occupation=$2, country=$3, phone=$4 WHERE id=$5"
      const values = [ name, occupation, country, phone, id ]
      const { rowCount } = await this.pool.query(query, values)
      if (rowCount === 1) {
        res.status(200).send({ message: "update successful" })
      } else {
        res.status(404).json({ message: "Record not found" })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "internal server error" })
    }
  }

  public async deleteValue(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const query = "DELETE FROM persons WHERE id=$1"
      const values = await this.pool.query(query, [id])
      this.pool.end()

      if (values.rowCount === 1) {
        res.status(204).send({ message: "delete successful"})
      } else {
        res.status(404).json({ message: "Record not found" })
      }
    } catch (error) {
      console.table(error)
      res.status(500).json({ message: "internal server error" })
    }
  }

}
