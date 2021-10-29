# Visual Regression Testing

## Installation

```
nvm install && nvm use
```

Install BackstopJS

```
npm install
```

## Run tests

All the configuration for which screen sizes and urls to test exists in `backstop.config.js`. See the [Doumentation|https://github.com/garris/BackstopJS] for additional options.  Each scenario can override any of the default scenario configurations.

Before running tests you must first generate a set of reference screenshots as a baseline for comparison. To do so, run the following:

```
npm run reference
```

This will save screenshots into `./backstop_data/bitmaps_reference`

To run the set of tests, run the following

```
npm run test
```

To run a specific test, use the `--filters` flag. _Note the extra `--` between the command and flags._

```
npm run test -- --filters="Home"
```
This will only test the home page.

## Approving Tests
In some cases your test may result in a false negative. This is when a test result is "Failed" but the styles haven't really changed. This is most often due to intentional changes or differences in content between the test and reference environments.

If the test screenshot shows the expected result, you can promote it to be the new reference screenshot.

```
npm run approve
```

If the you only want to promote a specific page, such as the Home page, you can use the `--filter` flag again.

```
npm run approve -- --filters="Home"
```
## Custom Domains

Reference screenshots are captured on the site from the `REFERENCE_DOMAIN` and test screenshots are captured on the `TEST_DOMAIN` site. If you need to override these, to test your local environment for example, you can set the `TEST_DOMAIN` or `REFERENCE_DOMAIN` environment variables when running the reference or test commands.

```
TEST_DOMAIN='https://local.test' npm run test -- --filters="Home"
```

This will create test screenshots of https://local.test instead of the `TEST_DOMAIN` configured in `backstop.config.json`.
