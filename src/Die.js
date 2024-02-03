function Die(props) {
    const diceBackground = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    const dotStyle = {
        backgroundColor: props.isHeld ? "white" : "#59E391"
    }
    const diceDots = () => {
        // eslint-disable-next-line default-case
        switch (props.value) {
            case 1: return (
                <div className="face-1" style={diceBackground}>
                    <span className="dot" style={dotStyle}></span>
                </div>
            )
            case 2: return (
                <div className="face-2" style={diceBackground}>
                    <span className="dot" style={dotStyle}></span>
                    <span className="dot" style={dotStyle}></span>
                </div>
            )
            case 3: return (
                <div className="face-3" style={diceBackground}>
                    <span className="dot" style={dotStyle}></span>
                    <span className="dot" style={dotStyle}></span>
                    <span className="dot" style={dotStyle}></span>
                </div>
            )
            case 4: return (
                <div className="face-4" style={diceBackground}>
                    <div className="column">
                        <span className="dot" style={dotStyle}></span>
                        <span className="dot" style={dotStyle}></span>
                    </div>
                    <div className="column">
                        <span className="dot" style={dotStyle}></span>
                        <span className="dot" style={dotStyle}></span>
                    </div>
                </div>
            )
            case 5: return (
                <div className="face-5" style={diceBackground}>
                    <div className="row">
                        <span className="dot" style={dotStyle}></span>
                        <span className="dot" style={dotStyle}></span>
                    </div>
                    <div className="row">
                        <span className="dot" style={dotStyle}></span>
                    </div>
                    <div className="row">
                        <span className="dot" style={dotStyle}></span>
                        <span className="dot" style={dotStyle}></span>
                    </div>
                </div>
            )
            case 6: return (
                <div className="face-4" style={diceBackground}>
                    <div className="column">
                        <span className="dot" style={dotStyle}></span>
                        <span className="dot" style={dotStyle}></span>
                        <span className="dot" style={dotStyle}></span>
                    </div>
                    <div className="column">
                        <span className="dot" style={dotStyle}></span>
                        <span className="dot" style={dotStyle}></span>
                        <span className="dot" style={dotStyle}></span>
                    </div>
                </div>
            )
        }
    }
    return (
        <div
            className="die-face"
            style={diceBackground}
            onClick={props.holdDice}
        >
            {diceDots()}
        </div>
    );
}

export default Die;