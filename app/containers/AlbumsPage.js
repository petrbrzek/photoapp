import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AlbumsView from '../components/AlbumsView'
import * as albumActions from '../actions/albums'

const mapStateToProps = ({ albums, albumCoverPhotos }) => ({
    albums,
    albumCoverPhotos,
  })

const mapDispatchToProps = dispatch => bindActionCreators(albumActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsView)
