/**
 *  Smart GDPR CookieBar
 *
 *  Copyright (c) 2019 Wakers.cz
 *  @author Jiří Zapletal (http://www.wakers.cz, zapletal@wakers.cz)
 *
 */

$(function ()
{
    $.CookieBar = function (options)
    {
        var cookieBar = $.extend(
        {
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


            /**
             * Initialize:
             * - If visitor give you agreement it load scripts
             * - If not it shows CookieBar.
             */
            init: function ()
            {
                if (cookieBar.companyName === null)
                {
                    throw "CookieBar: Please set companyName before calling init";
                }

                cookieBar.scriptsWithoutAgreement.call();

                if (cookieBar.isAgreed())
                {
                    cookieBar.scriptsWithAgreement.call();
                }
                else
                {
                    cookieBar.createBar();
                    cookieBar.initBtnEvents();
                }
            },


            /**
             * Append button events
             */
            initBtnEvents: function ()
            {
                // Button more
                $(document).on('click', '#' + cookieBar.elementId + '_more', function ()
                {
                    var size =  {
                        x: screen.width / 2 - 400,
                        y: screen.height / 2 - 300
                    };

                    var params = 'width=800,height=600,top=' + size.y + ',left=' + size.x;

                    window.open(cookieBar.getPopupUrl(), 'Cookies - ' + cookieBar.getSiteUrl(), params);
                });

                // Button OK
                $(document).on('click', '#' + cookieBar.elementId + '_ok', function ()
                {
                    document.cookie = cookieBar.cookieAgreementName + '=1;path=/';

                    $('#' + cookieBar.elementId).remove();

                    cookieBar.scriptsWithAgreement.call();
                });
            },


            /**
             * Return that visitor agreed or not
             * @return {boolean}
             */
            isAgreed: function ()
            {
                return cookieBar.getCookie(cookieBar.cookieAgreementName) === '1';
            },


            /**
             * Remove all cookies from all paths
             */
            removeAllCookies: function ()
            {
                var cookies = cookieBar.getCookieNamesString().split('|');

                for (var i = 0; i < cookies.length; i++)
                {
                    cookieBar.removeCookie(cookies[i]);
                }
            },


            /**
             * Remove cookie from all paths
             * @param name
             */
            removeCookie: function (name)
            {
                var pathBits = location.pathname.split('/');
                var pathCurrent = ' path=';

                document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';

                for (var i = 0; i < pathBits.length; i++)
                {
                    pathCurrent += ((pathCurrent.substr(-1) !== '/') ? '/' : '') + pathBits[i];
                    document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
                }
            },


            /**
             * Return cookie by name
             * @param name
             * @return {*}
             */
            getCookie: function (name)
            {
                var cookieName = name + "=";
                var ca = document.cookie.split(';');

                for(var i = 0; i < ca.length; i++)
                {
                    var c = ca[i];

                    while (c.charAt(0) === ' ')
                    {
                        c = c.substring(1);
                    }

                    if (c.indexOf(cookieName) === 0)
                    {
                        return c.substring(cookieName.length, c.length);
                    }
                }

                return null;
            },


            /**
             * Return all saved cookie-names as string with "|" delimiter
             * @return {string}
             */
            getCookieNamesString: function ()
            {
                var cookies = document.cookie;
                var regex = /([a-zA-Z0-9\_\-]*)\=/gm;
                var match = regex.exec(cookies);

                var result = '';

                while (match !== null)
                {
                    result += match[1] + '|';
                    match = regex.exec(cookies);
                }

                return result.substr(0, result.length - 1)
            },


            /**
             * Return domain with HTTP / HTTPS
             * @return {string}
             */
            getSiteUrl: function ()
            {
                return location.protocol + '//' + window.location.hostname;
            },


            /**
             * Return popup url
             * @return {string}
             */
            getPopupUrl: function ()
            {
                return 'http://cookies.wakers.cz/?site=' + cookieBar.getSiteUrl()
                    + '&company=' + cookieBar.companyName
                    + (cookieBar.companyLink !== null ? '&companyLink=' + cookieBar.companyLink : '')
                    + (cookieBar.getCookieNamesString() !== '' ? '&cookies=' + cookieBar.getCookieNamesString() : '');
            },


            /**
             * Create HTML cookie bar
             */
            createBar: function ()
            {
                var html = '';

                html += '<div id="' + cookieBar.elementId + '" style="position: fixed; bottom: 0">';
                html +=     '<div style="float: left">' + cookieBar.message + '</div>';
                html +=     '<div style="float: right">';
                html +=         '<button id="' + cookieBar.elementId + '_more">' + cookieBar.btnMore + '</button>';
                html +=         '<button id="' + cookieBar.elementId + '_ok">' + cookieBar.btnOk + '</button>';
                html +=     '</div>';
                html += '</div>';

                $('body').append(html);
            }

        }, options || {} );


        return cookieBar;
    };

});

