// @flow

import _ from 'lodash';
import Radium from 'radium';
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const defaultState = {
  albumName: null,
  errorText: null,
};

class CreateAlbumModal extends Component {
  state = defaultState;

  _input = null;

  componentWillReceiveProps(nextProps) {
    if (!nextProps.open) {
      this.setState(defaultState);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      setTimeout(this._selectText, 100);
    }
  }

  componentDidMount() {
    console.log('prcat', this._input);
    if (this._input) {
      setTimeout(
        () => {
          this._input.select();
        },
        100,
      );
    }
  }

  _selectText = () => {
    this._input && this._input.select();
  };

  _handleMainAction = () => {
    switch (this.props.action) {
      case 'create':
        if (this.state.albumName) {
          this.props.onRequestCreateAlbum(this.state.albumName);
          return;
        }
      case 'rename':
        if (this.state.albumName) {
          this.props.onRequestRenameAlbum({
            newName: this.state.albumName,
            id: this.props.album.id,
          });
          return;
        }
      case 'remove':
        this.props.onRequestRemoveAlbum({
          id: this.props.album.id,
        });
        return;
      default:
        this.setState({
          errorText: 'This field is required.',
        });
    }
  };

  render() {
    const {
      action,
      album,
      open,
    } = this.props;

    const actions = [
      <FlatButton label="Cancel" primary onClick={this.props.onRequestClose} />,
      (
        <FlatButton
          label={action === 'remove' ? 'Remove' : 'Submit'}
          primary
          keyboardFocused
          onClick={this._handleMainAction}
        />
      ),
    ];

    let input;
    if (action !== 'remove') {
      input = (
        <TextField
          hintText="The name of the album"
          errorText={this.state.errorText}
          defaultValue={action === 'rename' && album ? album.name : ''}
          onChange={e => this.setState({ albumName: e.target.value })}
          fullWidth
          ref={node => {
            node && setTimeout(() => node.focus());
            this._input = node;
          }}
        />
      );
    }

    let title = 'Create a new album';
    if (album && action === 'remove') {
      title = `Are you sure you want to delete "${_.truncate(album.name, {
        length: 15,
      })}" album?`;
    } else if (action === 'rename') {
      title = 'Rename album';
    }

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.props.onRequestClose}
        >
          {input}
        </Dialog>
      </div>
    );
  }
}

export default Radium(CreateAlbumModal);
