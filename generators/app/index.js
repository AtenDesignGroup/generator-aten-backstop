"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const snakeCase = require("lodash/snakeCase");
const extend = require("lodash/extend");

extend(Generator.prototype, require("yeoman-generator/lib/actions/install"));

module.exports = class extends Generator {
  initializing() {
    this.answers = {};

    this.on("npmInstall:end", () => {
      this.log(yosay(`Let's ${chalk.cyan("initialize Backstop")}!`));
      this.spawnCommandSync("npm", ["run", "init"]);
    });
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Let's ${chalk.cyan("generate a Backstop tests")}!`));

    this.answers = await this.prompt([
      {
        name: "projectId",
        message: "What is your projects Id?",
        default: snakeCase("my_project"),
        filter: snakeCase
      },
      {
        name: "referenceDomain",
        message: "What is the url for your reference site? Ex. https://aten.io"
      },
      {
        name: "testDomain",
        message: "What is the url for your test site? Ex. https://dev.aten.io"
      }
    ]);
  }

  writing() {
    // Save a .yo-rc.json file for future generators.
    this.config.save();

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      { ...this.answers }
    );

    this.fs.copyTpl(
      this.templatePath("backstop.config.js"),
      this.destinationPath("backstop.config.js"),
      { ...this.answers }
    );

    const filesToCopy = [".nvmrc", ".gitignore", "README.md"];

    filesToCopy.forEach(filename => {
      this.fs.copy(this.templatePath(filename), this.destinationPath(filename));
    });
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true
    });
  }

  end() {
    this.fs.delete("backstop.json");
  }
};
