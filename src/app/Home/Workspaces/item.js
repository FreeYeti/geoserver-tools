import React, { Component } from "react";
import { connect } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemButton from "@material-ui/core/ListItemButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import CircularProgress from "@material-ui/core/CircularProgress";

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
