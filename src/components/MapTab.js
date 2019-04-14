import React from 'react';
import {
  loadModules
} from '@esri/react-arcgis';
import {
  API_BASE_URL
} from "../config";
import Earthquake from './Earthquake';


const styles = {
  container: {
    height: '41vh',
    width: '100%'
  },
  mapDiv: {
    padding: 0,
    margin: 0,
    height: '41vh',
    width: '100%'
  },
}

export default class MapTab extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        status: 'loading'
      }

      loadModules(['esri/identity/OAuthInfo', 'esri/identity/IdentityManager', 'esri/widgets/Fullscreen', 'esri/layers/ImageryLayer', 'esri/Map', 'esri/views/MapView', 'esri/layers/MapImageLayer', 'esri/layers/FeatureLayer', 'esri/widgets/Compass', 'esri/widgets/LayerList'])
        .then(([OAuthInfo, esriId, Fullscreen, ImageryLayer, Map, MapView, MapImageLayer, FeatureLayer, Compass, LayerList]) => {

          fetch(`${API_BASE_URL}/token`)
            .then((res) => {
              res.text()
                .then((result) => {
                  console.log(`recd token: ${result}`)
                  esriId.registerToken({
                    server: 'https://www.arcgis.com/sharing',
                    token: result
                  });
                          
                  // need to add extreme heat, tornado, and drought layers
                  let disasterCategory;

                  if(this.props.disasterType === 'Earthquake'){
                    disasterCategory = 'earthquake'
                  }

                  else if(this.props.disasterType === 'Wildfire'){
                    disasterCategory = 'fireHeat'
                  }

                  else if(this.props.disasterType === 'Winter Storm'){
                    disasterCategory = 'winterStorm'
                  }

                  else if(this.props.disasterType === 'Drought'){
                    disasterCategory = 'drought'
                  }

                  else if(this.props.disasterType === 'Extreme Heat'){
                    disasterCategory = 'extremeHeat'
                  }

                  else if(this.props.disasterType === 'Tornado'){
                    disasterCategory = 'tornado'
                  }

                  else{
                    disasterCategory = 'waterRelated'
                  }

                  let additionalLayers = [];
                  for(let i = 0; i <this.props.mapLayers.length; i++){
                    if(this.props.mapLayers[i].type === 'FeatureLayer'){
                      let layer = new FeatureLayer({
                        url: this.props.mapLayers[i].url,
                        visible: true,
                        defaultPopupTemplateEnabled: true
                      });
                      additionalLayers.push(layer)
                    }
                    else if(this.props.mapLayers[i].type === 'MapImageLayer'){
                      let layer = new MapImageLayer({
                        url: this.props.mapLayers[i].url,
                        visible: true,
                        defaultPopupTemplateEnabled: true
                      });
                      additionalLayers.push(layer)
                    }
                    else if(this.props.mapLayers[i].type === 'ImageryLayer'){
                      let layer = new ImageryLayer({
                        url: this.props.mapLayers[i].url,
                        visible: true,
           
                      });
                      additionalLayers.push(layer)
                    }
                  }

                  let riverGaugesTemplate = {
                    title: "Gauge Data",
                    content: "Location: {LOCATION}, {STATE} <br/> Stage: {STAGE} <br/> Waterbody: {WATERBODY} <br/>  Observation Time: {OBSTIME} <br/> Gauge Link: <a target='#' href={URL}>Visit</a>",
                  };
                  
                  let riverGaugesLayer = new FeatureLayer({
                    url: "https://livefeeds.arcgis.com/arcgis/rest/services/LiveFeeds/StreamGauge/MapServer",
                    popupTemplate: riverGaugesTemplate,
                    visible: disasterCategory === 'waterRelated' ? true : false
                  });

                  // var layer4 = new ImageryLayer({
                  //   url: "https://maps.disasters.nasa.gov/ags03/rest/services/Hurricance_Florence_2018/S1_ARIA_FPM_20180914/ImageServer",
                  //   defaultPopupTemplateEnabled: true
                  // });

                  riverGaugesLayer.definitionExpression = "STAGE='action' OR STAGE='minor' OR STAGE ='moderate' OR STAGE='major'";

                  let nwsWatchesTemplate = {
                    title: "Alert Data",
                    content: "Event: {Event} <br/> Severity: {Severity}<br/> Start: {Start:DateFormat}<br/> End: {End:DateFormat} <br/>  Alert Link: <a target='#' href={Link}>Visit</a>"
                  };

                  let nwsWatchesLayer = new MapImageLayer({
                    visible: true,
                    url: "https://livefeeds.arcgis.com/arcgis/rest/services/LiveFeeds/NWS_Watches_Warnings_and_Advisories/MapServer",
                    sublayers: [{
                      title: 'NWS Watches, Warnings, and Advisories',
                      id: 6,
                      popupTemplate: nwsWatchesTemplate,
                    }, {
                      title: 'Public Forecast Zones',
                      id: 0
                    }]
                  });

                  let wildfireTemplate = {
                    title: "Wildfire Data",
                    content: "Name: {FIRE_NAME} <br/> Area: {AREA_} Acres <br/> Info Link: <a target='#' href={HOTLINK}>Visit</a>"
                  };

                  let wildfireLayer = new MapImageLayer({
                    visible: disasterCategory === 'fireHeat' ? true : false,
                    url: "https://livefeeds.arcgis.com/arcgis/rest/services/LiveFeeds/Wildfire_Activity/MapServer",
                    sublayers: [{
                      title: 'Active Wildfires',
                      id: 0,
                      popupTemplate: wildfireTemplate,
                    }]
                  });

                  let precipitationTemplate = {
                    title: "Precipitation Data",
                    content: "Rainfall: {label} <br/> Start Time: {fromdate:DateFormat} <br/> End Time: {todate:DateFormat}"
                  };

                  let precipitationLayer = new MapImageLayer({
                    visible: disasterCategory === 'waterRelated' ? true : false,
                    url: "https://livefeeds.arcgis.com/arcgis/rest/services/LiveFeeds/NDFD_Precipitation/MapServer",
                    sublayers: [{
                      title: 'Amount by Time',
                      id: 0,
                      popupTemplate: precipitationTemplate,
                    }]
                  });

                  let snowForecastTemplate = {
                    title: "Snow Data",
                    content: "Snowfall: {label} in. <br/> Start Time: {fromdate:DateFormat} <br/> End Time: {todate:DateFormat}"
                  };

                  let snowForecastLayer = new MapImageLayer({
                    url: "https://livefeeds.arcgis.com/arcgis/rest/services/LiveFeeds/NDFD_SnowFall/MapServer",
                    visible: disasterCategory === 'winterStorm' ? true : false,
                    sublayers: [{
                      title: 'Cumulative Total',
                      id: 2,
                      popupTemplate: snowForecastTemplate,
                    }]
                  });

                  let iceTemplate = {
                    title: "Ice Data",
                    content: "Ice Forecast: {label} in. <br/> Start Time: {fromdate:DateFormat} <br/> End Time: {todate:DateFormat}"
                  };
                  
                  let iceForecastLayer = new MapImageLayer({
                    url: "https://livefeeds.arcgis.com/arcgis/rest/services/LiveFeeds/NDFD_Ice/MapServer",
                    visible: disasterCategory === 'winterStorm' ? true : false,
                    sublayers: [{
                      title: 'Cumulative Total',
                      id: 2,
                      popupTemplate: iceTemplate,
                    }]
                  });

                  let smokeTemplate = {
                    title: "Smoke Data",
                    content: "Smoke Desc: {smoke_classdesc} µg/m³ <br/> Start Time: {referencedate:DateFormat} <br/> End Time: {todate:DateFormat}"
                  };

                  let smokeForecastLayer = new MapImageLayer({
                    url: "https://livefeeds.arcgis.com/arcgis/rest/services/LiveFeeds/NDGD_SmokeForecast/MapServer",
                    visible: disasterCategory === 'fireHeat' ? true : false,
                    sublayers: [{
                      title: 'Smoke Forecast',
                      id: 0,
                      popupTemplate: smokeTemplate,
                    }]
                  });

                  let earthquakeTemplate = {
                    title: "Earthquake Data",
                    content: "Place: {place} <br/> Magnitude: {mag} <br/> Significance: {sig} <br/> Felt: {felt} <br/> Depth: {depth} <br/> Event Time: {eventTime:DateFormat} <br/> Updated: {updated:DateFormat} <br/> Info Link: <a target='#' href={url}>Visit</a> "
                  };
                  
                  let recentEarthquakesLayer = new MapImageLayer({
                    visible: disasterCategory === 'earthquake' ? true : false,
                    url: "https://livefeeds.arcgis.com/arcgis/rest/services/LiveFeeds/USGS_Seismic_Data/MapServer",
                    sublayers: [{
                      title: 'Pager Alerts',
                      id: 0,
                      sublayers: [{
                        title: 'Alerts - Last Week',
                        id: 1,
                        popupTemplate: earthquakeTemplate,
                      }]
                    }]
                  });

                  let recentHurricanesLayer = new MapImageLayer({
                    url: "https://livefeeds.arcgis.com/arcgis/rest/services/LiveFeeds/Hurricane_Recent/MapServer",
                    visible: disasterCategory === 'waterRelated' ? true : false
                  });

                  let standardLayers = [precipitationLayer, smokeForecastLayer, iceForecastLayer, snowForecastLayer, nwsWatchesLayer, riverGaugesLayer, wildfireLayer, recentEarthquakesLayer, recentHurricanesLayer];
                  let finalLayers = standardLayers.concat(additionalLayers)
                  const map = new Map({
                    basemap: "hybrid",
                    layers: finalLayers
                  });

                  const view = new MapView({
                    container: "viewDiv",
                    map,
                    center: [this.props.latLng.lng, this.props.latLng.lat],
                    zoom: 5,
                  })

                  view.ui.remove('zoom');

                  var layerList = new LayerList({
                    view: view,
                  });

                  view.ui.add(layerList, {
                    position: "bottom-left",
                  });

                  var compass = new Compass({
                    view: view
                  });

                  view.ui.add(compass, {
                    position: "top-right"
                  });

                  let fullscreen = new Fullscreen({
                    view: view
                  });
                  view.ui.add(fullscreen, "bottom-right");

                  view.when(() => {
                    this.setState({
                      map,
                      view,
                      status: 'loaded'
                    });
                  });
                })
            })
            .catch(error => {
              console.log(error);
            });
        })
    }

        render() {
          if(this.state.view){       
            this.state.view.goTo([this.props.latLng.lng, this.props.latLng.lat])
          }

          return(
                <div id='parent' style={styles.container}>
                  <div id='viewDiv' style={ styles.mapDiv } ></div>
                </div>
          )
        }
      }
      