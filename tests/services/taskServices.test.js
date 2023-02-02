const taskServices = require("../../src/services/tasksService");
const db = require("../../src/models/index");
const {Task}=require("../../src/models");

describe("Test task services", () => {
    describe("Get all tasks", () => {
        it("should get all tasks", async () => {
            jest.spyOn(Task, "findAll").mockResolvedValue([{id: 1, name:"abc", isComplete: true, isImportant: true, createdAt: "11", updatedAt: "11"}]);
            const tasks = await taskServices.getAllTasks();
            expect(tasks).toEqual([{id: 1, name:"abc", isComplete: true, isImportant: true, createdAt: "11", updatedAt: "11"}]);
        });
    });
    describe("Create task", () => {
        it("should create a task", async () => {
            jest.spyOn(Task, "create").mockResolvedValue({
                "id": 13,
                "name": "abc",
                "isImportant": true,
                "isComplete": false,
                "updatedAt": "2023-02-02T12:05:08.571Z",
                "createdAt": "2023-02-02T12:05:08.571Z"
            });
            const data = {
                name: "abc",
                isImportant: true
            };
            const task = await taskServices.createTask(data);
            expect(task).toEqual({
                "id": 13,
                "name": "abc",
                "isImportant": true,
                "isComplete": false,
                "updatedAt": "2023-02-02T12:05:08.571Z",
                "createdAt": "2023-02-02T12:05:08.571Z"
            });
        });
    });
    describe("Delete finished tasks", () => {
        it("should delete finished tasks", async () => {
            const result = await taskServices.deleteFinishedTasks();
            expect(result).toBe(undefined);
        });
    });
    describe("Get task by id", () => {
        it("should get task by id", async () => {
            jest.spyOn(Task, "findOne").mockResolvedValue({
                "id": 1,
                "name": "abc",
                "isComplete": false,
                "isImportant": true,
                "createdAt": "2023-02-01T07:11:02.765Z",
                "updatedAt": "2023-02-02T12:05:57.468Z"
            });
            const task = await taskServices.getTaskById(1);
            expect(task).toEqual({
                "id": 1,
                "name": "abc",
                "isComplete": false,
                "isImportant": true,
                "createdAt": "2023-02-01T07:11:02.765Z",
                "updatedAt": "2023-02-02T12:05:57.468Z"
            });
        });
        it("should throw error if task not found", async () => {
            jest.spyOn(Task, "findOne").mockResolvedValue(null);
            await expect(taskServices.getTaskById(1)).rejects.toThrow("Task not found");
        });
    });
    describe("Update task", () => {
        it("should update task", async () => {
            const data = {
                name: "abc",
                isImportant: true
            };
            const result = await taskServices.updateTask(1, data);
            expect(result).toEqual(expect.arrayContaining([
                expect.any(Number),
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        isComplete: expect.any(Boolean),
                        isImportant: expect.any(Boolean),
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date)
                    })
                ])
            ]));
        });
        it("should throw error if task not found", async () => {
            jest.spyOn(Task, "update").mockResolvedValue([0, []]);
            const data = {
                name: "abc",
                isImportant: true
            };
            await expect(taskServices.updateTask(1, data)).rejects.toThrow("Task not found");
        });
    });
});

