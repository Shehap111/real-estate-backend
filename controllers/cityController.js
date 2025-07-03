import City from '../models/City.js';

export const createCity = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.en || !name?.ar) {
      return res.status(400).json({ error: 'City name must include both English and Arabic' });
    }

    const newCity = new City({ name });
    await newCity.save();
    res.status(201).json(newCity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name?.en || !name?.ar) {
      return res.status(400).json({ error: 'City name must include both English and Arabic' });
    }

    const updatedCity = await City.findByIdAndUpdate(
      id,
      { name },
      { new: true } // عشان يرجع النسخة المحدثة
    );

    if (!updatedCity) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.status(200).json(updatedCity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete a city by ID
export const deleteCity = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCity = await City.findByIdAndDelete(id);
    if (!deletedCity) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};