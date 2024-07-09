// import http from 'k6/http';
// import { sleep } from 'k6';

// export default function () {
//     // Perform load testing with k6
//     const response = http.get('https://www.saucedemo.com/');
//     console.log(response.status);

//     sleep(1);
// }

import { chromium } from 'k6/experimental/browser';

export const options = {
    scenarios: {
        ui_test: {
            executor: 'constant-vus',
            vus: 1,
            duration: '1m',
        },
    },
    thresholds: {
        checks: ['rate>0.95'],
    },
};

export default async function () {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Navigate to the URL
        await page.goto('https://example.com');

        // Perform some actions
        await page.click('text=More information...');

        // Take a screenshot
        await page.screenshot({ path: 'screenshot.png' });

        // Add your assertions or checks here
        // Example: Check if the title is correct
        const title = await page.title();
        console.log('Page title:', title);

        if (title !== 'Example Domain') {
            throw new Error('Title does not match');
        }

    } catch (error) {
        console.error('Error during UI test:', error.message);
    } finally {
        await page.close();
        await context.close();
        await browser.close();
    }
}
