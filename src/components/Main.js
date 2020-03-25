import React from "react";

import TopPlayers from "./TopPlayers";
import GameContainer from "./GameContainer";

function Main() {
  document.body.addEventListener("mousedown", () => {
    document.body.classList.add("using-mouse");
  });

  // Re-enable focus styling when Tab is pressed
  document.body.addEventListener("keydown", event => {
    if (event.keyCode === 9) {
      document.body.classList.remove("using-mouse");
    }
  });

  return (
    <div>
      <GameContainer />
      <TopPlayers />
    </div>
  );
}

export default Main;
