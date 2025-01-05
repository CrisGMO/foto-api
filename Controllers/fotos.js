import { validateFoto, validatePartialFoto } from '../Schemas/fotos.js'

export class FotoController {
  constructor ({ fotoModel }) {
    this.fotoModel = fotoModel
  }

  getCount = async (req, res) => {
    try {
      const count = await this.fotoModel.getCount();
      console.log(count);
      res.json(count);
    } catch (error) {
      console.error("Error fetching photos:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    try {
      const id = req.params.id
      const foto = await this.fotoModel.getById(id);
      console.log(foto);
      res.json(foto);
    } catch (error) {
      console.error("Error fetching photos:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  getAll = async (req, res) => {
    try {
      const fotos = await this.fotoModel.getAll();
      console.log(fotos);
      res.json(fotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
      res.status(500).json({ error: "Internal Server Error Todos" });
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
        return res.status(201).json(result);
      }
    } catch (err) {
      console.error("Error en respuesta");
    }
  }

  deleteById = async (req, res) => {
    const id = req.params.id
    const result = await this.fotoModel.deleteAll(id);
    return res.json(`Foto con id=${id} se ha borrado`);
  }

  deleteAll = async (req, res) => {
    const result = await this.fotoModel.deleteAll();
    return res.json("All Rows Delete");
  }
}
