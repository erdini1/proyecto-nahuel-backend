import { User } from "../models/index.model.js"
import { UserTask, Task } from "../models/index.model.js"
import users from "./user.seed.js";
import userTasks from "./userTask.seed.js";
import tasks from "./task.seed.js";
import sequelize from "../config/db.config.js";

const importData = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		await User.bulkCreate(users)
		await Task.bulkCreate(tasks)
		await UserTask.bulkCreate(userTasks)
		console.log("Datos importados correctamente")
		process.exit()

	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

const deleteData = async () => {
	try {
		await sequelize.sync({ force: true })
		console.log("Tablas eliminadas correctamente")
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

if (process.argv[2] === "-i") {
	importData()
}

if (process.argv[2] === "-d") {
	deleteData()
}