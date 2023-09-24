const path = require('path')

module.exports = function (source) {
    return `export function fnA(str) {
        return \`__\${str.toUpperCase()}__\`;
    }`;
}