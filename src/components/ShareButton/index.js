import React, {Component, Fragment} from "react";
import {Button, Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import {FaCopy, FaLink, FaShare} from "react-icons/fa";

import "./styles.css";

class ShareButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false
    };

    this.copyNode = React.createRef();

    this.copyTooltip = <Tooltip id="copy-tooltip">Copied Link</Tooltip>;
  }

  toggleTooltip = () => {
    this.setState({ showTooltip: !this.state.showTooltip });
  };

  copyToClipboard = e => {
    this.copyNode.current.select();
    document.execCommand("copy");

    this.toggleTooltip();
    setTimeout(this.toggleTooltip, 4000);
  };

  render() {
    const { shareUrl } = this.props;

    return (
      <Fragment>
        <OverlayTrigger
          placement="bottom"
          overlay={this.copyTooltip}
          trigger="focus"
          delayHide={4000}
        >
          <Button
             size="sm"
            className="share-button"
            onClick={this.copyToClipboard}
          >
            <FaLink /> Copy Link
          </Button>
        </OverlayTrigger>
        <Form>
          <input
            className="hidden-copy-input"
            readOnly
            ref={this.copyNode}
            value={shareUrl}
            aria-hidden="true"
          />
        </Form>
      </Fragment>
    );
  }
}

export default ShareButton;
