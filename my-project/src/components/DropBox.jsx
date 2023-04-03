import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadFile, CloudCircle } from "@mui/icons-material";
import Lottie from "react-lottie";
import animationData from "../components/lottie/svg-folder.json";
import folder from "../assets/folder.svg";

function DropBox({ chooseFile }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // chooseFile(acceptedFiles);
    // Create an S3 object with the access key, secret access key, and region of your S3 bucket
  
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "video/mp4": [] },
    onDrop,
  });

  // Animation Data
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <form onChange={chooseFile(files)}>
      <div
        style={{ width: "100%" }}
        className="box border-2 border-dashed w-full bg-slate-100 border-sky-600 rounded-3xl px-24 py-10"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="mx-4 my-6 text-xs text-slate-300">
            <Lottie
              options={defaultOptions}
              height={70}
              width={70}
              style={{ marginBottom: "16px", marginTop: "16px" }}
            />
            <p className="m-auto">Drop here</p>
          </div>
        ) : (
          <button className="m-4 text-xs text-slate-300">
            <img className="my-4" src={folder} alt="folder" /> Upload here
          </button>
        )}
      </div>

      {/* <div>
        <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
          Accepted Files
        </h3>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
          {files.map((file) => (
            <li key={file.name} className="relative h-32 rounded-md shadow-lg">
              <video
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className="h-full w-full object-contain rounded-md"
                controls
              >
                <source src={file.preview} type="video/mp4"/>
              </video>
            </li>
          ))}
        </ul>
      </div> */}
    </form>
  );
}

export default DropBox;
