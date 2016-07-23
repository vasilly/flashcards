// ADD_DECK
// SHOW_ADD_DECK
// HIDE_ADD_DECK

import {addDeck, showAddDeck, hideAddDeck} from './actions';
import * as reducers from './reducers';
const store = Redux.createStore( Redux.combineReducers( reducers ) );

const App = (props) => <div className='app'>
                         { props.children }
                       </div>

const Sidebar = React.createClass( {
  componentDidUpdate() {
    var el = ReactDOM.findDOMNode( this.refs.add );
    if ( el ) el.focus;
  },
  render() {
    let props = this.props;

    return (
    <div className='sidebar'>
      <h2>All Decks</h2>
      <button onClick={ e => this.props.showAddDeck() }>
        New Deck
      </button>
      <ul>
        { props.decks.map( (deck, i) => <li key={ i }>
                                          { deck.name }
                                        </li> ) }
      </ul>
      { props.addingDeck && <input
                                   ref='add'
                                   onKeyPress={ this.createDeck } /> }
    </div>);
  },
  createDeck( evt ) {
    if ( evt.which !== 13 )
      return;
    var name = ReactDOM.findDOMNode( this.refs.add ).value;
    this.props.addDeck( name );
    this.props.hideAddDeck();
  }
} );

function run() {
  let state = store.getState();
  console.log( state );
  ReactDOM.render( <App>
                     <Sidebar
                              decks={ state.decks }
                              addingDeck={ state.addingDeck }
                              addDeck={ name => store.dispatch( addDeck( name ) ) }
                              hideAddDeck={ () => store.dispatch( hideAddDeck() ) }
                              showAddDeck={ () => store.dispatch( showAddDeck() ) } />
                   </App>, document.getElementById( 'root' ) );

}

run();
store.subscribe( run );
