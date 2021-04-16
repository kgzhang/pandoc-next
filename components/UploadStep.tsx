import { FC, useCallback, useState } from "react";
import { FormControl } from "baseui/form-control";
import { FileUploader } from "baseui/file-uploader";
import axios from "axios";
import {
  IFileFormat,
  FileFormatSelect,
  formats,
} from "../components/FileFormatSelect";

interface IUploadResult {
  success: boolean;
  name: string;
}

interface IProps {
  onUpload(result: IUploadResult): void;
}

export const UploadStep: FC<IProps> = ({ onUpload }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [format, setFormat] = useState<IFileFormat>(formats[0]);
  const [progress, setProgress] = useState<number | null>(null);

  const handleUploadProgress = useCallback((progressEvent) => {
    setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
  }, []);

  const handleDrop = useCallback(
    (accesstedFiles: File[], rejectedFiles: File[]) => {
      // handle errors
      if (rejectedFiles.length > 0) {
        if (rejectedFiles.length > 1) {
          setErrorMessage("Too many files");
          return;
        }
        setErrorMessage("Something wrong happened");
        return;
      }

      // Start uploading a file
      const data = new FormData();
      accesstedFiles.forEach((file, i) => {
        data.append(`files[${i}]`, file);
      });

      data.append("format", format.value);

      axios
        .post("/api/upload", data, {
          onUploadProgress: handleUploadProgress,
          responseType: "json",
        })
        .then((res) => {
          if (!res || !res.data) {
            setErrorMessage("Unknown error occurred");
            return;
          }
          if (!res.data.success) {
            setErrorMessage(res.data.error || "Something wrong happened");
            return;
          }
          onUpload(res.data);
        });
      setErrorMessage("");
    },
    [onUpload, format]
  );

  const handleCancel = useCallback(() => {
    setErrorMessage("Upload cancelled");
  }, []);

  const handleRetry = useCallback(() => {
    setProgress(null);
    setErrorMessage("");
  }, []);

  return (
    <>
      <FormControl label="目标转换格式:">
        <FileFormatSelect onSelect={setFormat} />
      </FormControl>

      <FileUploader
        multiple={false}
        onCancel={handleCancel}
        onDrop={handleDrop}
        onRetry={handleRetry}
        progressAmount={progress}
        progressMessage={progress ? `上传中... ${progress}/100` : ""}
        errorMessage={errorMessage}
      />
    </>
  );
};
