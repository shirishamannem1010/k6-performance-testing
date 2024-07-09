import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { chromium } from 'k6/experimental/browser';
export const options = {
    scenarios: {
        browser: {
            executor: 'per-vu-iterations',
            exec: 'browserTest',
            vus: 10,
            iterations: 1,
            maxDuration: '10m0s',
            gracefulStop: '30s',
        },
    },
    thresholds: {
        checks: ["rate==1.0"],
    },
};
export async function browserTest() {
    try {
        console.log('Launching Chrome...');
        const browser = await chromium.launch({
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
            
        });
        console.log('Chrome launched');

        console.log('Creating new context...');
        const context = await browser.newContext();
        console.log('New context created');

        console.log('Opening new page...');
        const page = await context.newPage();
        console.log('New page opened');

        console.log('Navigating to https://www.saucedemo.com/');
        await page.goto('https://www.saucedemo.com/');
        console.log('Navigation complete');

        console.log('Filling in username...');
        const usernameInput = await page.locator("#user-name");
        await usernameInput.fill("standard_user");
        console.log('Username filled');

        console.log('Filling in password...');
        const passwordField = await page.locator("#password");
        await passwordField.fill("secret_sauce");
        console.log('Password filled');

        // Perform any additional actions or checks
        console.log('Performing additional actions or checks...');

        console.log('Closing page...');
        await page.close();
        console.log('Page closed');

        console.log('Closing context...');
        await context.close();
        console.log('Context closed');

        console.log('Closing browser...');
        await browser.close();
        console.log('Browser closed');
    } catch (error) {
        console.error('Error in browserTest:', error.message || error);
    }
}

export function handleSummary(data) {
    return {
        "reports/index/ui_performance_test.html": htmlReport(data),
    };
}
