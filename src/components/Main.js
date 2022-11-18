import React, {Component} from 'react';
import { Row, Col } from 'antd';
import axios from "axios";

import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import { SAT_API_KEY, BASE_URL, NEARBY_SATELLITE, STARLINK_CATEGORY } from "../constants";
import WorldMap from './WorldMap';


class Main extends Component {
    state = {
        setting: {},
        satInfo: {},
        satList: [],
        isLoadingList: false
    }

    showNearbySatellite = (setting) => {
        this.setState({
            setting: setting
        })
        this.fetchSatellite(setting);
    }

    fetchSatellite= (setting) => {
        const {latitude, longitude, elevation, altitude} = setting;
        const url = `${BASE_URL}/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

   this.setState({
       isLoadingList: true
   });

   axios.get(url)
       .then(response => {
           console.log(response.data)
           this.setState({
               satInfo: response.data,
               isLoadingList: false
           })
       })
       .catch(error => {
           console.log('err in fetch satellite -> ', error);
       })
    }

    showMap = () => {
        console.log('show on the map');
    }

    render() {
        const { satInfo } = this.state;
        return (
            <Row className="main">
              <Col span={8} className="left-side">
                <SatSetting onShow={this.showNearbySatellite} />
                <SatelliteList
                   satInfo={satInfo}
                   isLoad={this.state.isLoadingList}
                   onShowMap={this.showMap}
                />
              </Col>
              <Col span={16} className="right-side">
                <WorldMap />
              </Col>
            </Row>
        );
    }
}

export default Main;