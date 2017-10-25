const {h} = require('preact')
const {multiply} = require('./util')

function solution ({matrices}) {
  return <div class='matrix solution'>
    {multiply(matrices).map((row, i) =>
      <div key={i} class={`row row-${i}`}>
        {row.map((val, j) =>
          <div key={`${i}.${j}`} class='entry'>
            {val}
          </div>
        )}
      </div>
    )}
  </div>
}

module.exports = solution
