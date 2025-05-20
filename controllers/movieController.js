const { Movie, Producer, Actor } = require('../models');

// Get all movies with producer and actors
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [
        { model: Producer, as: "Producer" },
        { model: Actor, as: "Actors", through: { attributes: [] } }
      ]
    });
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create movie (expects IDs only)
exports.createMovie = async (req, res) => {
  try {
    const { name, year_of_release, producerId, actorIds } = req.body;
    if (!name || !year_of_release || !producerId || !actorIds?.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const movie = await Movie.create({
      name,
      year_of_release,
      producer_id: producerId
    });

    await movie.setActors(actorIds);

    // Return the created movie with all associations
    const movieWithDetails = await Movie.findByPk(movie.id, {
      include: [
        { model: Producer, as: "Producer" },
        { model: Actor, as: "Actors", through: { attributes: [] } }
      ]
    });

    res.json(movieWithDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

// Update movie (all details, IDs only)
exports.updateMovie = async (req, res) => {
  try {
    const { name, year_of_release, producerId, actorIds } = req.body;
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    await movie.update({
      name,
      year_of_release,
      producer_id: producerId
    });

    await movie.setActors(actorIds);

    // Return updated movie with all associations
    const movieWithDetails = await Movie.findByPk(movie.id, {
      include: [
        { model: Producer, as: "Producer" },
        { model: Actor, as: "Actors", through: { attributes: [] } }
      ]
    });

    res.json(movieWithDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

// Delete movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    await movie.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
