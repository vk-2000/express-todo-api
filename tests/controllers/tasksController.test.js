
const tasksController = require("../../src/controllers/tasksController");
const taskServices = require("../../src/services/tasksService");
const HTTPerror = require("../../src/utils/errors/HTTPerror");

describe("Test task controller", () => {
    describe("Get all tasks", () => {
        it("should get all tasks", async () => {
            // jest.spyOn(taskServices, "getAllTasks").mockResolvedValue([{id: 1, name:"abc", isComplete: true, isImportant: true, createdAt: "11", updatedAt: "11"}]);
            taskServices.getAllTasks = jest.fn().mockResolvedValue([{id: 1, name:"abc", isComplete: true, isImportant: true, createdAt: "11", updatedAt: "11"}]);
            const moqReq = {};
            const moqRes = {
                send: jest.fn(),
                status: jest.fn()
            };
            await tasksController.getAllTasks(moqReq, moqRes);
            expect(moqRes.send).toBeCalledWith([{id: 1, name:"abc", isComplete: true, isImportant: true, createdAt: "11", updatedAt: "11"}]);
            expect(moqRes.status).toBeCalledWith(200);
        });
    });
    describe("Get one task", () => {
        it("should return one task", async () => {
            jest.spyOn(taskServices, "getTaskById").mockResolvedValue({
                "id": 1,
                "name": "abc",
                "isImportant": true,
                "isComplete": false,
                "updatedAt": "2023-02-01T07:11:02.765Z",
                "createdAt": "2023-02-01T07:11:02.765Z"
            });
            const moqReq = {
                params: {
                    id: 1
                }
            };
            const moqRes = {
                send: jest.fn()
            };
            await tasksController.getTaskById(moqReq, moqRes);
            expect(moqRes.send).toBeCalledWith({
                "id": 1,
                "name": "abc",
                "isImportant": true,
                "isComplete": false,
                "updatedAt": "2023-02-01T07:11:02.765Z",
                "createdAt": "2023-02-01T07:11:02.765Z"
            });
        });

        it("should return task not found", async () => {
            jest.spyOn(taskServices, "getTaskById").mockImplementation(() => {throw new HTTPerror("Task not found", 404);});
            const moqReq = {
                params: {
                    id: 11
                }
            };
            const moqRes = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis()
            };
            await tasksController.getTaskById(moqReq, moqRes);
            expect(moqRes.status).toBeCalledWith(404);
            expect(moqRes.send).toBeCalledWith({"msg": "Task not found"});
        });
        it("should return something went wrong", async() => {
            jest.spyOn(taskServices, "getTaskById").mockRejectedValue(new Error("Something went wrong"));
            const moqReq = {
                params: {
                    id: 1
                }
            };
            const moqRes = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis()
            };
            await tasksController.getTaskById(moqReq, moqRes);
            expect(moqRes.status).toBeCalledWith(500);
            expect(moqRes.send).toBeCalledWith({"msg": "Something went wrong"}); 

        });
    });

    describe("create new task", () => {
        it("should create a new task", async () => {
            jest.spyOn(taskServices, "createTask").mockResolvedValue({
                "id": 8,
                "isImportant": false,
                "name": "hhhhhh",
                "isComplete": false,
                "updatedAt": "2023-02-02T05:35:17.653Z",
                "createdAt": "2023-02-02T05:35:17.653Z"
            });
            const moqReq = {
                body: {
                    "isImportant": false,
                    "name": "hhhhhh"
                }
            };
            const moqRes = {
                send: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis()
            };
            await tasksController.createTask(moqReq, moqRes);
            expect(moqRes.status).toBeCalledWith(201);
            expect(moqRes.send).toBeCalledWith({
                "id": 8,
                "isImportant": false,
                "name": "hhhhhh",
                "isComplete": false,
                "updatedAt": "2023-02-02T05:35:17.653Z",
                "createdAt": "2023-02-02T05:35:17.653Z"
            });

        });
    });

    describe("Delete finished tasks", () => {
        it("should delete finished tasks", async () => {
            jest.spyOn(taskServices, "deleteFinishedTasks").mockResolvedValue();
            const moqRes = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            };
            await tasksController.deleteFinishedTasks({}, moqRes);
            expect(moqRes.status).toBeCalledWith(204);
            expect(moqRes.send).toBeCalledWith({"msg": "Deleted finished tasks"});
        });
    });
    describe("Update task", () => {
        it("should update the task", async () => {
            jest.spyOn(taskServices, "updateTask").mockResolvedValue([
                1,
                [
                    {
                        "id": 1,
                        "name": "changed",
                        "isComplete": false,
                        "isImportant": false,
                        "createdAt": "2023-02-01T07:11:02.765Z",
                        "updatedAt": "2023-02-02T06:24:44.259Z"
                    }
                ]
            ]);
            const moqReq = {
                params: {
                    id: 1
                }
            };
            const moqRes = {
                send: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis()
            };
            await tasksController.updateTask(moqReq, moqRes);
            expect(moqRes.status).toBeCalledWith(200);
            expect(moqRes.send).toBeCalledWith([
                1,
                [
                    {
                        "id": 1,
                        "name": "changed",
                        "isComplete": false,
                        "isImportant": false,
                        "createdAt": "2023-02-01T07:11:02.765Z",
                        "updatedAt": "2023-02-02T06:24:44.259Z"
                    }
                ]
            ]);
        });
        
    });
    it("should return task not found", async () => {
        jest.spyOn(taskServices, "updateTask").mockImplementation(() => {throw new HTTPerror("Task not found", 404);});
        const moqReq = {
            params: {
                id: 11
            }
        };
        const moqRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
        await tasksController.updateTask(moqReq, moqRes);
        expect(moqRes.status).toBeCalledWith(404);
        expect(moqRes.send).toBeCalledWith({"msg": "Task not found"});
    });

    it("should return something went wrong", async() => {
        jest.spyOn(taskServices, "updateTask").mockRejectedValue(new Error("Something went wrong"));
        const moqReq = {
            params: {
                id: 1
            }
        };
        const moqRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
        await tasksController.updateTask(moqReq, moqRes);
        expect(moqRes.status).toBeCalledWith(500);
        expect(moqRes.send).toBeCalledWith({"msg": "Something went wrong"}); 

    });
});