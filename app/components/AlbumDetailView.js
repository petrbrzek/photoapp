// @flow

import _ from 'lodash';
import { remote } from 'electron';
import React, { Component } from 'react';
import Radium, { Style } from 'radium';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import Droparea from 'react-droparea';
import path from 'path';
import Masonry from 'react-masonry-component';
import RaisedButton from 'material-ui/RaisedButton';

import BottomBar from './BottomBar';
import ImagePreview from './ImagePreview';

import { getFileDirectoryPath } from '../services/fileManager';

const { dialog } = remote;

class AlbumDetail extends Component {
  state = {
    dragActive: false,
    showMasonry: false,
    selectedImage: '',
    showPreview: false,
  };

  componentDidMount() {
    this._masonry.on('layoutComplete', this._handleMasonry);
  }

  componentWillUnmount() {
    this._masonry.off('layoutComplete', this._handleMasonry);
  }

  _handleMasonry = () => {
    if (!this.state.showMasonry) {
      this.setState({ showMasonry: true });
    }
  };

  _addFiles = files => {
    files.forEach(file => {
      this.props.addFile({
        name: file.name,
        filePath: file.path,
        albumId: this.props.activeAlbum.id,
      });
    });
  };

  _prepareFiles(filePaths = []) {
    const files = filePaths.reduce(
      (result, filePath) => {
        result.push({
          name: path.basename(filePath),
          path: filePath,
        });
        return result;
      },
      [],
    );
    this._addFiles(files);
  }

  _handleOnDrop = (e, files) => {
    e.preventDefault();
    this._addFiles(files);
    this.setState({ dragActive: false });
  };

  _handleClickSelection = id => {
    this.setState({ selectedImage: id });
  };

  _handleRequestHide = () => {
    this.setState({ showPreview: false });
  };

  render() {
    const album = this.props.activeAlbum;
    let files;
    if (album && album.files) {
      files = _.map(album.files, (value, fileNameId) => (
        <div
          key={fileNameId}
          onClick={() => this._handleClickSelection(fileNameId)}
          onDoubleClick={() => this.setState({ showPreview: true })}
          style={{
            margin: '10px',
            backgroundColor: '#ddd',
            boxShadow: '0 0 10px 0 #000',
            border: '5px solid',
            borderColor: (
              this.state.selectedImage === fileNameId ? '#000' : ' #fff'
            ),
          }}
        >
          <img
            style={{ display: 'block' }}
            src={path.resolve(getFileDirectoryPath(), fileNameId)}
            width={200}
          />
        </div>
      ));
    }

    const rightBottomBarView = (
      <div style={{ marginLeft: 'auto' }}>
        <RaisedButton
          label={
            (
              <span>
                <FontAwesome name="upload" style={{ color: '#fff' }} />
                <span style={{ paddingLeft: '3px' }}>
                  {' '}Add new photos
                </span>
              </span>
            )
          }
          primary
          onClick={() => {
            dialog.showOpenDialog(
              {
                properties: ['openFile', 'multiSelections'],
                filters: [
                  { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
                ],
              },
              filePaths => {
                this._prepareFiles(filePaths);
              },
            );
          }}
        />
      </div>
    );

    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <Style
          scopeSelector=".droparea"
          rules={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}
        />
        <Droparea
          disableClick
          onDragEnter={() => this.setState({ dragActive: true })}
          onDragLeave={() => this.setState({ dragActive: false })}
          onDrop={this._handleOnDrop}
        >
          <div
            style={{
              paddingTop: '50px',
              paddingBottom: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '40px',
              }}
            >
              <Link
                to="/"
                style={{
                  padding: '10px',
                  display: 'flex',
                  alignItem: 'center',
                  lineHeight: '1.5',
                }}
              >
                <FontAwesome
                  name="arrow-left"
                  style={{
                    color: '#fff',
                  }}
                  size="2x"
                />
                <span
                  style={{
                    fontSize: '1.4rem',
                    display: 'inline-block',
                    fontWeight: '500',
                    marginLeft: '10px',
                  }}
                >
                  Home
                </span>
              </Link>
            </div>
            <h1
              style={{
                textAlign: 'center',
                fontWeight: '500',
                fontSize: '1.4rem',
              }}
            >
              {album.name}
            </h1>
          </div>
          <div
            style={{
              overflow: 'auto',
              padding: '5px',
              borderTop: '1px solid #111',
              opacity: this.state.showMasonry ? 1 : 0,
            }}
          >
            <Masonry
              ref={node => this._masonry = this._masonry || node.masonry}
              options={{
                transitionDuration: 0,
              }}
            >
              {files}
            </Masonry>
          </div>
        </Droparea>
        {this.state.showPreview &&
          <ImagePreview
            onRequestHide={this._handleRequestHide}
            src={path.resolve(getFileDirectoryPath(), this.state.selectedImage)}
          />}

        <BottomBar>
          {rightBottomBarView}
        </BottomBar>
      </div>
    );
  }
}

export default Radium(AlbumDetail);
