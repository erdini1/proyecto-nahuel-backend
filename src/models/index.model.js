import User from './user.model.js';
import Task from './task.model.js';
import UserTask from './userTask.model.js';
import CashRegister from './cashRegister.model.js';
import CashMovement from './cashMovement.model.js';
import Cancellation from './cancellation.model.js';
import Provider from './provider.model.js';
import Terminal from './Terminal.model.js';

// A.hasOne(B); // B HasOne A - Se lee de derecha a izquierda
// A.belongsTo(B); // A BelongsTo B - Se lee de izquierda a derecha
// A.hasMany(B); // A HasMany B
// A.belongsToMany(B, { through: 'C' }); // A BelongsToMany B through the junction table C


// User model
User.hasMany(UserTask, { foreignKey: 'userId' });
UserTask.belongsTo(User, { foreignKey: 'userId' });

// Task model
Task.hasMany(UserTask, { foreignKey: 'taskId' });
UserTask.belongsTo(Task, { foreignKey: 'taskId' });

// UserTask model
UserTask.belongsTo(User, { foreignKey: 'userId' });
UserTask.belongsTo(Task, { foreignKey: 'taskId' });

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


export {
	User,
	Task,
	UserTask,
	CashRegister,
	CashMovement,
	Cancellation,
	Provider,
	Terminal
}