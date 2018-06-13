const xmldom = require('xmldom');
const c14n = require('xml-c14n')();
const fs = require('fs');

const processXMLFile = (inputFile, outputFile) => {
  console.log(`Input: ${inputFile}`);
  console.log(`Output: ${outputFile}`);

  // Check that the input file exists
  let rawXml = null;
  try {
    rawXml = fs.readFileSync(inputFile, 'utf8');
  } catch (err) {
    console.warn(`Can't process file ${inputFile}. Error is ${err}`);
    return;
  }

  // Convert the xml top an XML document
  const xmlDocument = (new xmldom.DOMParser()).parseFromString(rawXml);
  // Create the canonicalizer
  const canonicalizer = c14n.createCanonicaliser('http://www.w3.org/2001/10/xml-exc-c14n#WithComments');
  // Process the file
  canonicalizer.canonicalise(xmlDocument.documentElement, function(err, res) {
    if (err) {
      return console.warn(`Error processing XML. ${err}`);
    }
    // Write the file
    try {
        fs.writeFileSync(outputFile, res);
    } catch (err) {
        console.warn(`Can't write file ${outputFile}. Error is ${err}`);
    }
  });
  return;
};

module.exports = { processXMLFile };
