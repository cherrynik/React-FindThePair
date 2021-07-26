import React, { Component } from 'react'
import Cell from './Cell'

class Field extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cells: {
        Init: [...Array(8).keys()],
        Dupe: [],
        Rand: [],

        Open: [],

        children: [],
        lineLength: 4, // Count of cells in 1 line
        background: [
          'bf392b',
          '9b59b6',
          '2980b9',
          '119479',
          '7ef4b0',
          'f1c40f',
          'ffffff',
          '000000'
        ]
      },
    }

    this.initGame()
  }

  initGame = () => {
    let { cells: { Init, Dupe, Rand, children, background } } = this.state

    Dupe = Init.concat(Init) // Duplicating inited array (for pairs)
    Rand = this.shuffleCells(Dupe) // Randomizing it by shuffleCells func
    Rand = Dupe

    // Putting default info in each child of already randomized cells
    Rand.map((pair) => {
      return children.push({
        pair,
        close: true,
        done: false,
        background: background[pair]
      })
    })
  }

  shuffleCells = (array) => {
    let
      currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  /*
   * There are cannot be default values of close and done vars
   * Because every cell will work wrong
   */
  renderCell = (indexPair, indexArray, close, done, background) => {
    return (
      <Cell
        pair={indexPair}
        key={indexArray}
        close={close}
        done={done}
        background={'#' + background}
        onClick={() => this.handleClick(indexArray, indexPair)}
      />
    )
  }

  // TODO: Add comments here and lower
  renderField = () => {
    const
      { cells: { children, lineLength } } = this.state,
      cells = []

    let
      field,
      rows = []

    children.map((item, index) => {
      cells.push(this.renderCell(item.pair, index, item.close, item.done, item.background))
      if (cells.length === lineLength) {
        rows.push(<div className='Field__row' key={`Row_${index}`}>{cells.splice(0, lineLength)}</div>);
      }

      // Then all line with their cells pushed into Field (parent) 
      return field = <div className='Field' key={`Field_${index}`}>{rows}</div>
    })

    return field
  }

  handleClick = (indexArray, indexPair) => {
    const
      { cells: { Open, children } } = this.state,
      currentCell = { indexPair, indexArray }

    if (!(Open.length === 2)) {
      if (!children[indexArray].done && children[indexArray].close) {
        children[indexArray].close = false
        Open.push(currentCell)
      }

      this.setState({
        cells: {
          ...this.state.cells,
          children: children,
        }
      })

      if (Open && (Open.length === 2)) {
        if (Open[0].indexArray === Open[1].indexArray) {
          Open.shift()
        } else {
          setTimeout(() => this.check(), 1000)
        }
      }
    }
  }

  check = () => {
    const { cells: { Open, children } } = this.state

    if (Open[0] && Open[1]) {
      if (Open[0].indexPair === Open[1].indexPair) {
        children[Open[0].indexArray].done = true
        children[Open[1].indexArray].done = true
      } else {
        children[Open[0].indexArray].close = true
        children[Open[1].indexArray].close = true
      }
    }

    this.setState({
      cells: {
        ...this.state.cells,
        Open: []
      }
    })

    const state = children.every((item) => item.done)

    if (state) {
      // eslint-disable-next-line no-restricted-globals
      let ask = confirm('Do you want to restart the game?')
      if (ask) {
        window.location.reload()
      }
    }
  }

  render() {
    return this.renderField()
  }
}

export default Field