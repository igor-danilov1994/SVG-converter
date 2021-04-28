import * as React from "react";
import "./App.css";

function App() {
  const ref = React.useRef<any>();
  const [svgHTML, setSvgHTML] = React.useState<any>();

  let handleClick = () => {
    ref.current.click();
  };

  const ABC = ({ target }: { target: HTMLInputElement }) => {
    const { 0: file } = target.files || ({} as FileList);

    if (file) {
      var reader = new FileReader();

      reader.readAsText(file, "UTF-8");

      reader.onload = function (evt: ProgressEvent<FileReader>) {
        if (evt.target !== null) {
          console.log(evt.target.result);

          const filterContents = document.getElementById("fileContents");
          if (
            filterContents !== null &&
            typeof evt.target.result === "string"
          ) {
            filterContents.innerHTML = evt.target.result;

            setSvgHTML(evt.target.result);
          }
        }
      };

      reader.onerror = () => console.log("error reading file");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="fileContents" />

        <button onClick={handleClick}>Загрузить</button>
        <input
          accept="image/svg"
          ref={ref}
          style={{ display: "none" }}
          onChange={ABC}
          type="file"
        />
      </header>

      <div>{svgHTML}</div>
    </div>
  );
}

export default App;
