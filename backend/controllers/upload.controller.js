const { uploadFile } = require("../services/storage.service");


async function uploadImage(req, res) {

    try {

        console.log("UPLOAD CONTROLLER HIT");

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image"
            });
        }


        const result = await uploadFile(req.file);


        return res.status(200).json({
            message: "Image uploaded successfully",

            image: {
                url: result.url,
                fileId: result.fileId,
                name: result.name
            }
        });

    } catch (error) {

        console.error("UPLOAD CONTROLLER ERROR:");
        console.error(error);

        return res.status(500).json({
            message: "Image upload failed",
            error: error.message,
            name: error.name
        });
    }
}


module.exports = {
    uploadImage
};