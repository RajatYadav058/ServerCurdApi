const ProductModel = require('../models/product')
const cloudinary = require('cloudinary').v2


// Configuration of cloudinary
cloudinary.config({
    cloud_name: 'daq4nfr9z',
    api_key: '667488123979933',
    api_secret: 'vPayOdnuqNN-hjf5NvxKg_vh-_s' // Click 'View API Keys' above to copy your API secret
});


class ProductController {

    static productinsert = async (req, res) => {
        try {
            const { name, price,} = req.body
            const file = req.files?.image

            if (!name || !price || !file) {
                return res.status(400).json({ error: 'All fields are required' })
            }
            // Check if product already exists
            const existingProduct = await ProductModel.findOne({ name })
            if (existingProduct) {
                return res.status(400).json({ error: 'Product already exists, insert new product' })
            }
            // Upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "product"
            })

            const product = await ProductModel.create({
                name,
                price,
                image: imageUpload.secure_url,
                public_id: imageUpload.public_id
            })

            res.status(201).json({
                message: "product createad successfully",
                product
            })
        }
        catch (error) {
            console.log("error occured", error)
            res.status(400).json({ error: error.message })
        }
    }
    //Display alll products
    static productDisplay = async (req, res) => {
        try {
            const product = await ProductModel.find()
            res.status(200).json({
                message: "product displayed successfully",
                product
            })
        }
        catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    }
    // View single product
    static productView = async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id)
            if (!product) {
                return res.status(404).json({ error: 'Product not found' })
            }
            res.status(200).json({
                message: "products viewed successfully",
                product
            })
        }
        catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }

    }
    // Update product
    static productUpdate = async (req, res) => {
        try {
            const { name, price } = req.body
            const file = req.files?.image
            const id = req.params.id

            const product = await ProductModel.findById(id)
            if (!product) {
                return res.status(404).json({ error: 'Product not found' })
            }
            let image = product.image
            let public_id = product.public_id
            if (file) {
                // Delete old image
                if (public_id) {
                    await cloudinary.uploader.destroy(public_id);
                }

                // Upload new image
                const upload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'product'
                });
                image = upload.secure_url;
                public_id = upload.public_id;
            }
            const updated = await ProductModel.findByIdAndUpdate(id, {
                name,
                price,
                image,
                public_id
            }, { new: true }
            )

            res.status(200).json({
                message: "product updadted successfully",
                product: updated
            })
        }
        catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }


    }
    // Delete product
    static productDelete = async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id)
            if (!product) {
                return res.status(404).json({
                    error: 'Product not found'
                })
            }
            // Delete image from cloudinary
            if (product.public_id) {
                await cloudinary.uploader.destroy(product.public_id);
            }
            // Delete product from database
            await ProductModel.findByIdAndDelete(req.params.id)
            res.status(200).json({
                message: "product deleted successfully"
            })
        }
        catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = ProductController