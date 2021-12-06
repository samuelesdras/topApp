import React, {createContext, useState} from 'react';

export const MyContext = createContext();

export const MyProvider = ({children}) => {
  const [state, setState] = useState([]);
  const [totalQuant, setTotalQuant] = useState(0);

  const addtoCartHandler = ({prod}) => {
    let isNew = false;
    for (let i = 0; i < state.length; i++) {
      if (state[i].id == prod.id) {
        isNew = true;
        state[i].quant = state[i].quant + 1;
        setTotalQuant(totalQuant + 1);
      }
    }
    if (!isNew) {
      prod.quant = 1;
      state.push(prod);
      setTotalQuant(totalQuant + 1);
    }
  };

  const removeFromCartHandler = ({prod}) => {
    for (let i = 0; i < state.length; i++) {
      if (state[i].id == prod.id && state[i].quant > 0) {
        state[i].quant = state[i].quant - 1;
        setTotalQuant(totalQuant - 1);
      } else if (state[i].id == prod.id && state[i].quant <= 0) {
        state.splice(i, 1);
      }
    }
  };

  return (
    <>
      <MyContext.Provider
        value={{
          state: state,
          addtoCart: addtoCartHandler,
          removeFromCart: removeFromCartHandler,
          totalQuant: totalQuant,
        }}>
        {children}
      </MyContext.Provider>
    </>
  );
};
