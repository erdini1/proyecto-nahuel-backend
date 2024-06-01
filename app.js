import express from "express"
// import csrf from "csurf"
// import cookieParser from "cookie-parser"
import { BACKEND } from "./src/config/env-defaults.config.js"
import sequelize from "./src/config/db.config.js"
import indexRouter from "./src/routes/index.route.js"
import { HTTP_STATUSES } from "./src/constants/http.constant.js"
import ApiError from "./src/errors/api.error.js"
import { error } from "./src/log/logger.log.js"

const app = express()

// app.use(express.urlencoded({ extended: true }))

// // Habilitar cookie parser
// app.use(cookieParser())

// // Habilitar CSRF (CROSS-SITE REQUEST FORGERY )
// app.use(csrf({ cookie: true }))

app.use(express.json())

try {
	await sequelize.authenticate()
	sequelize.sync({ force: false })
	console.log("Connection has been established succesfully.")
} catch (error) {
	console.log("Unable to connect to the database", error)
}

app.use("/api", indexRouter)

// Middlewares de Errores
app.use((req, res, next) => {
	error(JSON.stringify({
		status: HTTP_STATUSES.NOT_FOUND,
		message: `No existe el recurso solicitado ${req.originalUrl}`,
		method: req.method,
	}));
	res.status(HTTP_STATUSES.NOT_FOUND).json({ status: HTTP_STATUSES.NOT_FOUND, message: "No existe el recurso solicitado" });
});

app.use((err, req, res, next) => {

	if (err instanceof ApiError) {
		error(JSON.stringify({
			status: err.errorCode,
			message: `No existe el recurso solicitado ${req.originalUrl}`,
			method: req.method,
			route: req.originalUrl,
			body: req.body,
			params: req.params,
			query: req.query
		}));
		res.status(err.errorCode).json({ status: err.errorCode, error: err.message });
	} else {
		error(JSON.stringify({
			status: HTTP_STATUSES.INTERNAL_SERVER_ERROR,
			message: `No existe el recurso solicitado ${req.originalUrl}`,
			method: req.method,
			route: req.originalUrl,
			body: req.body,
			params: req.params,
			query: req.query
		}));
		res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).json({ status: HTTP_STATUSES.INTERNAL_SERVER_ERROR, error: err.message });
	}
});

app.listen(BACKEND.PORT, () => {
	console.log(`Server running on port ${BACKEND.PORT}`)
})