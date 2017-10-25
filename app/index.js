const {h, render, Component} = require('preact')
const Matrix = require('./matrix')
const Solution = require('./solution')
const {randomMatrix, identityMatrix} = require('./util')

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      matrices: [
        identityMatrix(3),
        randomMatrix(3, 3, 0, 10)
      ]
    }
  }

  onChange (i, values) {
    const {matrices} = this.state
    matrices[i] = values

    this.setState({matrices})
  }

  render (props, {matrices}) {
    return <div class='app'>
      <div class='matrices'>
        {matrices.map((values, i) =>
          [<Matrix
            key={i}
            values={values}
            onChange={this.onChange.bind(this, i)} />,
            i !== matrices.length - 1
              ? <div class='mult' />
              : <div class='icon-eq equals'>=</div>
          ]
        )}
        <Solution matrices={matrices} />
      </div>
    </div>
  }
}

render(<App />, document.body)
