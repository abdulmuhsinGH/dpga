const chai = require("chai");
const request = require("supertest");
const sinon = require("sinon");
const app = require("../index");
const { expect } = chai;
const pool = require("../db");
const { constants } = require("http2");

/**
 * test cases for projects controller
 * @description test cases for projects controller
 * db is required to be connected before running the test cases
 * config json is availble to set the db connection for the test environment
 * */

describe("projects", () => {
  before(async () => {
    await pool.query("TRUNCATE TABLE projects");
  });
  describe("POST /projects", () => {
    it("should create a new projects", (done) => {
      const project = {
        name: "Open CSRV",
        description: "test project",
        tech_stack: ["nodejs"],
      };
      request(app)
        .post("/projects")
        .send(project)
        .expect(constants.HTTP_STATUS_CREATED)
        .expect((res) => {
          expect(res.body.name).to.equal(project.name);
          expect(res.body.description).to.equal(project.description);
          expect(res.body.tech_stack).to.equal(project.tech_stack);
        })
        .end(done);
    });


    it("should return error if diescription is missing", (done) => {
      const project = {
        name: "Open CSRV",
        tech_stack: ["nodejs"],
      };
      request(app)
        .post("/projects")
        .send(project)
        .expect(constants.HTTP_STATUS_BAD_REQUEST)
        .expect((res) => {
          expect(res.error.text).to.equal("Missing required fields");
        })
        .end(done);
    });

    it("should return error if tech_Stack are missing", (done) => {
      const project = {
        name: "Open CSRV",
        description: "test country",
      };
      request(app)
        .post("/projectss")
        .send(project)
        .expect(constants.HTTP_STATUS_BAD_REQUEST)
        .expect((res) => {
          expect(res.error.text).to.equal("Missing required fields");
        })
        .end(done);
    });

    it("should return error if name is missing", (done) => {
      const project = {
        description: "test project",
        tech_stack: ["nodejs"],
      };
      request(app)
        .post("/projects")
        .send(project)
        .expect(constants.HTTP_STATUS_BAD_REQUEST)
        .expect((res) => {
          expect(res.error.text).to.equal("Missing required fields");
        })
        .end(done);
    });
  });

  describe("GET /projects", () => {
    it("should return all projects", (done) => {
      request(app)
        .get("/projects")
        .expect(constants.HTTP_STATUS_OK)
        .expect((res) => {
          expect(res.body.length).to.equal(1);
        })
        .end(done);
      sinon.restore();
    });
  });
});
