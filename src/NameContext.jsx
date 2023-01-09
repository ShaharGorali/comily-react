import { createContext, useState } from "react";
export const NameContext = createContext();
function NameProvider(props) {
  const { children } = props;
  const [name, setName] = useState();
  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
}

export default NameProvider;
