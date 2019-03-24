# Smart GDPR CookieBar

1. **Main functionality:**
You cannot use marketing scripts without visitor agreement. CookieBar load this scripts only if visitor accept the "cookie using".

2. **Benefit:**
If anybody click on "Read more" button it collect data about your cookie-names (NOT values)
and our website (http://cookies.wakers.cz) show the "cookie GDPR conditions" based on this.
If we get unknown cookie-names we will receive an e-mail to fix this.

## Dependency:
- jQuery

## Installation

1. `npm install jzaplet/cookie-bar --save`

2. Append SCSS / CSS and Script into your project:
    ```html
    <link href="node_modules/cookie-bar/src/css/cookie-bar.css" rel="stylesheet">
        
    <script src="node_modules/cookie-bar/src/js/cookie-bar.js"></script>
    ```

3. Setup and Initialize
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