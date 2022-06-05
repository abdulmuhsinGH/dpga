const { it } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
require("../index");
const pool = require("../db");
const {
  insertProject,
  findAllProjects,
} = require("../model/projects.model");

const testprojectsData = {
  name: "Open CSRV",
  description: "test project",
  tech_stack: ["nodejs"],
};

describe("projects model", () => {
  it("should insert projects", async () => {
    sinon.stub(pool, "query").resolves({ rowCount: 1 });
    const result = await insertProject(testprojectsData);
    expect(result).equal(1);
    sinon.restore();
  });

  //should catch error if insert fails
  it("should catch error if insert fails", async () => {
    sinon.stub(pool, "query").rejects({ message: "error" });
    try {
      await insertProject(testprojectsData);
    } catch (error) {
      expect(error.message).equal("error");
    }
    sinon.restore();
  });

  it("should select all projects", async () => {
    sinon.stub(pool, "query").resolves({ rows: [testprojectsData] });
    const result = await findAllProjects();
    expect(result.length).equal(1);
    sinon.restore();
  });

  //should catch error if select fails
  it("should catch error if select fails", async () => {
    sinon.stub(pool, "query").rejects({ message: "error" });
    try {
      await findAllProjects();
    } catch (error) {
      expect(error.message).equal("error");
    }
    sinon.restore();
  });
});
