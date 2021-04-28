import * as React from "react";
import "./App.css";

function App() {
  const ref = React.useRef<HTMLInputElement | null>(null);
  const fileContentsRef = React.useRef<HTMLDivElement | null>(null);

  const [svgHTML, setSvgHTML] = React.useState("");

  const handleClick = () => ref.current !== null && ref.current.click();

  const onUpload = ({ target }: { target: HTMLInputElement }) => {
    const { 0: file } = target.files || ({} as FileList);

    if (file) {
      var reader = new FileReader();

      reader.readAsText(file, "UTF-8");

      reader.onload = function (evt: ProgressEvent<FileReader>) {
        if (evt.target !== null) {
          const filterContents = fileContentsRef.current;
          if (
            filterContents !== null &&
            typeof evt.target.result === "string"
          ) {
            setSvgHTML(evt.target.result);
          }
        }
      };

      reader.onerror = () => console.log("error reading file");
    }
  };

  return (
    <>
      <input
        accept="image/svg"
        ref={ref}
        style={{ display: "none" }}
        onChange={onUpload}
        type="file"
      />

      <div className="App">
        <header className="App-header">
          <button onClick={handleClick}>Загрузить</button>

          <div ref={fileContentsRef} />
        </header>

        <div dangerouslySetInnerHTML={{ __html: svgHTML }} />

        <div>{svgHTML}</div>
      </div>
    </>
  );
}

export default App;
