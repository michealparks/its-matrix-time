const {h, Component} = require('preact')
const {DragDropContext, Droppable, Draggable} = require('react-beautiful-dnd')
const Matrix = require('./matrix')
const Solution = require('./solution')
const {randomMatrix, identityMatrix} = require('./util')

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (draggableStyle, isDragging) => {
  return Object.assign({}, {
    background: isDragging ? 'lightgreen' : 'grey'
  }, draggableStyle)
}

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey'
})

class CardList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      matrices: [
        {
          id: 0,
          values: identityMatrix(3)
        }, {
          id: 1,
          values: identityMatrix(3)
        }, {
          id: 2,
          values: identityMatrix(3)
        }, {
          id: 3,
          values: randomMatrix(3, 3, 0, 10)
        }
      ]
    }

    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd (result) {
    // dropped outside the list
    if (!result.destination) return

    const matrices = reorder(
      this.state.matrices,
      result.source.index,
      result.destination.index
    )

    this.setState({matrices})
  }

  onChange (id, values) {
    const {matrices} = this.state

    matrices.find(item => item.id === id).values = values

    this.setState({matrices})
  }

  render (props, state) {
    return <div class='matrices'>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId='droppable' direction='horizontal'>
          {(provided, snapshot) => <div
            class={props.class}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}>
            {state.matrices.map(({id, values}, i) => (
              <Draggable key={id} draggableId={id}>
                {(provided, snapshot) => <div>
                  <div
                    class='matrix'
                    ref={provided.innerRef}
                    style={getItemStyle(
                      provided.draggableStyle,
                      snapshot.isDragging
                    )}
                    {...provided.dragHandleProps}>
                    <Matrix
                      values={values}
                      onChange={v => this.onChange(id, v)} />
                  </div>
                  {provided.placeholder}
                </div>}
              </Draggable>
             ))}
            {provided.placeholder}
          </div>}
        </Droppable>
      </DragDropContext>

      <div class='icon-eq equals'>=</div>
      <Solution matrices={state.matrices.map(({values}) => values)} />
    </div>
  }
}

module.exports = CardList
