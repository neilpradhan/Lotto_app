import { Component, createRef } from "react";
import Apple from "../../Assets/apple.svg";
import Banana from "../../Assets/banana.svg";
import Cherry from "../../Assets/cherry.svg";
import Watermelon from "../../Assets/watermelon.svg";
import Grape from "../../Assets/grape.svg";
import Lemon from "../../Assets/lemon.svg";
import Orange from "../../Assets/orange.svg";
import Pineapple from "../../Assets/pineapple.svg";
import Strawberry from "../../Assets/strawberry.svg";
import Econ from "../../Assets/econ.svg";

import "./MySlotMachine.css";
import { fetchRNDnumber } from "../../api/fetchRNDnumber";
import { fetchGenerateOutputFile } from "../../api/fetchGenerateOutputFile";
import { decryptData } from "../../utils/decryptData";

const numberOfSlots = 3;
const numberOfSymbolsPerSlot = 18;

export default class MySlotMachine extends Component {
  constructor() {
    super();
    this.state = {
      animState: false,
      reelSymbols: [],
      spin: 0,
      winStatus: 0,
      spinDuration: 0.6,
    };

    const generateRefsArray = (numberOfRefs) => {
      var refsArray = [];
      for (var i = 0; i < numberOfRefs; i++) {
        refsArray.push(createRef());
      }
      return refsArray;
    };
    this.testRef = [...generateRefsArray(numberOfSlots)];
    this.WarningTextRef = createRef();
    this.SpinBtn = createRef();
    this.LoadingElement = createRef();
  }

  images = [
    Apple,
    Banana,
    Cherry,
    Watermelon,
    Grape,
    Lemon,
    Orange,
    Pineapple,
    Strawberry,
    Econ,
  ];

  setImage(index, reel) {
    return (
      <img
        alt="BINGO"
        src={this.images[index]}
        key={"img_" + reel + "_" + index}
      />
    );
  }

  generateImageColumn(randomNumber, numberOfSymbols) {
    var reelArray = [];

    for (var i = 0; i < numberOfSymbols; i++) {
      var randomIndex = Math.floor(randomNumber[i] * this.images.length);
      reelArray.push(this.setImage(randomIndex, i));
    }
    
    return reelArray;
  }

  setReelArraySymbols = async (callback) => {
    const data = await Promise.all([
      fetchRNDnumber(numberOfSymbolsPerSlot),
      fetchRNDnumber(numberOfSymbolsPerSlot),
      fetchRNDnumber(numberOfSymbolsPerSlot),
    ]).then((response) => {
      if (response == null) {
        return response;
      }

      const result = decryptData(response);

      return result;
    });
  

    if (data === null) {
      this.WarningTextRef.current.classList.toggle("active");
      this.setState({ spin: 0 });
      this.SpinBtn.current.disabled = true;

      return "fail", 500;
    }

    const symbolArray = [
      this.generateImageColumn(data[0], numberOfSymbolsPerSlot),
      this.generateImageColumn(data[1], numberOfSymbolsPerSlot),
      this.generateImageColumn(data[2], numberOfSymbolsPerSlot),
    ];

    this.setState({ reelSymbols: symbolArray });

    return "spin", 200;
  };

  generateSlots(numberOfSlots) {
    var slots = [];
    for (var i = 0; i < numberOfSlots; i++) {
      slots.push(
        <div className="SlotBox" key={i} id={i}>
          <div
            className={`SlotReelContainer`}
            ref={this.testRef[i]}
            onAnimationEnd={this.onAnimationEnd}
            onAnimationStart={this.onAnimationStart}
          >
            {this.state.reelSymbols[i]}
          </div>
        </div>
      );
    }
    return slots;
  }

  onAnimationEnd = () => {
    this.counter++;
    if (this.counter === this.testRef.length) {
      for (var i = 0; i < numberOfSlots; i++) {
        this.testRef[i].current.className = "SlotReelContainer";
        this.testRef[i].current.style.animation = ``;
      }
    }
    this.setState({ animState: false });
  };

  animateSlotsDownSequentially = (numberOfSlots) => {
    var increment = 0;
    let animationDuration = 0;

    for (var i = 0; i < numberOfSlots; i++) {
      increment = increment + 0.2;
      this.testRef[
        i
      ].current.classList.add("animationEaseOut")
      animationDuration = this.state.spinDuration + increment + 500;
    }

    setTimeout(() => {
      this.checkWin();
      this.setState({ spin: 0 });
    }, animationDuration);
  };

  spin() {
    if (this.state.spin !== 0) {
      return;
    }

    this.setState({ spin: 1, winStatus: 0 });

    for (var i = 0; i < numberOfSlots; i++) {
      this.testRef[
        i
      ].current.style.animation = `mymove normal`;
      this.testRef[
        i
      ].current.classList.add("animationInfinite")
    }

    setTimeout(() => {

    this.counter = 0;
    this.setReelArraySymbols().then((response) => {
      if (response !== 500) {
        this.animateSlotsDownSequentially(numberOfSlots);
      }
    }) 
  }, 0);

  }

  checkWin() {
    if (
      this.state.reelSymbols[0][1].props.src ===
        this.state.reelSymbols[1][1].props.src &&
      this.state.reelSymbols[0][1].props.src ===
        this.state.reelSymbols[2][1].props.src
    )
      this.setState({ winStatus: 1 });
  }

  componentDidMount() {
    this.setReelArraySymbols();
  }

  regenerateRndOutputFile() {
    this.LoadingElement.current.classList.toggle("active");
    fetchGenerateOutputFile().then(() => {
      if (this.WarningTextRef.current.classList.contains("active")) {
        this.WarningTextRef.current.classList.toggle("active");
      }
      this.LoadingElement.current.classList.toggle("active");
      this.SpinBtn.current.disabled = false;
      this.setReelArraySymbols();
    });
  }

  render() {
    return (
      <>
        <div className="Main">
          <div className="LoadingBackground" ref={this.LoadingElement}>
            <div aria-live="polite" role="status" className="loading large" />
          </div>
          <div
            className={
              this.state.winStatus ? "WinningText active" : "WinningText"
            }
          >
            Congratulations! You Win!
          </div>
          <div className="WarningText WinningText" ref={this.WarningTextRef}>
            Out of random numbers. Regenerate by clicking the button on the
            lower right corner.
          </div>

          <div className="SlotBoxArea">
            <div className="Redbox" />
            {this.generateSlots(numberOfSlots)}
          </div>
          <div className="SlotButton">
            <button
              onClick={() => this.spin()}
              disabled={this.state.spin ? true : false}
              className={
                this.state.spin ? `btn primary Spinning` : `btn primary`
              }
              ref={this.SpinBtn}
            >
              {this.state.spin ? "Spinning" : "Spin"}
            </button>
          </div>
        </div>

        <div>
          <button
            className="btn primary Reloadbutton"
            onClick={() => this.regenerateRndOutputFile()}
          >
            {" "}
            Regenerate Output File <i className="icon icon-reload" />
          </button>
        </div>
      </>
    );
  }
}
