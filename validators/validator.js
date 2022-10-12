const { query } = require("express-validator");

const filterValidation=[
    query('type').isInt({min: 1,max: 8}).optional(),
    query('status').isInt({min: 1,max: 5}).optional(),
    query('rating').isInt({min: 1,max: 6}).optional(),
    query('score').isInt({min: 1,max: 10}).optional(),
    query('type').isIn(['en','ja','ko','zh']).optional(),
    query('sy').isDate({format: 'YYYY'}).optional(),
    query('sm').isDate({format: 'MM'}).optional(),
    query('sd').isDate({format: 'DD'}).optional(),
    query('ey').isDate({format: 'YYYY'}).optional(),
    query('em').isDate({format: 'MM'}).optional(),
    query('ed').isDate({format: 'DD'}).optional(),
    query('score').isIn(['default','last-updated','score','name-az','release-date','most-viewed']).optional(),
    query('genres').isArray({min: 1,max: 45}).custom(value => value.every(
            element => !isNaN(element) && 1<=parseInt(element)<=45
    )
    ),
    query('page').isInt({min:1}).optional()    
]

module.exports = {filterValidation}