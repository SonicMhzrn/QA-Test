const { test, expect } = require("@playwright/test");
const testData = require("../../Fixtures/Login.fixture.json");
const { LoginPage } = require("../../pageObjects/contactTest.login.po");
const { DashboardPage } = require("../../pageObjects/contactTest.dashboard.po");

// const { beforeEach } = require("node:test");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Contact List App/);
});

test.describe("valid login tests", () => {
  test.only("login valid", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.username, testData.validUser.password);
  });
});

test.describe("invalid login tests", () => {
  test("login invalid", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.invalidCredentials.username,
      testData.invalidUser.invalidCredentials.password
    );

    await login.invalidLogin("Incorrect username or password");
    // const errorMessage = await page.locator("#error").textContent();
    // expect(errorMessage).toContain("Your username is invalid!");
  });

  test("empty field", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.emptyField.username,
      testData.invalidUser.emptyField.password
    );
    await login.invalidLogin("Incorrect username or password");
  });

  test("username empty", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.emptyUsername.username,
      testData.invalidUser.emptyUsername.password
    );
    await login.invalidLogin("Incorrect username or password");
  });

  test("Password empty", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.emptyPassword.username,
      testData.invalidUser.emptyPassword.password
    );
    await login.invalidLogin("Incorrect username or password");
  });

  test("username with leading space", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.usernameLeadingSpace.username,
      testData.invalidUser.usernameLeadingSpace.password
    );
    await login.invalidLogin("Incorrect username or password");
  });

  test("password with leading space", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.passwordLeadingSpace.username,
      testData.invalidUser.passwordLeadingSpace.password
    );
    await login.invalidLogin("Incorrect username or password");
  });
});

// test.only("Edit contact test", async ({ page, request }) => {
  
//   const dashboard = new DashboardPage(page);
//   const Data = { fname: "hello", lname: "world" };
//   const accessToken = await authenticateUser1({ request });
//   const entityId = await createEntity(Data, accessToken, "/contacts", {
//     request,
//   });
//   await intercept(
//     "https://thinking-tester-contact-list.herokuapp.com/contacts/**",
//     { context, page }
//   );
//   page.reload();
//   page.waitForTimeout(5000);
//   await dashboard.contactEdit();
//   page.waitForTimeout(5000);
//   await login.editContact(
//     contactData.updateName.ufname,
//     contactData.updateName.ulname
//   );
// });

// async function intercept (module, {context, page}){
//   await context.route(module, async route =>{
//     await route.continue();
//     const response = await page.waitForResponse(module);
//     // page.waitForTimeout(5000);
//     const responseBody = await response.json();
//     interceptId = responseBody._id;
//   })
// }