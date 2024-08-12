import { NextResponse } from "next/server"
import { createUser } from "@/queries/user"

import bcrypt from "bcryptjs"
import { dbConnect } from "@/lib/mongo"

export const POST = async (request) => {
	try {
		const { name, surname, password, email, phone } = await request.json()

		console.log("Received data:", { name, surname, password, email, phone })

		await dbConnect()

		// Encrypt the password
		const hashedPassword = await bcrypt.hash(password, 5)

		// Form a DB payload
		const newUser = {
			name,
			surname,
			password: hashedPassword,
			email,
			phone,
		}

		console.log("User to be saved:", newUser)

		const savedUser = await createUser(newUser)
		console.log("Saved user:", savedUser)

		return new NextResponse("User has been created", {
			status: 201,
		})
	} catch (error) {
		console.error("Error creating user:", error)
		return new NextResponse(error.message, {
			status: 500,
		})
	}
}