"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* const path = require('path');
const i18n = require('i18n');

// Initialise the local
// Configure i18n
i18n.configure({
    locales: ['en', 'fr'],
    directory: path.join(__dirname),
    defaultLocale: 'en'
});

function setLocale(locale) {
    if (locale.toLowerCase() === 'fr-ca' || locale.toLowerCase() === 'fr-fr') {
        i18n.setLocale('fr');
    } else {
        i18n.setLocale('en');
    }
}

module.exports.i18n = i18n;
module.exports.setLocale = setLocale;
*/
const { I18n } = require('i18n');
const path_1 = require("path");
// Initialise the local
// Configure i18n
const i18n = new I18n();
i18n.configure({
    locales: ['en', 'fr'],
    directory: path_1.join(__dirname),
    defaultLocale: 'en'
});
exports.default = i18n;
//# sourceMappingURL=i18nConfig.js.map