import * as React from 'react';


type onUploadPropsType = {
  getSvgHTML: (text: string) => void;
};

export const UpLoader: React.FC<onUploadPropsType> = ({ getSvgHTML }) => {
  const ref = React.useRef<HTMLInputElement | null>(null);
  const fileContentsRef = React.useRef<HTMLDivElement | null>(null);

  const handleClick = () => ref.current !== null && ref.current.click();

  const onUpload = ({ target }: { target: HTMLInputElement }) => {
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

  return (
    <>
      <input accept="image/svg" ref={ref} style={{ display: 'none' }} onChange={onUpload} type="file" />

      <header className="App-header">
        <button onClick={handleClick}>Add SVG icon</button>

        <div ref={fileContentsRef} />
      </header>
    </>
  );
};
