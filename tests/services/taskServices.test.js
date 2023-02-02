const taskServices = require('../../src/services/tasksService');
const db = require("../../src/models/index");
const {Task}=require("../../src/models");

describe("Test task services", () => {
    describe("Get all tasks", () => {
        it("should get all tasks", async () => {
            const tasks = await taskServices.getAllTasks();
            expect(tasks).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    isComplete: expect.any(Boolean),
                    isImportant: expect.any(Boolean),
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date)
                })
            ]));
        });
    });
    describe("Create task", () => {
        it("should create a task", async () => {
            const data = {
                name: "abc",
                isImportant: true
            };
            const task = await taskServices.createTask(data);
            expect(task).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                isComplete: expect.any(Boolean),
                isImportant: expect.any(Boolean),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }));
        });
    });
    describe("Delete finished tasks", () => {
        it("should delete finished tasks", async () => {
            const result = await taskServices.deleteFinishedTasks();
            expect(result).toBe(1);
        });
    });
    describe("Get task by id", () => {
        it("should get task by id", async () => {
            const task = await taskServices.getTaskById(1);
            expect(task).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                isComplete: expect.any(Boolean),
                isImportant: expect.any(Boolean),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }));
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
    });
});

