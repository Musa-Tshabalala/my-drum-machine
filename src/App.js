import './App.css';
import instrument from './music';
import React from 'react';

const DisplayBeat = (props) => {
  return (
    <div id="display">
      <h3>{props.beatName}</h3>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInstrument: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    const keyPressed = event.key.toUpperCase();
    const beat = instrument.find((beat) => beat.key === keyPressed);

    if (beat) {
      const buttonElement = document.getElementById(beat.name);
      const audioElement = buttonElement.querySelector('audio');

      if (!audioElement.paused) {
        audioElement.pause();
      }

      audioElement.currentTime = 0;
      audioElement
        .play()
        .catch((error) => console.error("Playback error: ", error));

      this.setState({
        currentInstrument: beat.name
      });
    }
  }

  handleClick(event) {
    event.preventDefault();
    const beat = instrument.find((beat) => beat.name === event.currentTarget.id);

    if (beat) {
      const audioElement = event.currentTarget.querySelector('audio');

      if (!audioElement.paused) {
        audioElement.pause();
      }

      audioElement.currentTime = 0;
      audioElement
        .play()
        .catch((error) => console.error("Playback error: ", error));
      this.setState({
        currentInstrument: beat.name
      });
    }
  }

  render() {
    const buttons = instrument.map((value) => (
      <button
        type="button"
        className="drum-pad btn"
        id={value.name}
        onClick={this.handleClick}
        key={value.name}
      >
        {value.key}
        <audio
          className="clip"
          id={value.key}
          src={value.url}
        />
      </button>
    ));

    return (
      <div id="drum-machine">
        <DisplayBeat beatName={this.state.currentInstrument} />
        <div id="buttons">{buttons}</div>
      </div>
    );
  }
}

export default App;