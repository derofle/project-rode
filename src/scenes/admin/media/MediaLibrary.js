import React from 'react';
import 'react-table/react-table.css';
import { storage, firebaseRoot } from 'services/firebase/components/firebase';
import { Consumer } from 'services/context';
import { Link } from 'react-router-dom';
import { deleteDoc, uidToSlug } from 'services/utilities';
import M from 'materialize-css/dist/js/materialize.min.js';
import moment from 'moment';

class MediaLibraryRender extends React.Component {
  state = {
    modal: null,
  };

  componentDidMount() {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
    document.title = 'Media Library | Admin Panel | Project Rode';
  }

  renderModal = item => {
    const { attractionsInfo, parks } = this.context;
    const { attractions } = attractionsInfo;

    let usedIn = null;
    parks.find(park => {
      if (park.headerImage === item.uid) {
        usedIn = { ...park, url: `/park/${park.slug}` };
      }
      return usedIn;
    });

    attractions.find(attr => {
      if (attr.headerImage === item.uid) {
        usedIn = {
          ...attr,
          url: `/park/${uidToSlug(attr.park, parks)}/attractie/${attr.slug}`,
        };
      }
      return usedIn;
    });

    const modal = {
      name: item.name,
      src: item.src,
      uid: item.uid,
      timestamp: item.timestamp,
      path: item.path,
      usedIn,
    };
    console.log(modal);
    this.setState({ modal });
  };

  render() {
    const { modal } = this.state;
    const { media, attractionsInfo, parks, updateContext } = this.context;
    const { attractions } = attractionsInfo;

    const imageMedia = media.filter(med => med.type === 'image');
    const sortedArray = imageMedia.sort(function(a, b) {
      return b.timestamp.seconds - a.timestamp.seconds;
    });
    console.log(sortedArray);

    return (
      <div className="container" style={{ width: '95%' }}>
        <div
          id="modal1"
          className="modal"
          style={{ width: '75%', maxHeight: 'none' }}
        >
          <div className="modal-content">
            <div className="row">
              <div className="col s7">
                <img
                  src={modal && modal.src}
                  style={{ width: '100%' }}
                  alt="detailed"
                />
              </div>
              <div className="col s5">
                <p>
                  Media used in:{' '}
                  {modal && modal.usedIn && modal.usedIn.name ? (
                    <Link to={modal.usedIn.url}>{modal.usedIn.name}</Link>
                  ) : (
                    'Nothing found'
                  )}
                </p>
                <p>
                  Uploaded on:{' '}
                  {modal && modal.timestamp
                    ? moment
                        .unix(modal.timestamp.seconds)
                        .format('YYYY-MM-DD HH:mm')
                    : 'Date unknown'}
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close"
              onClick={() => {
                deleteDoc('media', modal.uid);
                storage.ref(modal.path).delete();
                updateContext();
              }}
            >
              Delete Permanently
            </a>
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Close
            </a>
          </div>
        </div>
        <div className="row">
          {sortedArray &&
            sortedArray.map(item => {
              if (item.type === 'image') {
                let found;
                parks.find(park => {
                  if (park.headerImage === item.uid) {
                    found = park;
                  }
                  return park;
                });
                attractions.find(attr => {
                  if (attr.headerImage === item.uid) {
                    found = attr;
                  }
                  return attr;
                });
                let linkedIcon = false;
                if (found) {
                  linkedIcon = true;
                }
                return (
                  <div className="col s2" key={item.uid}>
                    <a
                      className="modal-trigger"
                      href="#modal1"
                      onClick={() => this.renderModal(item)}
                    >
                      <div className="card">
                        <div className="card-image">
                          <img
                            src={item.src}
                            style={{ height: '120px' }}
                            alt="thumbnail"
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                );
              }
              return item;
            })}
          {/* media &&
            media.map(item => {
              if (item.type === 'video') {
                return (
                  <div className="col s2" key={item.uid}>
                    <div className="card">
                      <div className="card-image">
                        <img
                          src="https://img.youtube.com/vi/ER32iVokq3k/0.jpg"
                          style={{ height: '120px' }}
                          alt="video-thumbnail"
                        />
                      </div>
                    </div>
                  </div>
                );
              }
              return item;
            }) */}
        </div>
      </div>
    );
  }
}

MediaLibraryRender.contextType = Consumer;
const MediaLibrary = props => (
  <Consumer>{() => <MediaLibraryRender {...props} />}</Consumer>
);

export default MediaLibrary;
