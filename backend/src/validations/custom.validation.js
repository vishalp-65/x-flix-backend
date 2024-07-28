const { genre } = require('../utils/enum')

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const videoLink = (value, helpers) => {
  if (!value.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)) {
    return helpers.message('Link should be valid')
  }
  return value;
}

const genres = (value, helpers) => {
  const valueArray = value.split(',');
  if (!valueArray.every((val) => genre.includes(val))) {
    return helpers.message(`\"genres\" must be one of ${genre}`)
  }
  return value
}

module.exports = {
  objectId,
  videoLink,
  genres
}