import styles from "../styles/Button1.module.css";
import React from "react"

class Button1 extends React.Component {
    constructor() {
      super();
      this.state = { 
        accentPosition: 0,
        showAccent: false
      }
    }
    
    setAccentPosition(e) {
      const pos = e.nativeEvent.offsetX;
      this.setState({ accentPosition: pos });
    }
    
    handleMouseEnter(e) {
      this.setState({
        showAccent: true,
        accentPosition: e.nativeEvent.offsetX
      })
    }
    
    render() {
      
      const { accentPosition, showAccent } = this.state;
      
      const accentStyle = {
        left: accentPosition - 150,
        opacity: showAccent ? 100 : 0
      }
      
      return (
        <button 
          className={styles.button1}
          onMouseMove={e => this.setAccentPosition(e)}
          onMouseEnter={e => this.handleMouseEnter(e)}
          onMouseLeave={() => this.setState({showAccent: false})}
        > 
          <div className={styles.buttonContent}>
            {this.props.children}
          </div>
          <div 
              className={styles.accent}
              style={accentStyle}
          /> 
        </button>
       )
    }
  }

export default Button1
  