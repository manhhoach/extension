const express = require('express')
const app = express()
const cloudinary = require('cloudinary');
const port = 3000
const { upload_array } = require('./uploads')
const { getFileName } = require('./getFileName')
const config = require('./config');
const fs = require('fs');
cloudinary.config(config)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/uploads', upload_array, async (req, res) => {
    try {
        let data = await Promise.all(
            req.files.map(async (file) => {
                let filename = getFileName(file.filename)
                let result = await cloudinary.v2.uploader.upload(file.path, { public_id: filename })
                fs.unlinkSync(file.path);
                return result;
            })
        )
        res.json({
            data
        })

    }
    catch (err) {
        console.log(err)
    }



})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})