const db = require("../models/index.js");
const Activity = db.activity;

//necessary for LIKE operator
const { Op } = require('sequelize');

// calculates limit and offset parameters for Sequelize Model method findAndCountAll(), 
// from API request query parameters: page and size
const getPagination = (page, size) => {
    const limit = size ? size : 10; // limit = size (default is 3)
    const offset = page ? page * limit : 0; // offset = page * size (start counting from page 0)

    return { limit, offset };
};

// function to map default response to desired response data structure
// {
//     "totalItems": 8,
//     "tutorials": [...],
//     "totalPages": 3,
//     "currentPage": 1
// }
const getPagingData = (data, page, limit) => {

    const totalItems = data.count;
    const activities = data.rows;
    const currentPage = page;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, activities, totalPages, currentPage };
};

// EXPORT function to display list of all activities (required by ROUTER)
exports.findAll = (req, res) => {
    //get data from request query string
    let { page, size, Title } = req.query;
    const condition = Title ? { title: { [Op.like]: `%${Title}%` } } : null;

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

    Activity.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            // convert response data into custom format
            const response = getPagingData(data, offset, limit);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving activities."
            });
        });
};