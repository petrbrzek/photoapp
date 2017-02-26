// @flow

import Radium from 'radium';
import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';
import RaisedButton from 'material-ui/RaisedButton';

import type { Album } from '../types/Album.type';
import * as albumActions from '../actions/albums';

import AlbumTile from './AlbumTile';
import BottomBar from './BottomBar';

import EmptyState from './EmptyState';
import AlbumModal from './AlbumModal';

type Props = {
  router: any,
  albums: Array<Album>,
  albumCoverPhotos: any,
  createAlbum: typeof albumActions.createAlbum,
  renameAlbum: typeof albumActions.renameAlbum,
  removeAlbum: typeof albumActions.removeAlbum,
};

type ModalAction = 'create' | 'rename' | 'remove';

class AlbumsView extends Component {
  state: {
    modalOpen: boolean,
    modalAction: ?ModalAction,
    selectedAlbumIndex: number,
  } = {
    modalOpen: false,
    modalAction: null,
    selectedAlbumIndex: -1,
  };

  componentWillReceiveProps(nextProps) {
    // NOTE: reset index when album has been removed
    if (this.state.selectedAlbumIndex > nextProps.albums.length - 1) {
      this.setState({ selectedAlbumIndex: -1 });
    }
  }

  props: Props;

  _handleOpenModal = (modalAction: ModalAction) => {
    this.setState({ modalOpen: true, modalAction });
  };

  _handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  _handleCreateAlbum = name => {
    this._handleCloseModal();
    this.props.createAlbum({
      name,
      color: `hsl(${Math.floor(Math.random() * 256)}, 100%, 50%)`,
    });
  };

  _handleRenameAlbum = ({ newName, id }: { newName: string, id: string }) => {
    this._handleCloseModal();
    this.props.renameAlbum({
      newName,
      id,
    });
  };

  _handleRemoveAlbum = ({ id }: { id: string }) => {
    this._handleCloseModal();
    this.props.removeAlbum(id);
  };

  _handleSelect = index => {
    this.setState({
      selectedAlbumIndex: index,
    });
  };

  _resetSelection = () => {
    this.setState({ selectedAlbumIndex: -1 });
  };

  _openAlbum = (id: string) => {
    this.props.openAlbum({ id });
  };

  render() {
    let albumContainer = <EmptyState text="Create a new album" />;
    if (this.props.albums && this.props.albums.length) {
      albumContainer = (
        <div
          style={{
            overflow: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            padding: '50px 5px',
          }}
        >
          {this.props.albums.map((album, index) => (
            <AlbumTile
              key={album.id}
              id={album.id}
              name={album.name}
              fileCount={album.files ? Object.keys(album.files).length : 0}
              color={album.color}
              index={index}
              randomPhoto={
                this.props.albumCoverPhotos &&
                  this.props.albumCoverPhotos[album.id]
              }
              selected={index === this.state.selectedAlbumIndex}
              onRequestSelect={this._handleSelect}
              onRequestOpen={this._openAlbum}
              onRequestRenameAlbum={this._handleRenameAlbum}
            />
          ))}
        </div>
      );
    }

    let leftBottomBarView;
    if (this.state.selectedAlbumIndex >= 0) {
      leftBottomBarView = (
        <div>
          <RaisedButton
            style={{ marginRight: '10px' }}
            label={
              (
                <span>
                  <FontAwesome
                    name="pencil-square-o"
                    style={{ color: '#111' }}
                  />
                  <span style={{ paddingLeft: '3px' }}> Rename</span>
                </span>
              )
            }
            onClick={() => this._handleOpenModal('rename')}
          />
          <RaisedButton
            label={
              (
                <span>
                  <FontAwesome name="trash" style={{ color: '#fff' }} />

                  <span style={{ paddingLeft: '3px' }}> Remove</span>
                </span>
              )
            }
            secondary
            onClick={() => this._handleOpenModal('remove')}
          />
        </div>
      );
    }

    const rightBottomBarView = (
      <div style={{ marginLeft: 'auto' }}>
        <RaisedButton
          label={
            (
              <span>
                <FontAwesome name="plus" style={{ color: '#fff' }} />
                <span style={{ paddingLeft: '3px' }}>
                  {' '}Create a new album
                </span>
              </span>
            )
          }
          primary
          onClick={() => this._handleOpenModal('create')}
        />
      </div>
    );

    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          <div
            style={{ display: 'flex', flex: '1', justifyContent: 'center' }}
            onClick={this._resetSelection}
          >
            {albumContainer}
          </div>

          <AlbumModal
            open={this.state.modalOpen}
            album={
              this.props.albums &&
                this.props.albums[this.state.selectedAlbumIndex]
            }
            action={this.state.modalAction}
            onRequestClose={this._handleCloseModal}
            onRequestCreateAlbum={this._handleCreateAlbum}
            onRequestRenameAlbum={this._handleRenameAlbum}
            onRequestRemoveAlbum={this._handleRemoveAlbum}
          />

          <BottomBar>
            {leftBottomBarView}
            {rightBottomBarView}
          </BottomBar>
        </div>
      </div>
    );
  }
}

export default Radium(AlbumsView);
