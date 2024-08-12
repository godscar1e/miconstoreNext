import { NextResponse } from 'next/server'
import Product from '@/models/product'
import { dbConnect } from '@/lib/mongo'

export const GET = async () => {
	try {
		await dbConnect()

		// Получение всех продуктов из базы данных
		const products = await Product.find({})

		// Возвращение продуктов в формате JSON
		return NextResponse.json(products, { status: 200 })
	} catch (error) {
		console.error('Failed to fetch products:', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
