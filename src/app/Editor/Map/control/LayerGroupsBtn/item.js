import React, { Component } from "react";
import { connect } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemButton from "@material-ui/core/ListItemButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { getMap } from "@portal/app/Editor/Map/mapInstance";
import { wmsLayer } from "@portal/app/Editor/Map/layer";

import { check, uncheck } from "@portal/store/reducers/layerControl";
import { layers } from "./layers";

class item extends Component {
  constructor(props) {
    super(props);
    this.layer = null;
  }

  setLayer = () => {
    const { workspace, layer, index } = this.props;

    if (this.layer != null) return;
    if (layers[layer]) {
      this.layer = layers[layer];
      return;
    }
    this.layer = wmsLayer(workspace, layer);
    this.layer.setZIndex(index);
    this.layer.set("commonName", this.layer);
  };

  componentDidMount = () => {
    this.setLayer();
  };

  componentDidUpdate = () => {
    this.setLayer();
  };

  handleToggle = () => {
    const { checked, layer } = this.props;
    if (!checked[layer]) {
      // console.log(checked)
      getMap().addLayer(this.layer);
      this.props.check({ name: layer });
      layers[layer] = this.layer;
    } else {
      // console.log(checked)
      getMap().removeLayer(this.layer);
      this.props.uncheck({ name: layer });
    }
    this.setState({ checked });
  };

  handleMoveUp = () => {
    console.log("up");
  };

  handleMoveDown = () => {
    console.log("down");
  };

  render() {
    const { index, layer, checked } = this.props;
    let isChecked = checked[layer] === true;

    return (
      <ListItem
        // key={index}
        secondaryAction={
          <React.Fragment>
            <IconButton
              edge="end"
              aria-label="comments"
              onClick={this.handleMoveUp}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="comments"
              onClick={this.handleMoveUp}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </React.Fragment>
        }
        disablePadding
      >
        <ListItemButton role={undefined}>
          <ListItemIcon>
            <Switch
              edge="end"
              onChange={this.handleToggle}
              checked={isChecked}
              inputProps={{
                "aria-labelledby": "layer-id-" + index,
              }}
            />
          </ListItemIcon>
          <ListItemText id={"layer-id-" + index} primary={`${layer}`} />
        </ListItemButton>
      </ListItem>
    );
  }
}

const mapStateToProps = (state) => ({
  checked: state.layerControl.checked,
});

const mapDispatch = (dispatch) => ({
  check: (payload) => dispatch(check(payload)),
  uncheck: (payload) => dispatch(uncheck(payload)),
});

export default connect(mapStateToProps, mapDispatch)(item);
