import {
    useRef,
    useState
} from "react";


function ImageUploader({
    onImageSelect
}) {

    const inputRef = useRef(null);

    const [preview, setPreview] =
        useState(null);


    function processFile(file) {

        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {

            alert(
                "Please select an image file."
            );

            return;
        }


        const imageUrl =
            URL.createObjectURL(file);


        setPreview(imageUrl);

        onImageSelect(file);

    }


    function handleFileChange(event) {

        const file =
            event.target.files[0];

        processFile(file);

    }


    function handleDrop(event) {

        event.preventDefault();

        const file =
            event.dataTransfer.files[0];

        processFile(file);

    }


    function handleDragOver(event) {

        event.preventDefault();

    }


    function openFilePicker() {

        inputRef.current?.click();

    }


    return (

        <div
            className={
                preview
                    ? "upload-card has-image"
                    : "upload-card"
            }

            onDrop={handleDrop}

            onDragOver={handleDragOver}

            onClick={openFilePicker}
        >

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
            />


            {preview ? (

                <div className="image-preview-container">

                    <img
                        src={preview}
                        alt="Selected"
                        className="image-preview"
                    />


                    <div className="image-overlay">

                        <span>
                            Change image
                        </span>

                    </div>

                </div>

            ) : (

                <div className="upload-placeholder">

                    <div className="upload-icon">
                        ↑
                    </div>


                    <h3>
                        Drop your image here
                    </h3>


                    <p>
                        or click to browse from your device
                    </p>


                    <span className="upload-format">
                        JPG, PNG or WEBP
                    </span>

                </div>

            )}

        </div>

    );

}


export default ImageUploader;