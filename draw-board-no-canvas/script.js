class Board {
  // Constructor function for our board, must be passed a parentElement, defaults to 10x10 grid with 5x5 pixels.
  constructor(
    parentElement,
    color,
    gridX = 10,
    gridY = 10,
    pixelSize = 10,
    bgColor = '#fff'
  ) {
    this.container = parentElement
    this.color = color
    this.gridX = gridX
    this.gridY = gridY
    this.pixelSize = pixelSize
    this.bgColor = bgColor
    // This functions handles all touch events (mobile specific)
    const touchHandler = e => {
      e.preventDefault()
      // Grabs touch changes
      let touch = e.changedTouches[0]
      // Grabs target using touch coordinates
      let el = document.elementFromPoint(touch.clientX, touch.clientY)
      if (el.classList.contains('pixel')) el.style.backgroundColor = this.color
    }
    // This function handles all click events (desktop specific)
    const clickHandler = e => {
      // e.preventDefault()
      switch (e.buttons) {
        case 1:
          e.target.style.backgroundColor = this.color
          break
        case 2:
          e.target.style.backgroundColor = this.bgColor
          break
        default:
          break
      }
    }

    this.initializeBoard()
  }

  // Initializes board and fills it with pixels
  initializeBoard() {
    this.container.innerHTML = ''
    this.container.style.width = this.gridX * this.pixelSize + 'px'

    // This function will handle all touch events (mobile specific)
    const touchHandler = e => {
      e.preventDefault()
      // Grabs touch changes
      let touch = e.changedTouches[0]
      // Grabs target using touch coordinates
      let el = document.elementFromPoint(touch.clientX, touch.clientY)
      if (el && el.classList.contains('pixel'))
        el.style.backgroundColor = this.color
    }
    // This function will handle all click events (desktop specific)
    const clickHandler = e => {
      // e.preventDefault()
      switch (e.buttons) {
        case 1:
          e.target.style.backgroundColor = this.color
          break
        case 2:
          e.target.style.backgroundColor = this.bgColor
          break
        default:
          break
      }
    }

    for (let i = 0; i < this.gridY; i++) {
      for (let j = 0; j < this.gridX; j++) {
        // Create a "pixel" element and configure it
        let pixel = document.createElement('div')
        pixel.className = 'pixel'
        pixel.style.width = this.pixelSize + 'px'
        pixel.style.height = this.pixelSize + 'px'
        pixel.style.backgroundColor = this.bgColor
        //
        // Attach event handlers to our pixel
        //
        // Prevent right-click events on our board/pixels
        pixel.addEventListener('contextmenu', e => {
          e.preventDefault()
        })
        pixel.addEventListener('touchstart', touchHandler)
        pixel.addEventListener('touchmove', touchHandler)
        // Manage mouse events (desktop specific)
        pixel.addEventListener('mousedown', clickHandler)
        pixel.addEventListener('mousemove', clickHandler)
        // Add pixel to the DOM
        this.container.appendChild(pixel)
      }
    }
  }

  clear() {
    this.container.children &&
      Array.from(this.container.children).forEach(pixel => {
        pixel.style.backgroundColor = this.bgColor
      })
  }
}

const btn = document.getElementById('clearBtn')
btn.onclick = e => {
  board.clear()
}

const boardDiv = document.getElementById('board')
const board = new Board(boardDiv, '#555', 50, 50, 10)
