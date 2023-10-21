const { createContext, useState, useContext } = require("react");

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [name, _setName] = useState(localStorage.getItem("NAME"));
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setName = (user) => {
        _setName(user);
        if (user) {
            localStorage.setItem("NAME", user);
        } else {
            localStorage.removeItem("NAME");
        }
    };

    return (
        <StateContext.Provider
            value={{
                name,
                token,
                setName,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
