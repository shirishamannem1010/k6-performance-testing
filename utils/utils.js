exports.executeStep = async(test,element,action,description,data) => {
    await test.step(description, async () => {
        switch(action) {
            case "click" : 
                await element.click();
                break;
            case "fill" :
                await element.fill(data);
                break;
            case "selectOption" :
                await element.selectOption(data);
                break;
            case "navigate" :
                await element.goto(data);
                break;
            case "type" :
                await element.type(data);
                break;
            case "tap" :
                await element.tap();
                break;
        }
    })
}