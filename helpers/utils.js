let utils = {}
utils.smartTrim = function (str, length, delimiter, appendix){
    if (str.length <= length) return str;
    let trimmedStr = str.substr(0, length + delimiter.length);
    let lastDelimiterIndex = trimmedStr.lastIndexOf(delimiter);
    if (lastDelimiterIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimiterIndex);
    if (trimmedStr) trimmedStr += appendix;
    return trimmedStr;
}

module.exports = utils
