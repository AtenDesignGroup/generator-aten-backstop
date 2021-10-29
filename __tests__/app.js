"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-aten-backstop:app", () => {
  const PROJECT_ID = "test_project";
  const REFERENCE_DOMAIN = "https://prod-site.com";
  const TEST_DOMAIN = "https://local-site.test";

  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      projectId: PROJECT_ID,
      referenceDomain: REFERENCE_DOMAIN,
      testDomain: TEST_DOMAIN
    });
  });

  it("creates files", () => {
    const files = [".gitignore", ".nvmrc", "README.md"];

    files.forEach(filename => assert.file(filename));
  });

  it("creates package.json", () => {
    assert.file("package.json");
    assert.fileContent("package.json", PROJECT_ID);
  });

  it("creates backstop.config.js", () => {
    assert.file("backstop.config.js");
    assert.fileContent("backstop.config.js", PROJECT_ID);
    assert.fileContent("backstop.config.js", REFERENCE_DOMAIN);
    assert.fileContent("backstop.config.js", TEST_DOMAIN);
  });
});
