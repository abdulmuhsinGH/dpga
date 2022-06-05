const { it } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
require("../index");
const pool = require("../db");
const {
  insertProject,
  selectAllprojectss,
} = require("../model/projects.model");

const testprojectsData = {
  city: "test city",
  country: "test country",
  date: "12/12/12",
  projects_desc: "test projects desc",
  client_id: 1,
  weather_report: {
    description: "test weather report",
  },
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
      await insertprojects(testprojectsData);
    } catch (error) {
      expect(error.message).equal("error");
    }
    sinon.restore();
  });

  it("should select all projectss", async () => {
    sinon.stub(pool, "query").resolves({ rows: [testprojectsData] });
    const result = await selectAllprojectss();
    expect(result.length).equal(1);
    sinon.restore();
  });

  //should catch error if select fails
  it("should catch error if select fails", async () => {
    sinon.stub(pool, "query").rejects({ message: "error" });
    try {
      await selectAllprojectss();
    } catch (error) {
      expect(error.message).equal("error");
    }
    sinon.restore();
  });
});
