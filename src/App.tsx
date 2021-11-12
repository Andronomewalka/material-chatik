import React from "react";
import Middlewares from "components/Layout/Middlewares";
import AppRoutes from "components/Layout/AppRoutes";

function App() {
  return (
    <Middlewares>
      <AppRoutes />
    </Middlewares>
  );
}

export default App;
