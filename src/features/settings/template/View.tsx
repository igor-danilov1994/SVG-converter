import * as React from 'react';
import { ChangeParameter } from '../atoms/ChangeParameter';
import { UpLoader } from '../atoms/upLoader';
import { HTMLCode } from '../atoms/HTMLCode';
import { ShowIcon } from '../atoms/ShowIcon';
import {ChangeEvent} from "react";

import '../../../style/myStyle.css'
import {ChangeWidth} from "../atoms/ChangeWidth";

export const Context = React.createContext({})

export const View = () => {
    const svgCode = React.useRef<HTMLCollectionOf<SVGSVGElement>>();

    const [svgHTML, setSvgHTML] = React.useState('');
    const [countPath, setCountPath] = React.useState<SVGPathElement[]>([]);
    const [valueStrokeWidth, setValueStrokeWidth] = React.useState('')

    React.useEffect(() => {
        svgCode.current = document.getElementsByTagName('svg');
    }, []);

    React.useEffect(() => {
        if (svgHTML && svgCode.current !== undefined) {
            const element = svgCode.current[0];

            const result = [].slice.call<HTMLCollection, never, SVGPathElement[]>(element.children);

            setCountPath(result.filter(({ attributes }) => attributes.getNamedItem('stroke-width')));
        }
    }, [svgHTML]);



    const changeStroke = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const node = countPath[index].attributes.getNamedItem('stroke-width');
        if (node !== null) {
            node.value = e.currentTarget.value;

            setSvgHTML(svgCode.current![0].outerHTML);
        }
    }

    const ChangeWidthIcon = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        /*const node = svgCode.current![0].attributes.getNamedItem('width')
        node!.value = e.currentTarget.value;

        setSvgHTML(svgCode.current![0].outerHTML);*/
    }

    const getSvgHTML = (text: string) => setSvgHTML(text);

    return (
        <div className="app">
            <div>
                <UpLoader getSvgHTML={getSvgHTML} />

                <ShowIcon svgHTML={svgHTML} />

                <HTMLCode svgHTML={svgHTML} />
            </div>

            {countPath.map((_, index) => (
                <Context.Provider key={index} value={svgCode}>
                    <ChangeParameter
                        changeStroke={changeStroke}
                        changeWidthIcon={ChangeWidthIcon}
                        index={index}
                        element={_}
                    />
                </ Context.Provider>
            ))}
            {svgHTML !== '' && <ChangeWidth changeWidthIcon={ChangeWidthIcon}/>}
        </div>
    );
};