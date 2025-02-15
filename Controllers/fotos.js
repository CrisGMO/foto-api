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
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  deleteById = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await this.fotoModel.deleteById(id);
      if (!result) {
        return res.status(404).json({ error: 'Foto not found' });
      }
      console.log(result);
      return res.status(200).json({ message: `Foto with id=${id} has been deleted` });
    } catch (err) {
      console.error("Error deleting foto", err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  deleteAll = async (req, res) => {
    try {
      await this.fotoModel.deleteAll();
      return res.status(200).json({ message: 'All rows deleted' });
    } catch (err) {
      console.error("Error deleting all fotos", err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  getLast = async (req, res) => {
    try {
      const result = await this.fotoModel.getLast();
      if (!result) {
        return res.status(404).json({ error: 'No fotos found' });
      }
      return res.status(200).json(result);
    } catch (err) {
      console.error("Error getting last foto", err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
