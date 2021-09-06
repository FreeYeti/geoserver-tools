import React, { Component } from "react";
import { connect } from "react-redux";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import CircularProgress from "@mui/material/CircularProgress";

import { getLayersOfWorkspace } from "@portal/utils/ajax";
import { saveLayers } from "@portal/store/reducers/geoserver";

class item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleClick = async (name) => {
    this.setState({ loading: true });
    this.props.setWorkspace(name, this.props.index);
    const result = await getLayersOfWorkspace(name);
    this.props.save(result.layers.layer);
    this.setState({ loading: false });
  };

  render() {
    if (this.props.current) {
      return (
        <ListItem disablePadding>
          <ListItemButton
            selected={true}
            onClick={() => this.handleClick(this.props.name)}
          >
            <ListItemIcon>
              {this.state.loading ? <CircularProgress /> : <StarIcon />}
            </ListItemIcon>
            <ListItemText primary={this.props.name} />
          </ListItemButton>
        </ListItem>
      );
    }

    return (
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => this.handleClick(this.props.name, this.props.index)}
        >
          <ListItemText primary={this.props.name} />
        </ListItemButton>
      </ListItem>
    );
  }
}

const mapState = (state) => ({
  layers: state.geoserver.layers,
});

const mapDispatch = (dispatch) => ({
  save: (payload) => dispatch(saveLayers(payload)),
});

export default connect(mapState, mapDispatch)(item);
