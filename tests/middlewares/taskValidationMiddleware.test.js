const {createTaskValidation, createTaskSchema, udateTaskValidation, updateTaskSchema, updateTaskValidation} = require("../../src/middlewares/tasksValidationMiddleware");
const Joi = require("joi");

describe("Test task validation middleware", () => {
    describe("Test create task validation", () => {
        it("should validate create task request body", async () => {

            const req = {
                body: {
                    name: "abc",
                    isImportant: true
                }
            };
            const res = {};
            const next = jest.fn();
            await createTaskValidation(req, res, next);
            expect(next).toHaveBeenCalled();
        });
        it("should not validate create task request body", async () => {
            jest.spyOn(createTaskSchema, "validate").mockReturnValue({error: {message: "Invalid request body"}});
            const req = {
                body: {
                    name: "abc",
                    isImportant: "truea"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            await createTaskValidation(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith("Invalid request body");
        });
        it("should return 500 if error is not Joi error", async () => {
            jest.spyOn(createTaskSchema, "validate").mockImplementation(() => {
                throw new Error("Internal server error");
            });
            const req = {
                body: {
                    name: "abc",
                    isImportant: "truea"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            await createTaskValidation(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith("Internal server error");
        });
    });
    describe("Test update task validation", () => {
        it("should validate update task request body", async () => {
            const req = {
                body: {
                    name: "abc",
                    isImportant: true
                }
            };
            const res = {};
            const next = jest.fn();
            await updateTaskValidation(req, res, next);
            expect(next).toHaveBeenCalled();
        });
        it("should return 400 if request body is invalid", async () => {
            jest.spyOn(updateTaskSchema, "validate").mockReturnValue({error: {message: "Invalid request body"}});
            const req = {
                body: {
                    name: "abc",
                    isImportant: "truea"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            await updateTaskValidation(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith("Invalid request body");
        });
        it("should return 500 if error is not Joi error", async () => {
            jest.spyOn(updateTaskSchema, "validate").mockImplementation(() => {
                throw new Error("Internal server error");
            });
            const req = {
                body: {
                    name: "abc",
                    isImportant: "truea"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            await updateTaskValidation(req, res, next);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith("Internal server error");
        });
    });
});