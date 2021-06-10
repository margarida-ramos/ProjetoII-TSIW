

// calculates limit and offset parameters for Sequelize Model method findAndCountAll(), 
// from API request query parameters: page and size
exports.getPagination = (page, size) => {
    const limit = size ? size : 10; // limit = size (default is 3)
    const offset = page ? page * limit : 0; // offset = page * size (start counting from page 0)

    return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {

    const totalItems = data.count;
    const submissions = data.rows;
    const currentPage = page;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, submissions, totalPages, currentPage };
};

exports.procedure = (query) => {

    //get data from request query string
    let { page, size, Description } = query;
    const condition = Description ? { description: { [Op.like]: `%${Description}%` } } : null;

    // validate page
    if (page && !query.page.match(/^(0|[1-9]\d*)$/g)) {
        res.status(400).json({ message: 'Page number must be 0 or a positive integer' });
        return;
    }
    else
        page = parseInt(page); // if OK, convert it into an integer
    // validate size
    if (size && !query.size.match(/^([1-9]\d*)$/g)) {
        res.status(400).json({ message: 'Size must be a positive integer' });
        return;
    } else
        size = parseInt(size); // if OK, convert it into an integer

    // convert page & size into limit & offset options for findAndCountAll
    const { limit, offset } = exports.getPagination(page, size);

    return { condition, limit, offset }

}



/*
exports.findAll = (req, res) => {


    Submission.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            // convert response data into custom format
            const response = getPagingData(data, offset, limit);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving submissions."
            });
        });
};
*/