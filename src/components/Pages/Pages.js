import React, { useState } from "react";
import Home from "./Home/Home";
import Film from "./Film/Film";
import MyFilms from "./Myfilms/MyFilms";

const Pages = () => {
  //Get hash from the browser
  const [location, setLocation] = useState(window.location.hash);

  //If hash is empty, changing to home
  if (location === "" || location === undefined) {
    window.location.hash = "#home";
    setLocation(window.location.hash);
  }

  //Page components
  const [pages, setPages] = useState([
    {
      hash: "#home",
      page: <Home onClick={cardClickHandler}/>
    },
    {
      hash: "#film",
      page: <Film />
    },
    {
      hash: "#myfilms",
      page: <MyFilms />
    }
  ]);
eventCleaner(hashChangeHandler)
hashChangeListener()
function eventCleaner(event) {
  window.removeEventListener("hashchange", event)
}
function hashChangeListener() {
  window.addEventListener('hashchange', hashChangeHandler)
}
function hashChangeHandler(e) {
  setLocation(window.location.hash)
}



function cardClickHandler (event, id){
    let newState = [...pages]
    newState[1].page = <Film id={id}/>
    setPages(newState)
    window.location.hash = "#film";
    setLocation("#film")
  }
  // TEMPORAIRE ============================================
  const buttonHandler = (event, button) => {
    const newHash = button;
    window.location.hash = button;
    setLocation(newHash);
  };

  const button = () => {
    return pages
      .map(page => page.hash)
      .map(button => (
        <button key={button} onClick={e => buttonHandler(e, button)}>
          {button}
        </button>
      ));
  };
  // FIN TEMPORAIRE ============================================

  const page = () => {
    //Extrait la page correspondant au hash depuis le state
    let [page] = pages.filter(p => {
      return p.hash === location;
    });
    return page.page;
  };
  return (
    <div className={"pages"}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          marginTop: ".5rem"
        }}
      >
        {button()}
      </div>
      {page()}
    </div>
  );
};

export default Pages;
