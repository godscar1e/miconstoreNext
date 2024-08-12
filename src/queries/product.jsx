import Product from "@/models/product"

export async function createProduct(product) {
	try {
		await Product.create(product)
	} catch (e) {
		throw new Error(e)
	}
}