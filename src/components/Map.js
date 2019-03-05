import React from 'react';

export default class Map extends React.Component {

        componentWillMount() {
            setTimeout(() => {
                console.log('component will mount')
                this.loadMapScenario();
            }, 500);
        }

        componentDidUpdate(prev){
            if(this.props.latLng !== prev.latLng){
                setTimeout(() => {
                    this.loadMapScenario();
                }, 500);
            }
        }

        loadMapScenario() {
            let Microsoft = window.Microsoft;
            var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
                center: new Microsoft.Maps.Location(this.props.latLng.lat, this.props.latLng.lng),
                zoom: 5,
                mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            });

            // tile url from Iowa Environmental Mesonet of Iowa State University
            var urlTemplate = 'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-{timestamp}/{zoom}/{x}/{y}.png';
            var timestamps = ['900913-m50m', '900913-m45m', '900913-m40m', '900913-m35m', '900913-m30m', '900913-m25m', '900913-m20m', '900913-m15m', '900913-m10m', '900913-m05m', '900913'];
            var tileSources = [];
            for (var i = 0; i < timestamps.length; i++) {
                var tileSource = new Microsoft.Maps.TileSource({
                    uriConstructor: urlTemplate.replace('{timestamp}', timestamps[i])
                });
                tileSources.push(tileSource);
            }
            var animatedLayer = new Microsoft.Maps.AnimatedTileLayer({
                mercator: tileSources,
                frameRate: 500
            });
            map.layers.insert(animatedLayer);
        
    }
render(){
    console.log(this.props.latLng)
        return(
            <div id='myMap' className={`active`}></div>
        )
    }
}