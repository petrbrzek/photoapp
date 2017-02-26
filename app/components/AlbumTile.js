// @flow

import React, { Component } from 'react';
import Radium from 'radium';
import path from 'path';
import FontAwesome from 'react-fontawesome';
import TextField from 'material-ui/TextField';

import { getFileDirectoryPath } from '../services/fileManager';

const defaultStyle = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '250px',
    height: '250px',
    borderRadius: '5px',
    boxShadow: '0 0 10px 0 #000',
    marginRight: '25px',
    marginLeft: '25px',
    marginBottom: '50px',
    background: '#fff',
    backgroundSize: 'cover',
    border: '3px solid',
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: '12px',
    fontWeight: 'bold',
    textIndent: '-5px',
    paddingTop: '5px',
  },
  footer: {
    padding: '10px',
    background: '#fff',
    marginTop: 'auto',
    color: '#aaa',
  },
  name: {
    padding: '0 5px',
  },
};

type Props = {
  selected: boolean,
  index: ?number,
  color: string,
  name: string,
  id: string,
  fileCount: number,
  randomPhoto: ?string,
  onRequestSelect: () => void,
  onRequestOpen: () => void,
  onRequestRenameAlbum: ({ newName: string, id: string }) => void,
};

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

class AlbumTile extends Component {
  _input: Object;

  state = {
    editing: false,
  };

  static defaultProps = {
    selected: false,
    index: null,
    fileCount: 0,
  };

  props: Props;

  _startNameEditing = e => {
    e.stopPropagation();
    this.props.onRequestSelect(-1);
    this.setState({ editing: true });
  };

  _handleTileRename = ({ newName, id }: { newName: string, id: string }) => {
    if (newName) {
      this.props.onRequestRenameAlbum({
        newName,
        id,
      });
    }
    this._endNameEditing();
  };

  _endNameEditing = () => {
    this.setState({ editing: false });
  };

  _handleKeyUp = e => {
    if (e.keyCode === ENTER_KEY_CODE && this._input) {
      this._handleTileRename({
        newName: this._input.getValue(),
        id: this.props.id,
      });
    } else if (e.keyCode === ESC_KEY_CODE) {
      this._endNameEditing();
    }
  };

  render() {
    const {
      onRequestSelect,
      onRequestOpen,
      id,
      index,
      color,
      fileCount,
      name,
      selected,
      randomPhoto,
    } = this.props;

    let tileName = (
      <p>
        <span style={defaultStyle.name} onClick={this._startNameEditing}>
          {name}
        </span>
      </p>
    );
    if (this.state.editing) {
      tileName = (
        <div onClick={e => e.stopPropagation()}>
          <TextField
            autoFocus
            fullWidth
            defaultValue={name}
            onBlur={this._endNameEditing}
            onKeyUp={this._handleKeyUp}
            ref={node => this._input = node}
          />
        </div>
      );
    }

    let randomPhotoImage = {};
    if (randomPhoto) {
      randomPhotoImage = {
        backgroundImage: (
          `url(${path.resolve(getFileDirectoryPath(), randomPhoto)})`
        ),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };
    }

    return (
      <div
        onClick={e => {
          e.stopPropagation();
          onRequestSelect(index);
        }}
        onDoubleClick={() => {
          if (!this.state.editing) {
            onRequestOpen(id);
          }
        }}
        style={[
          defaultStyle.base,
          {
            borderColor: selected ? '#000' : '#fff',
          },
        ]}
      >
        <div style={[{ display: 'flex', flex: 1 }, randomPhotoImage]}>
          <div
            style={[
              defaultStyle.body,
              {
                backgroundColor: randomPhoto ? 'rgba(0, 0, 0, 0.5)' : color,
              },
            ]}
          >
            <FontAwesome
              name="folder-open"
              style={{ color: '#fff' }}
              size="3x"
            />
            <p style={defaultStyle.bodyText}>{fileCount} photos</p>
          </div>
        </div>

        <div
          style={[
            defaultStyle.footer,
            { backgroundColor: selected ? '#000' : '#fff' },
            selected && { color: '#fff' },
          ]}
        >
          {tileName}
        </div>
      </div>
    );
  }
}

export default Radium(AlbumTile);
