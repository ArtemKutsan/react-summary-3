// src/App.jsx
import { useState } from 'react';
import './App.css';
// import Paginator from './components/Paginator';
import DogsGallery from './components/DogsGallery';

function App() {
  return (
    <>
      <main>
        <h1 className="container">React Summary 3</h1>

        <section>
          <div className="container">
            {/* <h2>Задача 1: Пагинация</h2> */}
            {/* <Paginator /> */}

            <h2>Задача 2: Галерея собак</h2>
            <DogsGallery />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
