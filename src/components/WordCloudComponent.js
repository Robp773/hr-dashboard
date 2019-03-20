import React from 'react';
import WordCloud from 'react-d3-cloud';

export default class Trends extends React.Component{
render(){
    console.log('rendering word cloud')
    const fontSizeMapper = word => Math.log2(word.value) * this.props.multiplier;
    const rotate = word => word.value % 360;
    let data = [];
    let tableData = [];
    for (let i = 0; i < this.props.dataArray.length; i++) {
        data.push({
            text: this.props.dataArray[i].name,
            value: this.props.dataArray[i].count
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
}