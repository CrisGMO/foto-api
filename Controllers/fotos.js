import { validateFoto, validatePartialFoto } from '../Schemas/fotos.js'

export class FotoController {
  constructor ({ fotoModel }) {
    this.fotoModel = fotoModel
  }

  getAll = async (req, res) => {
    try {
      const fotos = await this.fotoModel.getAll();
      console.log(fotos);
      res.json(fotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  create = async (req, res) => {
    const result = validateFoto(req.body);
    try {
      if (!result.success) {
      // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) });
      }
      else {
        await this.fotoModel.create(result.data);
        res.status(201).json(result);
      }
    } catch (err) {
      console.error("Error en respuesta");
    }
  }

  deleteAll = async (req, res) => {
    const result = await this.fotoModel.deleteAll();
    return res.json("All Rows Delete");
  }
}
