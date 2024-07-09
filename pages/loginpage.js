// const { executeStep } = require('../utils/utils')
require('dotenv').config();

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator("//input[@id='user-name']");
        this.passwordInput = page.locator("//input[@id='password']");
        this.loginButton = page.locator("//input[@id='login-button']");
        this.errorMsg = page.locator("//h3[text()='Epic sadface: Sorry, this user has been locked out.']");
        this.appTitle = page.locator("//div[@class='app_logo']");
        this.openMenuButton = page.locator("//button[@id='react-burger-menu-btn']");
        this.logoutButton = page.locator("//a[@id='logout_sidebar_link']");
    }

    async launchUrl(url) {
        await this.page.goto(url);
    }

    async loginFunctionality(username,password) {
        await this.page.fill(this.usernameInput,username);
        await this.page.fill(this.passwordInput,password);
        await this.page.click(this.loginButton);
    }

    async logoutFunctionality() {
        await this.page.click(this.openMenuButton);
        await this.page.click(this.logoutButton);
    }
}