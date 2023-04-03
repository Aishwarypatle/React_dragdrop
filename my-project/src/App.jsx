import React, { useState } from "react";
import DropBox from "./components/DropBox";

const App = () => {
  const [prevFile, setPrevFile] = useState([]);

  const chooseFile = (files) => {
    setPrevFile(files);
    console.log(prevFile);
  };

  
  
  return (
    <>
      <section className="flex flex-col items-center justify-center w-screen h-full py-12 bg-[#E7EFFB]">
        {/* <div className="container grid h-6/12 w-6/12 justify-center items-center mb-32 py-8 sm:w-9/12 border-2 rounded-lg mt-20">
          <h1 className="font-extrabold text-teal-500 sm:text-xl text-3xl m-auto mt-8 ">
            UPLOAD VIDEO HERE
          </h1>
          <h6 className="mb-10 mt-1 m-auto text-slate-300 sm:text-xs">Click On the Button or Drag Files Here</h6>
          <DropBox />
        </div> */}

        <div className="justify-self-center w-9/12 border-2 rounded-xl mb-6 border-gray-300">
          <h2 className="title text-xl mt-6 font-extrabold text-neutral-600 border-b pb-3 text-center">
            Preview
          </h2>
          <ul className="flex flex-wrap justify-center m-6">
            {prevFile.map((file) => (
              <li
                key={file.name}
                className="relative h-32 rounded-md shadow-lg m-4"
              >
                <video
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="h-full w-full object-contain rounded-md"
                  controls
                >
                  <source src={file.preview} type="video/mp4" />
                </video>
             
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center w-fit h-9/12 flex-col bg-white rounded-3xl drop-shadow-3xl py-6 mx-6 ">
          <div className="my-6">
            <h1 className="font-extrabold text-2xl text-[#3F3F3F] text-center my-2">
              Upload Your Videos
            </h1>
            <h6 className="text-slate-300 text-xs text-center">
              Click On Button or Drag your video inside box
            </h6>
          </div>
          <div className="w-full p-10">
            <DropBox chooseFile={chooseFile} />
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
