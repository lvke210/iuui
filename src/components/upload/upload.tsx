import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames";
import Button from "../button/button";
import axios from "axios";

export type UploadStatus = "success" | "ready" | "uploading" | "error";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface uploadProps {
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>;

  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  multiple?: boolean;
}

const Upload: FC<uploadProps> = (props) => {
  const { action, onError, onProgress, onSuccess, beforeUpload, onChange, ...restProps } = props;
  const fileInput = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const handleClick = () => {
    if (fileInput.current) fileInput.current.click();
  };
  const hangdleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processenFile) => {
            post(processenFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          console.log(percentage, "percentage");
          if (percentage < 100) {
            console.log(percentage, "percentage");
            updateFileList(_file, { percent: percentage, status: "uploading" });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        console.log(res, "res");
        if (onSuccess) {
          onSuccess(res.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        if (onChange) {
          onChange(file);
        }
        console.log(err, "err");
        if (onError) {
          onError(err, file);
        }
      });
  };

  return (
    <div className="viking-upload-component">
      <Button btnType="primary" onClick={handleClick}>
        upload File
      </Button>

      <input
        type="file"
        style={{ display: "none" }}
        className="viking-file-input"
        ref={fileInput}
        onChange={hangdleFileChange}
        {...restProps}
      />
    </div>
  );
};

export default Upload;
