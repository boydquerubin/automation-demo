const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

let driver;

beforeAll(async () => {
  driver = new Builder().forBrowser(Browser.CHROME).build();
});

afterAll(async () => {
  await driver.quit();
});

describe("moviesapp", () => {
  test("Can navigate to the app page", async () => {
    await driver.get("http://localhost:3000/");
    await driver.wait(until.titleIs("Movies List"), 1000);
  });

  test("Can submit a movie name", async () => {
    const movieTitle = "Avengers";

    await driver
      .findElement(By.name("movieTitle"))
      .sendKeys(movieTitle, Key.RETURN);

    await driver.wait(
      until.elementLocated(By.xpath(`//*[contains(text(), '${movieTitle}')]`)),
      1000
    );
  });

  test("Can delete a movie name from the list", async () => {
    const deleteBtn = driver.findElement(By.className("delete-btn"));
    await deleteBtn.click();
    await driver.sleep(1000);

    try {
      await driver.wait(
        until.elementLocated(
          By.xpath(`//*[contains(text(), 'Avengers deleted!')]`)
        ),
        1000
      );
    } catch (error) {
      expect(error.name).not.toBe("TimeoutError");
    }
  });
});
