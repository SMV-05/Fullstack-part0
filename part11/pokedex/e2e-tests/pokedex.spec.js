const { test, describe, expect } = require('@playwright/test');

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Pokédex')).toBeVisible();
    await expect(
      page.getByText('Full Stack Open — Part 11 CI/CD')
    ).toBeVisible();
  });

  test('can navigate to a pokemon page and see its abilities', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('pokemon-ivysaur').click();

    await expect(page.getByText('ivysaur')).toBeVisible();
    await expect(page.getByTestId('ability-chlorophyll')).toBeVisible();
    await expect(page.getByTestId('ability-overgrow')).toBeVisible();
  });
});
