const { StatusCodes } = require('http-status-codes')
const Category = require('../model/category')

// create
const createCategory = async (req,res) => {
    try {
        const { title, desc } = req.body

        const extCat = await Category.findOne({ title })
            if(extCat)
                return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `Category title already exists`})

        let newCat = await Category.create({
            title,
            desc
        })

        res.status(StatusCodes.CREATED).json({ status: true, msg: "Category created successfully", category: newCat})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// all
const allCategory = async (req,res) => {
    try {
        let data = await Category.find({})

        res.status(StatusCodes.ACCEPTED).json({ status: true, length: data.length, categories: data })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
} 

// single
const singleCategory = async (req,res) => {
    try {
        // read router params
        let id = req.params.id
        
        // check data exists in db or not
        let extCat = await Category.findById(id)
            if(!extCat)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Category not found`})

        res.status(StatusCodes.OK).json({ status: true, category: extCat })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// update
const updateCategory = async (req,res) => {
    try {
         // read router params
         let id = req.params.id
        
         // check data exists in db or not
         let extCat = await Category.findById(id)
             if(!extCat)
                 return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Category not found`})

        await Category.findByIdAndUpdate({ _id: id },req.body)

        res.status(StatusCodes.CREATED).json({ status: true, msg: `Category updated successfully`})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// delete
const deleteCategory = async (req,res) => {
    try {
         // read router params
         let id = req.params.id
        
         // check data exists in db or not
         let extCat = await Category.findById(id)
             if(!extCat)
                 return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Category not found`})

        await Category.findByIdAndDelete({ _id: id })

        res.status(StatusCodes.OK).json({ status: true, msg: `Category deleted successfully`})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = { createCategory, allCategory, singleCategory, updateCategory, deleteCategory}