const fs= require('fs')
const vtt2srt=require('node-vtt-to-srt')
const path = require('path');

let extFirst='.vtt', extFinal='.srt';

// đường dẫn thư mục chứa các file vtt
const directoryPath = 'D:\\Courses-Udemy\\Git\Introduction';

fs.readdir(directoryPath, function (err, files) {
    if (err)
        return console.log('Unable to scan directory: ' + err);

    files.forEach(async function (fileName) {
        if(path.extname(fileName) === extFirst) 
        {
            let baseName=path.basename(fileName, extFirst);
            await fs.createReadStream(`${directoryPath}/${baseName}${extFirst}`)
                    .pipe(vtt2srt())
                    .pipe(fs.createWriteStream(`${directoryPath}/${baseName}${extFinal}`));
            
            // nếu ko muốn xoá file vtt cũ thì bỏ dòng này đi
            await fs.unlinkSync(`${directoryPath}/${baseName}${extFirst}`)  
        }
    });
});