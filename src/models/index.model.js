import User from './user.model.js';
import Task from './task.model.js';
import UserTask from './userTask.model.js';
import CashRegister from './cashRegister.model.js';
import CashMovement from './cashMovement.model.js';
import Cancellation from './cancellation.model.js';
import Provider from './provider.model.js';
import Terminal from './Terminal.model.js';
import TaskSet from './taskSet.model.js';
import Sector from './sector.model.js';
import UserSector from './userSector.model.js';

// A.hasOne(B); // B HasOne A - Se lee de derecha a izquierda
// A.belongsTo(B); // A BelongsTo B - Se lee de izquierda a derecha
// A.hasMany(B); // A HasMany B
// A.belongsToMany(B, { through: 'C' }); // A BelongsToMany B through the junction table C


// User model
User.hasMany(UserTask, { foreignKey: 'userId' });
UserTask.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Sector, { through: UserSector, foreignKey: 'userId' });
Sector.belongsToMany(User, { through: UserSector, foreignKey: 'sectorId' });

// Task model
Task.hasMany(UserTask, { foreignKey: 'taskId' });
UserTask.belongsTo(Task, { foreignKey: 'taskId' });

Task.belongsTo(Sector, { foreignKey: 'sectorId' });
Sector.hasMany(Task, { foreignKey: 'sectorId' });

// UserTask model
UserTask.belongsTo(User, { foreignKey: 'userId' });
UserTask.belongsTo(Task, { foreignKey: 'taskId' });

UserTask.belongsTo(TaskSet, { foreignKey: 'taskSetId' })
TaskSet.hasMany(UserTask, { foreignKey: 'taskSetId' })

// CashRegister model
CashRegister.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(CashRegister, { foreignKey: 'userId' });

// CashMovement model
CashMovement.belongsTo(CashRegister, { foreignKey: 'cashRegisterId' });
CashRegister.hasMany(CashMovement, { foreignKey: 'cashRegisterId' });

CashMovement.belongsTo(Provider, { foreignKey: 'providerId' });
Provider.hasMany(CashMovement, { foreignKey: 'providerId' });

// Cancellation model
Cancellation.belongsTo(CashRegister, { foreignKey: 'cashRegisterId' });
CashRegister.hasMany(Cancellation, { foreignKey: 'cashRegisterId' });

// Terminal model
Terminal.belongsTo(CashRegister, { foreignKey: 'cashRegisterId' });
CashRegister.hasMany(Terminal, { foreignKey: 'cashRegisterId' });

// TaskSet model
TaskSet.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(TaskSet, { foreignKey: 'userId' });

export {
	User,
	Task,
	UserTask,
	CashRegister,
	CashMovement,
	Cancellation,
	Provider,
	Terminal,
	TaskSet,
	Sector,
	UserSector
}

// --------------

// import User from './user.model.js';
// import Task from './task.model.js';
// import UserTask from './userTask.model.js';
// import CashRegister from './cashRegister.model.js';
// import CashMovement from './cashMovement.model.js';
// import Cancellation from './cancellation.model.js';
// import Provider from './provider.model.js';
// import Terminal from './Terminal.model.js';
// import PaymentMethod from './paymentMethod.model.js';

// // User model
// User.hasMany(UserTask, { foreignKey: 'userId' });
// UserTask.belongsTo(User, { foreignKey: 'userId' });

// // Task model
// Task.hasMany(UserTask, { foreignKey: 'taskId' });
// UserTask.belongsTo(Task, { foreignKey: 'taskId' });

// // UserTask model
// UserTask.belongsTo(User, { foreignKey: 'userId' });
// UserTask.belongsTo(Task, { foreignKey: 'taskId' });

// // CashRegister model
// CashRegister.belongsTo(User, { foreignKey: 'userId' });
// User.hasMany(CashRegister, { foreignKey: 'userId' });

// // CashMovement model
// CashMovement.belongsTo(CashRegister, { foreignKey: 'cashRegisterId' });
// CashRegister.hasMany(CashMovement, { foreignKey: 'cashRegisterId' });

// CashMovement.belongsTo(Provider, { foreignKey: 'providerId' });
// Provider.hasMany(CashMovement, { foreignKey: 'providerId' });

// // Cancellation model
// Cancellation.belongsTo(CashRegister, { foreignKey: 'cashRegisterId' });
// CashRegister.hasMany(Cancellation, { foreignKey: 'cashRegisterId' });

// Cancellation.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId' });
// PaymentMethod.hasMany(Cancellation, { foreignKey: 'paymentMethodId' });

// // Terminal model
// Terminal.belongsTo(CashRegister, { foreignKey: 'cashRegisterId' });
// CashRegister.hasMany(Terminal, { foreignKey: 'cashRegisterId' });

// Terminal.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId' });
// PaymentMethod.hasMany(Terminal, { foreignKey: 'paymentMethodId' });


// export {
// 	User,
// 	Task,
// 	UserTask,
// 	CashRegister,
// 	CashMovement,
// 	Cancellation,
// 	Provider,
// 	Terminal
// }