
import { jsonToToon, ConversionResult } from 'json2toon';

/**
 * Converts a JavaScript object into a TOON string using the json2toon package
 * and returns the result along with conversion statistics.
 * @param {object} jsonObj - The JavaScript object to convert.
 * @returns {ConversionResult} An object containing the TOON string and statistics.
 */
export const convertJsonAndGetStats = (jsonObj: object): ConversionResult => {
  // The jsonToToon function with includeStats: true returns a ConversionResult object.
  return jsonToToon(jsonObj, { includeStats: true });
};

/**
 * Formats a JSON string with an option for pretty-printing.
 * @param {string} jsonString - The JSON string to format.
 * @param {boolean} pretty - Whether to pretty-print the JSON.
 * @returns {string} The formatted JSON string.
 */
export const formatJson = (jsonString: string, pretty: boolean): string => {
    const obj = JSON.parse(jsonString);
    return pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
};
