import bcrypt from "bcrypt"

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

const comparePassword = async (userInputPassword, storedHashedPassword) => {
	return await bcrypt.compare(userInputPassword, storedHashedPassword)
}

export {
	hashPassword,
	comparePassword
}

