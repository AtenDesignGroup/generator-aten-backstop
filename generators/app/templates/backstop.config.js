const path = require('path');

// PROJECT_ID
// The unique identifier for this suite of tests. This value
// determines which folder your test results will eventually be stored in.
// This is important if you have multiple configuration files setup.
const PROJECT_ID = '<%= projectId %>';

// REFERENCE_DOMAIN
// The base site url from which reference screenshots will be created.
// This will often be production or, preferably, an environment with
// more stable content.
// This value can be set as an environment variable when running the reference
// commmand.
// Example:
//   REFERENCE_DOMAIN='https://prod.my_project.com' npm run reference
const REFERENCE_DOMAIN = '<%= referenceDomain %>';

// TEST_DOMAIN
// The base site url from which test screenshots will be created.
// This should be a pre-production or even local environment. To limit
// false negative test results the content in your test environment
// should mirror the reference environment as close as possible.
// This value can be set as an environment variable when running the test
// commmand.
// Example:
//   TEST_DOMAIN='https://local.test' npm run test
const TEST_DOMAIN = '<%= testDomain %>';

// This is where you define individual test scenarios.
// The defaultScenario values below will be applied to each scenario
// unless otherwise specified.
// See https://github.com/garris/BackstopJS#advanced-scenarios for possible options.
const scenarios = [
  {
    label: "Home",
    url: '/',
  },
  {
    label: "User Login",
    url: '/user/login',
  },
];

// This is the default scenario settings applied to all scenarios.
// Each of these property values can be overriden within a specific
// scenario definition in the scenarios array above.
// See https://github.com/garris/BackstopJS#advanced-scenarios for possible options.
const defaultScenario = {
  delay: 1000,
  hideSelectors: [],
  removeSelectors: [],
  hoverSelector: [],
  postInteractionWait: 6000,
  selectors: [],
  selectorExpansion: true,
  expect: 0,
  misMatchThreshold: 3,
  requireSameDimensions: true
};

// Backstop configuration.
const defaultConfig = {
  id: PROJECT_ID,
  viewports: [
    {
      label: "phone",
      width: 320,
      height: 480
    },
    {
      label: "tablet",
      width: 1024,
      height: 768
    },
    {
      label: "desktop",
      width: 1440,
      height: 768
    }
  ],
  onBeforeScript: "puppet/onBefore.js",
  onReadyScript: "puppet/onReady.js",
   paths: {
    bitmaps_reference: "backstop_data/bitmaps_reference",
    bitmaps_test: "backstop_data/bitmaps_test",
    engine_scripts: "backstop_data/engine_scripts",
    html_report: "backstop_data/html_report",
    ci_report: "backstop_data/ci_report"
  },
  report: [
    "browser"
  ],
  engine: "puppeteer",
  engineOptions: {
    "args": [
      "--no-sandbox"
    ]
  },
  asyncCaptureLimit: 2,
  asyncCompareLimit: 25,
  debug: true,
  debugWindow: false
};

const referenceDomain = process.env.REFERENCE_DOMAIN || REFERENCE_DOMAIN;
const testDomain = process.env.TEST_DOMAIN || TEST_DOMAIN;

const config = {
  ...defaultConfig,
  scenarios: scenarios.map(scenario => ({
    ...defaultScenario,
    ...scenario,
    url: path.join(testDomain, scenario.url),
    referenceUrl: path.join(referenceDomain, scenario.url),
  })),
};

module.exports = config;
