const {h, Component} = require('preact')

class Matrix extends Component {
  onChange (i, j, e) {
    const val = e.currentTarget.value
    if (val === '' || val[val.length - 1] === '.') return

    const x = Number(e.currentTarget.value)
    const {values} = this.props

    values[i][j] = x

    this.props.onChange(values)
  }

  render ({values}) {
    return <div class='matrix'>
      {values.map((row, i) =>
        <div key={i} class={`row row-${i}`}>
          {row.map((val, j) =>
            <div class='entry' key={`${i}.${j}`}>
              <input
                type='number'
                value={val}
                onKeyUp={this.onChange.bind(this, i, j)}
                onBlur={(e) => {
                  if (e.currentTarget.value !== '') return
                  this.onChange(i, j, {currentTarget: {value: 0}})
                }} />
            </div>
          )}
        </div>
      )}
    </div>
  }
}

module.exports = Matrix
