import React, { useState } from "react";
import Home from "./Home/Home";
import Film from "./Film/Film";
import MyFilms from "./Myfilms/MyFilms";

const Pages = () => {
  //Get hash from the browser
  const [location, setLocation] = useState(window.location.hash);

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

 //If hash is empty, changing to home
 if (location === "" || location === undefined) {
  window.location.hash = "#home";
  setLocation(window.location.hash);
}

//Gere le hashChange event 
  //Cleanup on render 
eventCleaner(hashChangeHandler)
  //Resetup du listener
hashChangeListener(hashChangeHandler)
  //Update state
function hashChangeHandler(e) {
  setLocation(window.location.hash)
}


//Gere le clique d'un film 
function cardClickHandler (event, id){
  //Update page State avec Film ID
    let newState = [...pages]
    newState[1].page = <Film id={id}/>
    setPages(newState)
  //Change le Hash
    window.location.hash = "#film";
    setLocation("#film")
  }
  // Génère les boutons de navigation ============================================

  //Navigation on click
  const buttonHandler = (event, button) => {
    const newHash = button;
    window.location.hash = button;
    //Update Location state 
    setLocation(newHash);
  };

  //Créer les boutons
  const button = () => {
    return pages
    //Map chaque pages et extrait le hash
      .map(page => page.hash)
      //Pour chaque hash map les boutons
      // eslint-disable-next-line
      .map(button => {
        //Pas de boutons pour aller vers les infos d'un film // (Géré par la card quand click)
        if(button !== "#film"){
          return <button 
            key={button} 
            onClick={e => buttonHandler(e, button)}>
            {button}
          </button>
        }
      });
  };

//Gere le JSX a render pour les pages
  const pageHandle = () => {
    //Extrait la page correspondant au hash depuis le state
    let [page] = pages.filter(p => {
      return p.hash === location;
    });
    console.log(page);
    //Fix error on first launch
    if(page === undefined) return 
    //Renvoi le JSX correspondant
    return page.page;
  };

  return (
    <div className={"pages"}>
  {/* ==== Navigation ==== */}
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
  {/* ==== End of Navigation ==== */}
  {/* ==== View ==== */}
      {pageHandle()}
  {/* ==== End of View ==== */}
    </div>
  );
};


// Supr le listener
function eventCleaner(event) {
  window.removeEventListener("hashchange", event)
}
//Add le
function hashChangeListener(cb) {
  window.addEventListener('hashchange', cb)
}
export default Pages;
