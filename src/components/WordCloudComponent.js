import React from 'react';
import WordCloud from 'react-d3-cloud';

export default function Trends(props){

    const fontSizeMapper = word => Math.log2(word.value) * props.multiplier;
    // const rotate = word => word.value % 360;
    let data = [];
    for (let i = 0; i < props.dataArray.length; i++) {
        data.push({
            text: props.dataArray[i].name,
            value: props.dataArray[i].count
        })
    }
        return(
            <div className='wordcloud'>
                <div className='wordcloud__parent'>
                    <WordCloud
                        data={data}
                        fontSizeMapper={fontSizeMapper}
                        // rotate={rotate}
                        // width={1500}
                    />
                </div>
            </div>
        )
}