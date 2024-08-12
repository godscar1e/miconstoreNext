import mongoose from "mongoose"

const { Schema } = mongoose

const productSchema = new Schema({
	productType: {
		type: String,
		required: true,
	},
	productName: {
		type: String,
		required: true,
	},
	productColor: {
		type: String,
		required: true,
	},
	productSize: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	fillerComposition: {
		type: String,
		required: true,
	},
	fabricType: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	discountedPrice: {
		type: Number,
		required: true,
	},
	images: [
		{
			type: String, // Массив строк для хранения путей к изображениям
			required: false,
		},
	],
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product
