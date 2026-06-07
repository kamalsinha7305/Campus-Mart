import imageCompression from "browser-image-compression";

export const compressImage = async (file) => {
  //   const options = {
  //     maxSizeMB: 1,
  //     maxWidthOrHeight: 1920,
  //     useWebWorker: true,
  //     initialQuality: 0.8,
  //   };

  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    initialQuality: 0.8,
  };
  try {
    const compressedFile = await imageCompression(file, options);

    return compressedFile;
  } catch (error) {
    console.error("Image compression failed:", error);

    return file;
  }
};
