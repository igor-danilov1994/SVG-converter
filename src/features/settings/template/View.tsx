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
        const element  = svgCode.current![0]

        Object.defineProperties(element.viewBox.baseVal, {
            width: {
                value: 42,
                writable: true
            },
            height: {
                value: 16,
                writable: true
            }
        })

        element.viewBox.baseVal.width = Number(e.currentTarget.value)
        element.viewBox.baseVal.height = Number(e.currentTarget.value)

        setSvgHTML(element.outerHTML);


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