import React, { Component } from "react";

import SendIcon from "@material-ui/icons/Send";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/core/Alert";
import { LoadingButton } from "@material-ui/lab";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import * as urls from "@portal/constant/menu_urls.js";
import { withRouter } from "react-router-dom";
import { checkStyle } from "@portal/utils/ajax";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: "",
      open: false,
    };
  }

  handleEdit = async () => {
    const { workspace, layer, style } = this.props;
    this.setState({ loading: true });

    const result = await checkStyle(workspace, style);
    if (result && result.status) {
      this.setState({ message: "Can't get style", loading: false, open: true });
      return;
    }

    if (["css", "sld"].includes(result.style.format)) {
      this.props.history.push(urls.EDITOR_URL(workspace, layer, style));
      return;
    }

    this.setState({
      message: "Format not supported",
      loading: false,
      open: true,
    });
    return;
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { workspace, layer, style } = this.props;

    return (
      <React.Fragment>
        {workspace}:{layer}
        <span>/</span>
        {style}
        <LoadingButton
          variant="contained"
          onClick={this.handleEdit}
          endIcon={<SendIcon />}
          loading={this.state.loading}
        >
          Edit
        </LoadingButton>
        <Snackbar
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={this.handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {this.state.message}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default withRouter(index);
