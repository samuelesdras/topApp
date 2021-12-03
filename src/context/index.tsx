import React, {Component} from 'react';

const MyContext = React.createContext();

class MyProvider extends Component {
  state = [];

  addtoCartHandler = ({prod}) => {
    let isNew = false;
    for (let i = 0; i < this.state.length; i++) {
      if (this.state[i].id == prod.id) {
        isNew = true;
        this.state[i].quant = this.state[i].quant + 1;
      }
    }
    if (!isNew) {
      prod.quant = 1;
      this.state.push(prod);
    }
  };

  removeFromCartHandler = ({prod}) => {
    for (let i = 0; i < this.state.length; i++) {
      if (this.state[i].id == prod.id && this.state[i].quant > 0) {
        this.state[i].quant = this.state[i].quant - 1;
      } else if (this.state[i].id == prod.id && this.state[i].quant <= 0) {
        this.state.splice(i, 1);
      }
    }
  };

  prodQuantHandler = () => {
    let quant = 0;
    for (let i = 0; i < this.state.length; i++) {
      // quant = this.state[i].quant + quant;
      quant = 10;
    }
    return quant;
  };

  render() {
    return (
      <>
        <MyContext.Provider
          value={{
            state: this.state,
            addtoCart: this.addtoCartHandler,
            removeFromCart: this.removeFromCartHandler,
            prodQuant: this.prodQuantHandler,
          }}>
          {this.props.children}
        </MyContext.Provider>
      </>
    );
  }
}

export {MyContext, MyProvider};
