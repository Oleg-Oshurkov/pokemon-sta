import { test, expect } from '@playwright/test'

test.describe('pokemon search test', () => {
    test('test search for pokemon by string and receive pokemon info', async ({ page }) => {
        await page.goto('http://localhost:5173/')
        await page.getByPlaceholder('Type the Pokemon\'s name').fill('bul')
        await page.getByText('bulbasaur').click()
        await page.getByText('Legend', { exact: true }).click()
        await page.getByRole('dialog', { name: 'bulbasaur' }).click()
        expect(await page.getByRole('cell', { name: '7' }).textContent()).toBe('7')
        await page.getByRole('button', { name: 'Close' }).first().click()
        expect(await page.getByTestId('listitem').count()).toBe(5)
    })
    
    test('test search for pikachu using BE query search', async ({ page }) => {
        await page.goto('http://localhost:5173/')
        await page.getByRole('radiogroup').locator('span').nth(2).click()
        await page.getByTestId('search').fill('pik')
        await page.getByText('pikachu').click()
        const genus = await page.getByRole('cell', { name: 'Mouse Pokémon' }).textContent()
        expect(genus).toBe('Mouse Pokémon')
        await page.getByRole('button', { name: 'Close' }).first().click()
        expect(await page.getByTestId('listitem').count()).toBe(2)
    })
})
