const {h, render, Component} = require('preact')
const CardList = require('./drag-n-drop')

class App extends Component {
  render (props, {matrices}) {
    return <div class='app'>
      <CardList class='multiplicands' />
    </div>
  }
}

render(<App />, document.body)
