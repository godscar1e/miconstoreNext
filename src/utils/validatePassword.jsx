export const validatePassword = (password) => {
	const passwordErrors = []

	if (password.length < 8) {
		passwordErrors.push("*Minimum 8 characters")
	}
	if (!/[A-Z]/.test(password)) {
		passwordErrors.push("*Uppercase letter")
	}
	if (!/[a-z]/.test(password)) {
		passwordErrors.push("*One lowercase letter")
	}
	if (!/\d/.test(password)) {
		passwordErrors.push("*One digit")
	}

	return passwordErrors
}
