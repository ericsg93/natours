const APIfeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No document found with that id`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No document found with that id`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, populateOption) =>
  catchAsync(async (req, res, next) => {
    //console.log(req.params);
    //const id = req.params.id * 1;

    //Find by Id = Tour.findOne({_id: req.params.id}) || populate se usa para traer los users xq en la bd solo esta como ref el id
    let query = Model.findById(req.params.id);

    if (populateOption) {
      query = query.populate(populateOption);
    }
    const doc = await query;

    if (!doc) {
      return next(new AppError(`No document found with that id`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    /* OTRA FORMA DE HACER QUERYS 
        const query = Tour.find()
        .where('duration')
        .equals(5)
        .where('difficulty')
        .equals('easy'); */

    //To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIfeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    //Execute query
    const doc = await features.query;
    //.explain();

    //Send response
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc, // es lo mismo que tours: tours
      },
    });
  });
