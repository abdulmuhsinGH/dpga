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
        name: "accra",
        description: "test country",
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

    it("should return error if city are missing", (done) => {
      const project = {
        name: "accra",
        description: "test country",
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

    it("should return error if country are missing", (done) => {
      const project = {
        name: "accra",
        description: "test country",
        tech_stack: ["nodejs"],
      };
      request(app)
        .post("/projectss")
        .send(projects)
        .expect(constants.HTTP_STATUS_BAD_REQUEST)
        .expect((res) => {
          expect(res.error.text).to.equal("Missing required fields");
        })
        .end(done);
    });

    it("should return error if date are missing", (done) => {
      const project = {
        name: "accra",
        description: "test country",
        tech_stack: ["nodejs"],
      };
      request(app)
        .post("/projects")
        .send(projects)
        .expect(constants.HTTP_STATUS_BAD_REQUEST)
        .expect((res) => {
          expect(res.error.text).to.equal("Missing required fields");
        })
        .end(done);
    });

    it("should return error if projects_desc are missing", (done) => {
      const project = {
        name: "accra",
        description: "test country",
        tech_stack: ["nodejs"],
      };
      request(app)
        .post("/projectss")
        .send(projects)
        .expect(constants.HTTP_STATUS_BAD_REQUEST)
        .expect((res) => {
          expect(res.error.text).to.equal("Missing required fields");
        })
        .end(done);
    });

    it("should return error if client_id are missing", (done) => {
      const project = {
        name: "accra",
        description: "test country",
        tech_stack: ["nodejs"],
      };
      request(app)
        .post("/projects")
        .send(projects)
        .expect(constants.HTTP_STATUS_BAD_REQUEST)
        .expect((res) => {
          expect(res.error.text).to.equal("Missing required fields");
        })
        .end(done);
    });

    it("should return error if client_id is not a number", (done) => {
      const project = {
        name: "accra",
        description: "test country",
        tech_stack: ["nodejs"],
      };
      request(app)
        .post("/projects")
        .send(projects)
        .expect(constants.HTTP_STATUS_BAD_REQUEST)
        .expect((res) => {
          expect(res.error.text).to.equal("client_id must be a number");
        })
        .end(done);
    });
  });

  describe("GET /projects", () => {
    it("should return all projectss", (done) => {
      const project = {
        name: "accra",
        description: "test country",
        tech_stack: ["nodejs"],
      };
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
