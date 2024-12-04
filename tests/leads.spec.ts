import { test, expect } from "@playwright/test";
import { time } from "console";

test("deve cadastrar um lead na fila de esperar", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // await page.click("//button[text()='Aperte o play... se tiver coragem']");
  await page.getByRole("button", { name: /Aperte o play/ }).click();

  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );

  // await page.locator("#name").fill("John Doe");

  //Procurar o input pelo name
  //await page.locator("input[name=name]").fill("John Doe");

  //procurar o input pelo placeholder
  await page.getByPlaceholder("Seu nome completo").fill("John Doe");

  await page.getByPlaceholder("Seu email principal").fill("johndoe@teste.com");

  await page.getByTestId("modal").getByText("Quero entrar na fila!").click();

  /*
  await page.getByText("seus dados conosco").click();
  const content = await page.content();
  console.log(content);
*/

  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await expect(page.locator(".toast")).toHaveText(message);

  await expect(page.locator(".toast")).toBeHidden({ timeout: 5000 });
  //  await page.waitForTimeout(5000);
});
