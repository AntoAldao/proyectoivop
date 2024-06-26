import { NextApiRequest, NextApiResponse } from "next";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

const MODELOINVENTARIO = "LOTE FIJO"; // Sacar de tabla configs o del env

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (!db) {
      db = await open({
        filename: "./db/test.db",
        driver: sqlite3.Database,
      });
    }
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

        //TODO agregar modelo de inventario,stock de seg, y punto de pedido. agregar tambien en la tabla de articulo
        let { nombre, stock, precio,modeloInventario, tasaRotacion}:{nombre:String, stock:Number,precio:Number,modeloInventario:string, tasaRotacion:number} = req.body;
        if (!nombre || !stock || !precio || !tasaRotacion) {
            const missingFields = [];
            !nombre && missingFields.push("nombre");
            !stock && missingFields.push("stock");
            !precio && missingFields.push("precio");
            !tasaRotacion && missingFields.push("Tasa de Rotacion");
            return res.status(400).json({ message: `Missing fields: ${missingFields.join(", ")}` });
        }
        if (!modeloInventario) modeloInventario = MODELOINVENTARIO;

        const existing = await db.get(`SELECT * FROM Articulo WHERE nombre = ?`, [nombre]);
        if (existing) {
            return res.status(409).json({ message: "No puede crear un articulo con el mismo nombre que uno existente" });
        }

        const result = await db.run(
            `INSERT INTO Articulo (nombre, stock, modelo_inventario, tasa_rotacion) VALUES (?, ?, ?, ?)`,
            [nombre, stock, modeloInventario, tasaRotacion]
        );
        const date = new Date();
        const result2 = await db.run(
            `INSERT INTO Articulo_Precio_Venta (precio, articulo_id, fecha_inicio) VALUES (?, ?, ?)`,
            [precio, result.lastID, date.toISOString()]
        );
        
        return res.status(200).json({ id: result.lastID })
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}
