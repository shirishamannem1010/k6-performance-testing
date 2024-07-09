#!/bin/bash

# Run Playwright UI test
echo "Running Playwright UI test..."
node -e "require('./ui_performance.spec.js').launchURLTest().catch(err => { console.error(err); process.exit(1); });"

# Check if Playwright test passed
if [ $? -ne 0 ]; then
    echo "Playwright test failed. Exiting..."
    exit 1
fi

# Run k6 load test
echo "Running k6 load test..."
k6 run k6_test.spec.js
