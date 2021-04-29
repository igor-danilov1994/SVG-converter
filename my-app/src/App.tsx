import * as React from "react";
import "./App.css";
import {useState} from "react";

export function App() {
    const ref = React.useRef<HTMLInputElement | null>(null);
    const fileContentsRef = React.useRef<HTMLDivElement | null>(null);

    const SvgCode = React.useRef <HTMLCollectionOf<any>>()

    const [svgHTML, setSvgHTML] = React.useState("");

    const [countPath, setCountPath] = useState<any[]>([])

    const handleClick = () => ref.current !== null && ref.current.click();


    React.useEffect(() => {
        SvgCode.current = document.getElementsByTagName('svg')
    }, [])

    React.useEffect(() => {
        if (svgHTML) {
            const element = SvgCode.current![0]

            let result = [].slice.call(element.children)

            let currentPath: any = result.filter((element: any) => element.attributes['stroke-width'])

            setCountPath(currentPath)
        }
    }, [svgHTML])

    const onUpload = ({target}: { target: HTMLInputElement }) => {
        const {0: file} = target.files || ({} as FileList);

        if (file) {
            const reader = new FileReader();

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

    const changeStroke = (e: React.FormEvent<HTMLInputElement>, index: number) => {

        countPath[index].attributes['stroke-width'].value = e.currentTarget.value

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

            {countPath.map((el: any, index: number) =>
                <div key={index}>
                    <label htmlFor="">Change Stroke-width</label>

                    <input min={0} max={10} step={0.1} type="range"
                           value={el.attributes['stroke-width'].value}
                           onChange={(e) => changeStroke(e, index)}/>
                </div>
            )}
        </>
    )
}

