export default function Saludo() {
  let nombre = "Lucas";
  let edad = 27;
  let profesion = "Desarrollador";
  return (
    <h2 style={{ fontSize: '25px' }}>
      Hola soy {nombre}, tengo {edad} años y soy {profesion}
    </h2>
  );
}
