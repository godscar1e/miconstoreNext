import { NextResponse } from 'next/server'
import { User } from '@/models/user'
import { dbConnect } from '@/lib/mongo'

export const GET = async () => {
	try {
		await dbConnect()

		// Получение всех продуктов из базы данных
		const users = await User.find({})

		// Возвращение продуктов в формате JSON
		return NextResponse.json(users, { status: 200 })
	} catch (error) {
		console.error('Failed to fetch products:', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
