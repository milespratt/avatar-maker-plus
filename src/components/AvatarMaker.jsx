import React, { useCallback, useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faTimes } from "@fortawesome/free-solid-svg-icons";

import AvatarMakerStyles from "./AvatarMaker.styles";

// facial recognition
import * as faceapi from "face-api.js";
const MODEL_URL = "/models";
async function loadModels() {
  await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
  await faceapi.loadFaceLandmarkModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
  await faceapi.loadFaceExpressionModel(MODEL_URL);
}
loadModels();

export default function AvatarMaker({ className }) {
  // the image file created via drop zone, or upload
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);

  // facial recognition details
  const [faceDetails, setFaceDetails] = useState(null);

  // dropzone support
  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // ref for the editor
  const editorRef = useRef(null);

  // sets result image on load and on change of editor
  function setResultImage() {
    setResult(
      editorRef.current.getImageScaledToCanvas().toDataURL("image/png")
    );
  }

  // draw face details
  useEffect(() => {
    if (faceDetails) {
      const canvas = editorRef.current.canvas.current;
      faceapi.draw.drawDetections(canvas, faceDetails);
      faceapi.draw.drawFaceLandmarks(canvas, faceDetails, {
        drawLines: true
      });
      faceapi.draw.drawFaceExpressions(canvas, faceDetails);
    }
  }, [faceDetails]);

  function processImage() {
    if (result) {
      setProcessing(true);
      async function getFaceData() {
        let fullFaceDescriptions = await faceapi
          .detectAllFaces(editorRef.current.getImageScaledToCanvas())
          .withFaceLandmarks()
          .withFaceDescriptors()
          .withFaceExpressions();
        setProcessing(false);
        setFaceDetails(fullFaceDescriptions);
      }
      setTimeout(() => {
        getFaceData();
      }, 500);
    }
  }

  return (
    <AvatarMakerStyles className={className}>
      <button className="avatar__maker__close">
        <FontAwesomeIcon
          className="avatar__maker__close__icon"
          icon={faTimes}
        />
      </button>
      <span className="avatar__maker__title">Select profile photo</span>

      <div className="avatar__dropzone" {...getRootProps()}>
        {image ? (
          <AvatarEditor
            ref={editorRef}
            className="avatar__editor"
            image={image}
            width={235}
            height={235}
            border={0}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1}
            rotate={0}
            onImageReady={setResultImage}
            onPositionChange={setResultImage}
          />
        ) : (
          <>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop your photo to begin editing...</p>
            ) : (
              <div className="avatar__dropzone__controls">
                <FontAwesomeIcon
                  className="avatar__dropzone__icon"
                  icon={faImages}
                />
                <p className="avatar__dropzone__message avatar__dropzone__message--bold">
                  Drag a profile photo here
                </p>
                <p className="avatar__dropzone__message">- or -</p>
                <button className="avatar__maker__control avatar__maker__control--slim">
                  Select from your computer
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="avatar__maker__controls">
        <button
          onClick={processImage}
          className={
            image && !processing
              ? "avatar__maker__control"
              : "avatar__maker__control avatar__maker__control--inactive"
          }
        >
          Set as profile photo
        </button>
        <button
          onClick={() => {
            setResult(null);
            setImage(null);
          }}
          className={
            image && !processing
              ? "avatar__maker__control avatar__maker__control--secondary"
              : "avatar__maker__control avatar__maker__control--secondary avatar__maker__control--inactive"
          }
        >
          Cancel
        </button>
        {processing && (
          <div className="loading__indicator">
            <span className="loading__message">Processing image...</span>
            <div className="loader"></div>
          </div>
        )}
      </div>
    </AvatarMakerStyles>
  );
}

AvatarMaker.defaultProps = {
  className: "avatar__maker"
};
