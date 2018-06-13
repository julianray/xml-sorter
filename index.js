const program = require('commander');
const { processXMLFile } = require('./processor');

program
  .version('0.0.1')
  .description('A XML canonicalizer and sorter.');

program
  .command('sort <input> <output>')
  .alias('s')
  .description('Canonicalize and sort a file')
  .action((input, output) => {
    processXMLFile(input, output);
  });

program.parse(process.argv);