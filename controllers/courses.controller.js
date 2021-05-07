const db = require("../models/index.js");
const Course = db.course;

//necessary for LIKE operator
const { Op } = require('sequelize');

// calculates limit and offset parameters for Sequelize Model method findAndCountAll(), 
// from API request query parameters: page and size
const getPagination = (page, size) => {
    const limit = size ? size : 10; // limit = size (default is 3)
    const offset = page ? page * limit : 0; // offset = page * size (start counting from page 0)

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {

    const totalItems = data.count;
    const courses = data.rows;
    const currentPage = page;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, courses, totalPages, currentPage };
};

exports.findAll = (req, res) => {
    //get data from request query string
    let { page, size, Description } = req.query;
    const condition = Description ? { description: { [Op.like]: `%${Description}%` } } : null;

    // validate page
    if (page && !req.query.page.match(/^(0|[1-9]\d*)$/g)) {
        res.status(400).json({ message: 'Page number must be 0 or a positive integer' });
        return;
    }
    else
        page = parseInt(page); // if OK, convert it into an integer
    // validate size
    if (size && !req.query.size.match(/^([1-9]\d*)$/g)) {
        res.status(400).json({ message: 'Size must be a positive integer' });
        return;
    } else
        size = parseInt(size); // if OK, convert it into an integer

    // convert page & size into limit & offset options for findAndCountAll
    const { limit, offset } = getPagination(page, size);

    Course.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            // convert response data into custom format
            const response = getPagingData(data, offset, limit);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving courses."
            });
        });
};

exports.create = (req, res) => {

    Course.create(req.body)
    .then(data => {
        res.status(201).json({ message: "New Course created.", location: "/course/" + data.id });
    })
    .catch(err => {
        if (err.name === 'SequelizeValidationError')
        res.status(400).json({ message: err.errors[0].message });
        else
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Course."
        });
    });
}

// List just one course
exports.findOne = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Course.findByPk(req.params.courseID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Course with id ${req.params.courseID}.`
                });
            else
                res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving Course with id ${req.params.courseID}.`
            });
        });
};


// List just one course
exports.delete = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Course.destroy({
        where: {
            id: req.params.courseID
        }
    })
    .then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            res.status(200).json({
                message: `Deleted course with id ${req.params.courseID}.`
            });
         }
      }, function(err){
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Course."
        });
      });
};

exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Course.findByPk(req.params.courseID)
        .then(data => {
            if (data === null)
                res.status(404).json({
                    message: `Not found Course with id ${req.params.courseID}.`
                });
            else
                if (!req.body.Description)
                {
                    res.status(400).json({
                        message: `Error - Data fields are null!`
                    });
                }

                data.Description = req.body.Description;
                data.save();
                res.status(200).json({
                    message: `Updated Course with id ${req.params.courseID}.`
                });
        })
        .catch(err => {
            res.status(500).json({
                message: `${err.message} Error retrieving Course with id ${req.params.courseID}.`
            });
        });
};


/*

// List just one course
exports.update = (req, res) => {
    // obtains only a single entry from the table, using the provided primary key
    Course.update(req.body,
    
    {
        where: {
            id: req.params.courseID
        }
    })
    .then(function(rowUpdated){
        if(rowUpdated === 1){
            res.status(200).json({
                message: `Updated course with id ${req.params.courseID}.`
            });
         }
         else
         {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Course."
            });
         }
      }, function(err){
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Course."
        });
      });
};

*/