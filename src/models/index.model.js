import User from './user.model.js';
import Task from './task.model.js';
import UserTask from './userTask.model.js';
import CashRegister from './cashRegister.model.js';
import CashMovement from './cashMovement.model.js';
import Cancellation from './cancellation.model.js';
import Provider from './provider.model.js';
import Terminal from './terminal.model.js';
import TaskSet from './taskSet.model.js';
import Sector from './sector.model.js';
import UserSector from './userSector.model.js';
import CashBox from './cashBox.model.js';
import CashRegisterTerminals from './cashRegisterTerminals.model.js';

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

CashRegister.belongsTo(CashBox, { foreignKey: 'cashBoxId' });
CashBox.hasMany(CashRegister, { foreignKey: 'cashBoxId' });

// CashMovement model
CashMovement.belongsTo(CashRegister, { foreignKey: 'cashRegisterId' });
CashRegister.hasMany(CashMovement, { foreignKey: 'cashRegisterId' });

CashMovement.belongsTo(Provider, { foreignKey: 'providerId' });
Provider.hasMany(CashMovement, { foreignKey: 'providerId' });

// Cancellation model
Cancellation.belongsTo(CashRegister, { foreignKey: 'cashRegisterId' });
CashRegister.hasMany(Cancellation, { foreignKey: 'cashRegisterId' });

CashRegister.belongsToMany(Terminal, { through: CashRegisterTerminals, foreignKey: 'cashRegisterId' });
Terminal.belongsToMany(CashRegister, { through: CashRegisterTerminals, foreignKey: 'terminalId' });

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
	UserSector,
	CashBox,
	CashRegisterTerminals,
}
