class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //BUILD QUERY
    //creamos un array con todas lo que trae req.query
    //uso deconstruccion para crear un indice para cada palabra
    const queryObj = { ...this.queryString };
    const exludedFields = ['page', 'sort', 'limit', 'fields'];
    exludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    //SORTING

    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      //sort('price ratingsAvenue')
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    // FIELD LIMITING

    if (this.queryString.fields) {
      const fieldBy = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fieldBy);
      //sort('price ratingsAvenue')
    } else {
      this.query = this.query.select('-__v'); //excluimos el campo __v
    }

    return this;
  }

  paginate() {
    //PAGINATION

    //se multiplica por 1 para hacer que un string sea entero
    // |1 = default 1
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIfeatures;
