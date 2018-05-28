var markdownPdf = require('markdown-pdf')
var fs = require('fs')
var printer = require('printer');

const printerName = 'Brother_HL_2270DW_series';
const inputMarkdown = 'todoTemplate.md';
const outputPdf = 'todoOutput.pdf';

var outputStream = fs.createWriteStream(outputPdf)

outputStream.on('pipe', function() {
  console.log('writing pdf...')
})

outputStream.on('finish', function() {
  console.log('printing file...')
  printFile(outputPdf);
})

fs.createReadStream(inputMarkdown).pipe(markdownPdf()).pipe(outputStream)

function printFile(filename) {
  printer.printFile({
    filename: filename,
    printer: printerName,
    type: 'PDF',
    success: function() {
      console.log('printed: ' + filename);
    },
    error: function(err) {
      console.log(err);
    }
  });
}