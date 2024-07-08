/* 
104	1	Mañana	2024-07-02	2024-06-27 06:29:14	5	34
105	1	Mañana	2024-07-02	2024-06-27 06:29:14	5	35
106	1	Mañana	2024-07-02	2024-06-27 06:29:20	5	23
107	0	Mañana	2024-07-02	2024-06-27 06:29:20	5	24
108	0	Mañana	2024-07-02	2024-06-27 06:29:20	5	25
109	0	Mañana	2024-07-02	2024-06-27 16:31:14	7	27
110	1	Mañana	2024-07-02	2024-06-27 18:35:49	3	23
111	1	Mañana	2024-06-18	2024-06-27 18:35:49	10	24
119	0	Mañana	2024-06-22	2024-06-27 20:56:07	10	25
120	0	Mañana	2024-06-25	2024-06-25 21:25:57	10	23
121	0	Mañana	2024-06-26	2024-06-27 21:25:57	10	24
122	0	Mañana	2024-06-27	2024-06-27 21:25:57	10	25
124	1	Mañana	2024-06-28	2024-06-27 21:38:33	10	42
125	0	Mañana	2024-07-02	2024-07-02 22:23:33	10	32
126	1	Mañana	2024-07-02	2024-06-27 21:34:46	10	26
127	0	mañana	2024-07-02	2024-07-01 19:21:48	18	23
128	0	mañana	2024-07-02	2024-07-01 19:21:48	18	24
129	0	mañana	2024-07-02	2024-07-01 19:21:48	18	25
130	0	mañana	2024-07-02	2024-07-01 19:21:48	18	26
131	0	mañana	2024-07-02	2024-07-01 19:21:48	18	42
132	0	mañana	2024-07-02	2024-07-01 19:22:44	19	23
133	0	mañana	2024-07-02	2024-07-01 19:22:44	19	24
134	0	mañana	2024-07-02	2024-07-01 19:22:44	19	25
135	0	mañana	2024-07-02	2024-07-01 19:22:44	19	26
136	0	mañana	2024-07-02	2024-07-01 19:22:44	19	42
137	1	Mañana	2024-07-02	2024-07-02 21:36:46	10	43
138	0	Mañana	2024-07-03	2024-07-03 15:15:51	3	33
139	0	Mañana	2024-07-03	2024-07-03 15:20:29	2	33
140	0	Mañana	2024-07-03	2024-07-03 15:20:29	2	23
141	0	Mañana	2024-07-03	2024-07-03 15:20:29	2	28 */
const userTasks = [
	{
		id: 1,
		isCompleted: 1,
		createdAt: "2024-07-02",
		userId: 5,
		taskId: 34
	},
	{
		id: 2,
		isCompleted: 1,
		createdAt: "2024-07-02",
		userId: 5,
		taskId: 35
	},
	{
		id: 3,
		isCompleted: 1,
		createdAt: "2024-07-02",
		userId: 5,
		taskId: 23
	},
	{
		id: 4,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 5,
		taskId: 24
	},
	{
		id: 5,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 5,
		taskId: 25
	},
	{
		id: 6,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 7,
		taskId: 27
	},
	{
		id: 7,
		isCompleted: 1,
		createdAt: "2024-07-02",
		userId: 3,
		taskId: 23
	},
	{
		id: 8,
		isCompleted: 1,
		createdAt: "2024-06-18",
		userId: 10,
		taskId: 24
	},
	{
		id: 9,
		isCompleted: 0,
		createdAt: "2024-06-22",
		userId: 10,
		taskId: 25
	},
	{
		id: 10,
		isCompleted: 0,
		createdAt: "2024-06-25",
		userId: 10,
		taskId: 23
	},
	{
		id: 11,
		isCompleted: 0,
		createdAt: "2024-06-26",
		userId: 10,
		taskId: 24
	},
	{
		id: 12,
		isCompleted: 0,
		createdAt: "2024-06-27",
		userId: 10,
		taskId: 25
	},
	{
		id: 13,
		isCompleted: 1,
		createdAt: "2024-06-28",
		userId: 10,
		taskId: 42
	},
	{
		id: 14,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 10,
		taskId: 32
	},
	{
		id: 15,
		isCompleted: 1,
		createdAt: "2024-07-02",
		userId: 10,
		taskId: 26
	},
	{
		id: 16,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 18,
		taskId: 23
	},
	{
		id: 17,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 18,
		taskId: 24
	},
	{
		id: 18,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 18,
		taskId: 25
	},
	{
		id: 19,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 18,
		taskId: 26
	},
	{
		id: 20,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 18,
		taskId: 42
	},
	{
		id: 21,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 19,
		taskId: 23
	},
	{
		id: 22,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 19,
		taskId: 24
	},
	{
		id: 23,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 19,
		taskId: 25
	},
	{
		id: 24,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 19,
		taskId: 26
	},
	{
		id: 25,
		isCompleted: 0,
		createdAt: "2024-07-02",
		userId: 19,
		taskId: 42
	},
	{
		id: 26,
		isCompleted: 1,
		createdAt: "2024-07-02",
		userId: 10,
		taskId: 43
	},
	{
		id: 27,
		isCompleted: 0,
		createdAt: "2024-07-03",
		userId: 3,
		taskId: 33
	},
	{
		id: 28,
		isCompleted: 0,
		createdAt: "2024-07-03",
		userId: 2,
		taskId: 33
	},
]

export default userTasks