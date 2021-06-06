import React from 'react';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Content from "./Components/Content";
import './App.css';

function App() {

  return (
    <div className="App">
      {/* header navigator */}
      {/* support update title and inject new title to header props */}
      <Header title="Broccoli & Co." />

      {/* page content */}
      <Content />

      {/* footer copyright */}
      <Footer />
    </div>
  );
}

export default App;
