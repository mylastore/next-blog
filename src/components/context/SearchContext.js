import React, {createContext, useState, useEffect} from "react"

export const SearchContext = createContext()

export const SearchContextProvider = (props) => {
  const [values, setValues] = useState({
    query: undefined,
    results: [],
    searched: false,
    count: ''
  })

  const {query, results, searched, count} = values;

  useEffect(() => {

  }, []);

  return(
    <SearchContext.Provider value={{values, setValues}}>
      {props.children}
    </SearchContext.Provider>
  )

}

export default SearchContextProvider