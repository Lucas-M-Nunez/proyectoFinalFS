import Img from "./components/Img"; // Importamos el componente Img desde la carpeta components
import "./App.css";
import Saludo from "./components/Saludo";
import Cards from "./components/Cards";

function App() {
  // Componente funcional, es una función que retorna un elemento de React (JSX)
  return (
    <div>
      <h1>Tarjetas de peliculas</h1>
      <Cards />
      <Img />
      <Saludo />
    </div>
  );
}

export default App;
