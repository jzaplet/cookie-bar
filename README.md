# Smart GDPR CookieBar

1. You must describe which cookies you use on the website and you cannot use marketing 
cookies without visitor accept the "cookie using". **This CookieBar is sufficient basic solution**. 
This CookieBar can load marketing scripts only if visitor accept the "cookie using".

2. **Benefit:** If anybody click on "Read more" button it collect data about cookie-names (NOT values)
and our website (http://cookies.wakers.cz) show the "cookie conditions" based on this.
If we get unknown cookie-names we will receive an e-mail to fix this.

## Dependency:
- jQuery 3.3.1

## Installation

1. Install via NPM from Github: 
    ```bash
    npm install jzaplet/cookie-bar --save
    ```

2. Append or build (scss) styles and script:
    ```html
    <link href="node_modules/cookie-bar/src/css/cookie-bar.css" rel="stylesheet">
        
    <script src="node_modules/cookie-bar/src/js/cookie-bar.js"></script>
    ```

3. Setup and Initialize:
    ```javascript
    $(function ()
    {
        var cookieBar = $.CookieBar(
        {
            companyName: 'Your Dev Company',
            companyLink: 'https://www.doman.tld',
            
            scriptsWithAgreement: function () 
            {
                // Here is the place for load your marketing scripts
                
                // Example - Google Tag Manager
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-XXXX');
            }
        });
    
        // Initialize cookieBar
        cookieBar.init();
    });
    ```

## API

### Minimal configuration
```javascript
var options = {
    companyName: 'Your Developer company'
};

$.CookieBar(options).init();
```

### Settings
```javascript
var options = {
    // Info about Developer company
    companyName: null, // Wakers.cz
    companyLink: null, // https://www.wakers.cz

    // Messages
    message: 'Tento web používá cookies k dosažení potřebné funkcionality. Jeho dalším používáním s tímto souhlasíte.',
    btnMore: 'Více informací',
    btnOk: 'Ok',

    // Element ID & Agreement cookie name
    elementId: '_cookie-bar',
    cookieAgreementName: '_cookie-agreement-by19wakers', // Do not change prefix _cookie-agreement-*

    // Callback for custom script loading
    scriptsWithoutAgreement: function () {},
    scriptsWithAgreement: function () {},
}

$.CookieBar(options).init();
```

### Methods

```javascript
/**
 * Create object CookieBar 
 */
var cookieBar = $.CookieBar({
    companyName: 'Your Developer company'
});


/**
 * Initialize:
 * - If visitor give you agreement it load scripts
 * - If not it shows CookieBar.
 */
cookieBar.init();


/**
 * Append button events
 */
cookieBar.initBtnEvents();


/**
 * Return that visitor agreed or not
 * @return {boolean}
 */
cookieBar.isAgreed();


/**
 * Remove all cookies from all paths
 */
cookieBar.removeAllCookies();


/**
 * Remove cookie from all paths
 * @param name
 */
cookieBar.removeCookie(name);


/**
 * Return cookie by name
 * @param name
 * @return {null|string}
 */
cookieBar.getCookie(name);


/**
 * Return all saved cookie-names as string with "|" delimiter
 * @return {string}
 */
cookieBar.getCookieNamesString();


/**
 * Return domain with HTTP / HTTPS
 * @return {string}
 */
cookieBar.getSiteUrl();


/**
 * Return popup url
 * @return {string}
 */
cookieBar.getPopupUrl();


/**
 * Create HTML cookie bar
 */
cookieBar.createBar();
```
