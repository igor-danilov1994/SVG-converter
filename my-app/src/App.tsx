import React, {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {

    const ref = useRef<any>()
    const svgElement = useRef<any>()
    const [svgSrc, setSvg] = useState<any>()
    const [svgEl, setSvgElem] = useState<any>()

    useEffect(() =>{
        let svgElem = svgElement.current
        setSvgElem(svgElem)
    },[svgSrc])

    let handleClick = () => {
        ref.current.click()
    }

    const ABC = (e: any) => {
        let file = ref.current.files[0]
        let urlFile = URL.createObjectURL(file)

        setSvg(urlFile)
    }

    function createMarkup() {
        console.log(svgEl)
        return {__html: `${svgEl}` };
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={handleClick}>Загрузить</button>
                <input accept="image/svg" ref={ref} style={{display: 'none'}}
                       onChange={(e) => ABC(e)} type="file"/>
            </header>

            <object ref={svgElement} type="image/svg+xml" data={svgSrc}> </object>

            <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
    )
}

export default App;
