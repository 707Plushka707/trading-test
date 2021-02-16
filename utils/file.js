const fs = require('fs')

function exportData(data, file) {
    fs.appendFile(file, data + "\n", function (err) {
      if (err) throw err;
    });
}
function removeFile(data, file) {
    if (fs.existsSync(file)) {
        try {
            fs.unlinkSync(file)
            //file removed
        } catch(err) {
            console.error(err)
        }
    }
}


module.exports = {
    exportData,
    removeFile
};