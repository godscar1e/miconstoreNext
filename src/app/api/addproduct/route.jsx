import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongo"
import { createProduct } from "@/queries/product"

export const POST = async (request) => {
	try {
		// Получаем данные из формы
		const formData = await request.formData()

		const productType = formData.get("product_type")
		const productName = formData.get("product_name")
		const productColor = formData.get("product_color")
		const productSize = formData.get("product_size")
		const quantity = formData.get("quantity")
		const fillerComposition = formData.get("filler_composition")
		const fabricType = formData.get("fabric_type")
		const price = formData.get("price")
		const discountedPrice = formData.get("discounted_price")
		const images = []

		// Обрабатываем файлы изображений
		for (let i = 1; i <= 4; i++) {
			const image = formData.get(`image${i}`)
			if (image && image.size > 0) {
				images.push(image) // Сохраняем файл в массив изображений
			}
		}

		console.log("Received product data:", {
			productType,
			productName,
			productColor,
			productSize,
			quantity,
			fillerComposition,
			fabricType,
			price,
			discountedPrice,
			images,
		})

		// Подключаемся к базе данных
		await dbConnect()

		// Формируем объект для сохранения в базе данных
		const newProduct = {
			productType,
			productName,
			productColor,
			productSize,
			quantity,
			fillerComposition,
			fabricType,
			price,
			discountedPrice,
			images, // Вставляем массив изображений
		}

		console.log("Product to be saved:", newProduct)

		// Сохраняем продукт в базе данных
		const savedProduct = await createProduct(newProduct)
		console.log("Saved product:", savedProduct)

		return new NextResponse("Product has been created", {
			status: 201,
		})
	} catch (error) {
		console.error("Error creating product:", error)
		return new NextResponse(error.message, {
			status: 500,
		})
	}
}
