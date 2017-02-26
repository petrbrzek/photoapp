import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AlbumDetailView from '../components/AlbumDetailView'
import * as albumDetail from '../actions/albumDetail'

const mapStateToProps = ({ activeAlbum }) => ({
  activeAlbum,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(albumDetail, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetailView)
