const {chromium} = require('playwright');

describe ('UI test for kitapyurdu.com using playwright', () => {

    //jest timeout is by default 5000 ms to run tests, with this we override this value 
    jest.setTimeout(30000);

    let browser= null;
    let page = null;
    let context = null;

    // run before all tests 
    beforeAll(async() =>{
        browser = await chromium.launch({headless:false,slowMo:100});
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://www.kitapyurdu.com');
    });

    // run after all tests
    afterAll(async() => {
        await browser.close();
    });

    test('book buying end-to-end test', async() => {
        await page.getByText('KitapÇok Satan Kitaplar Haftalık Çok Satan KitaplarTüm Kitaplar Çok Satan Edebiy').click();
        await page.evaluate(()=>{
            window.scrollTo(0,3500);
        })
       
        await page.getByRole('link', { name: 'Hep Okunanlar', exact: true }).click();
        await page.locator('.image').first().click();
        await page.locator('#button-cart').click();
        await page.getByRole('heading', { name: 'Sepetim' }).click();
        await page.getByRole('link', { name: 'Sepete Git' }).click();
        await page.locator('input[name="quantity"]').click();
        await page.locator('input[name="quantity"]').fill('4');
        await page.getByTitle('Güncelle').click();
        await page.locator('#cart_module div').filter({ hasText: 'Satın Al Alışverişe Devam Et' }).getByRole('link', { name: 'Satın Al' }).click();
    
    });

});