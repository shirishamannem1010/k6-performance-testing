const { executeStep } = require('../utils/utils')
require('dotenv').config();

exports.HomePage = class HomePage {

    constructor(test,page) {
        this.test = test;
        this.page = page;
        this.addBackPackToCartButton = page.locator("//button[@id = 'add-to-cart-sauce-labs-backpack']");
        this.addBikeLightToCartButton = page.locator("//button[@id = 'add-to-cart-sauce-labs-bike-light']");
        this.addTShirtToCartButton = page.locator("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']");
        this.cartCount = page.locator("//span[@class = 'shopping_cart_badge']");
    }

    async addProductsToCart() {
        await executeStep(this.test,this.addBackPackToCartButton,"click","Click add to cart button of sauce labs backpack");
        await executeStep(this.test,this.addBikeLightToCartButton,"click","Click on add to cart button of sauce labs backpack");
        await executeStep(this.test,this.addTShirtToCartButton,"click","Click on add to cart button of sauce labs bolt t-shirt");
    }
}