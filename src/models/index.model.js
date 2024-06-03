import User from './user.model.js';
import Task from './task.model.js';
import UserTask from './userTask.model.js';

// A.hasOne(B); // B HasOne A - Se lee de derecha a izquierda
// A.belongsTo(B); // A BelongsTo B - Se lee de izquierda a derecha
// A.hasMany(B); // A HasMany B
// A.belongsToMany(B, { through: 'C' }); // A BelongsToMany B through the junction table C

User.belongsToMany(Task, {
	through: UserTask,
	foreignKey: 'userId',
	otherKey: 'taskId'
});

export {
	User,
	Task,
	UserTask
}