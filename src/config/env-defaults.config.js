import "dotenv/config"

// BACKEND
export const BACKEND = {
	PORT: process.env.PORT || 4000,
	URL: process.env.BACKEND_URL || "http://localhost"
}

// FRONTEND
export const FRONTEND = {
	URL: process.env.FRONTEND_URL || "http://localhost"
}

// DATABASE
export const DB = {
	DATABASE: process.env.DB_DATABASE || "mydb",
	USERNAME: process.env.DB_USERNAME || "root",
	PASSWORD: process.env.DB_PASSWORD || "secret",
	HOST: process.env.DB_HOST || "localhost",
	PORT: process.env.DB_PORT || "3306"
}

// JWT
export const JWT = {
	SECRET: process.env.JWT_SECRET || "myjwtsecret"
}