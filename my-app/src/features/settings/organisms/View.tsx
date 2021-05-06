import React from 'react';
import { ChangeParameter } from '../atoms/ChangeParameter';
import {UpLoader} from "../atoms/upLoader";
import {HTMLCode} from "../atoms/HTMLCode";
import {ShowIcon} from "../atoms/ShowIcon";


export const View = () => {
    const svgCode = React.useRef<HTMLCollectionOf<any>>();

    const [svgHTML, setSvgHTML] = React.useState('');

    const [countPath, setCountPath] = React.useState<any[]>([]);

    React.useEffect(() => {
        svgCode.current = document.getElementsByTagName('svg');
    }, []);

    React.useEffect(() => {
        if (svgHTML) {
            const element = svgCode.current![0];
            let result = [].slice.call(element.children);
            let currentPath: any = result.filter((element: any) => element.attributes['stroke-width']);
            setCountPath(currentPath);
        }
    }, [svgHTML]);

    const changeStroke = (e: React.FormEvent<HTMLInputElement>, index: number) => {
        countPath[index].attributes['stroke-width'].value = e.currentTarget.value;
        setSvgHTML(svgCode.current![0].outerHTML);
    };

    const getSvgHTML = (text: string) => {
        setSvgHTML(text);
    };

    return (
        <>
            <div className="App">
                <UpLoader getSvgHTML={getSvgHTML} />

                <ShowIcon svgHTML={svgHTML} />

                <HTMLCode svgHTML={svgHTML} />
            </div>

            {countPath.map((el: any, index: number) => (

                <ChangeParameter parameterName={'Change Stroke-width'}
                                 changeParameter={changeStroke}
                                 value={el.attributes['stroke-width'].value}
                                 index={index}
                                 key={index}
                />
            ))}
        </>
    );
}
