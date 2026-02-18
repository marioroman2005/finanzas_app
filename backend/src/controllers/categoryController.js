import CategoryModel from '../models/categoryModel.js';

export const listCategories = async (req, res) => {
  const user_id = req.user.id;

  try {
    const categories = await CategoryModel.findAll(user_id);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
};

export const createCategory = async (req, res) => {
  const { name, type, color } = req.body;
  const user_id = req.user.id;

  if (!name || !type) {
    return res.status(400).json({ message: 'Nombre y tipo son requeridos' });
  }

  try {
    const newCategory = await CategoryModel.create(
      user_id,
      name,
      type,
      color || '#cccccc',
    );
    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la categoría' });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    // Check ownership. Default categories (user_id === null) cannot be deleted.
    if (category.user_id !== user_id) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para eliminar esta categoría' });
    }

    await CategoryModel.delete(id);
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la categoría' });
  }
};
