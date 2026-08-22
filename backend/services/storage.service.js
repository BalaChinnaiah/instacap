const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");


const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


async function uploadFile(file) {

    try {

        const fileToUpload = await toFile(
            file.buffer,
            file.originalname
        );


        const result = await client.files.upload({

            file: fileToUpload,

            fileName: file.originalname

        });


        return result;

    } catch (error) {

        console.error(
            "ImageKit upload error:",
            error
        );

        throw error;
    }
}


// --------------------------------
// Download image from ImageKit
// --------------------------------

async function getImageBuffer(imageUrl) {

    try {

        const response = await fetch(imageUrl);


        if (!response.ok) {

            throw new Error(
                `Failed to download image: ${response.status}`
            );

        }


        const arrayBuffer =
            await response.arrayBuffer();


        return Buffer.from(arrayBuffer);

    } catch (error) {

        console.error(
            "Image download error:",
            error
        );

        throw error;
    }
}


module.exports = {
    uploadFile,
    getImageBuffer
};