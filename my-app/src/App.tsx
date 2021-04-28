import * as React from "react";
import "./App.css";

function App() {
    const ref = React.useRef<HTMLInputElement | null>(null);
    const fileContentsRef = React.useRef<HTMLDivElement | null>(null);

    const SvgCode = React.useRef <HTMLCollectionOf<any>>()

    const [svgHTML, setSvgHTML] = React.useState("");

    const [stroke, setStroke] = React.useState(0.1)

    const handleClick = () => ref.current !== null && ref.current.click();


    React.useEffect(() => {
        let svg = document.getElementsByTagName('svg')
        SvgCode.current = svg
    })

    const onUpload = ({target}: { target: HTMLInputElement }) => {
        const {0: file} = target.files || ({} as FileList);

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

    const changeStroke = (e: any) => {
        const element = SvgCode.current![0]

        !element.attributes['stroke-width'] &&
        element.setAttribute('stroke-width', '2')

        !element.attributes['stroke'] &&
        element.setAttribute('stroke', 'black')

        element.attributes['stroke-width'].value = e.currentTarget.value

        setSvgHTML(SvgCode.current![0].outerHTML)

    }

    return (
        <>
            <input
                accept="image/svg"
                ref={ref}
                style={{display: "none"}}
                onChange={onUpload}
                type="file"
            />

            <div className="App">
                <header className="App-header">
                    <button onClick={handleClick}>Загрузить</button>

                    <div ref={fileContentsRef}/>
                </header>

                <div style={{marginLeft: '20px'}} dangerouslySetInnerHTML={{__html: svgHTML}}/>

                <div>{svgHTML}</div>
            </div>
            <div>
                <label htmlFor="">Change Stroke-width</label>
                <input min={0} max={10} step={0.1} type="range" onChange={changeStroke}/>

                {SvgCode.current && <a download href={SvgCode.current[0]}> Download</a>}

            </div>
        </>
    )
}

export default App;
