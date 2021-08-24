import React, { Component } from "react";

import IconButton from "@material-ui/core/IconButton";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ZoomInIcon from "@material-ui/icons/ZoomIn";

import { easeOut } from "ol/easing";
import { getMap } from "../mapInstance";

export default class ZoomBtn extends Component {
  constructor(props) {
    super(props);
    this.baseLayer = null;
  }

  zoomIn = () => {
    const map = getMap();
    if (map.getView().getZoom() > 23) return;

    map.getView().animate({
      zoom: map.getView().getZoom() + 1,
      duration: 500,
      easing: easeOut,
    });
  };

  zoomOut = () => {
    const map = getMap();
    if (map.getView().getZoom() < 2) return;

    map.getView().animate({
      zoom: map.getView().getZoom() - 1,
      duration: 500,
      easing: easeOut,
    });
  };

  render() {
    return (
      <React.Fragment>
        <IconButton
          color="primary"
          aria-label="Base layer"
          component="span"
          onClick={this.zoomIn}
        >
          <ZoomInIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="Base layer"
          component="span"
          onClick={this.zoomOut}
        >
          <ZoomOutIcon />
        </IconButton>
      </React.Fragment>
    );
  }
}
