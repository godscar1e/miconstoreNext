import mongoose from 'mongoose'

export async function dbConnect() {
	if (mongoose.connection.readyState >= 1) {
		return
	}

	try {
		const conn = await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		})
		return conn
	} catch (e) {
		console.error('Error connecting to database:', e) // Логируем ошибку подключения
		throw new Error(e)
	}
}
