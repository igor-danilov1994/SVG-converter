import * as React from 'react';
import '../../../style/style.css'
import {Button, Upload} from "@ebs-integrator/react-ebs-ui";
import {ChangeEvent} from "react";

type onUploadPropsType = {
  getSvgHTML: (text: string) => void;
};

export const UpLoader: React.FC<onUploadPropsType> = ({ getSvgHTML }) => {
  /*const ref = React.useRef<HTMLInputElement | null>(null);*/
  const fileContentsRef = React.useRef<HTMLDivElement | null>(null);

 /* const handleClick = () => ref.current !== null && ref.current.click();*/

  const onUpload = ({ target }: { target: HTMLInputElement }) => {
    debugger
    if (target.files !== null) {
      const { 0: file } = target.files;

      const reader = new FileReader();

      reader.readAsText(file, 'UTF-8');

      reader.onload = (evt: ProgressEvent<FileReader>) => {
        if (evt.target !== null) {
          const filterContents = fileContentsRef.current;
          if (filterContents !== null && typeof evt.target.result === 'string') {
            getSvgHTML(evt.target.result);
          }
        }
      };

      reader.onerror = (err: ProgressEvent<FileReader>) => console.error('error reading file', err);
    }
  };

  const ABC = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }

  return (
    <>

      <Upload type={'file'} accept={'image/svg'} onChange={ABC} >
        <Button>Upload</Button>
      </Upload>
     {/* <input accept="image/svg" ref={ref} style={{ display: 'none' }} onChange={onUpload} type="file" />*/}

      <header className="App-header">
       {/* <Button onClick={handleClick}>Add SVG icon</Button>*/}

        <div ref={fileContentsRef} />
      </header>
    </>
  );
};
