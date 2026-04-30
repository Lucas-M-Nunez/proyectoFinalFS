export default function CardPelicula({ nombre, año, genero }) {
  return (
    <div class="card shadow">
      <div class="card-body"></div>
      <h5 class="card-title">{nombre}</h5>
      <p class="card-text">Año: {año}</p>
      <p class="card-text">Género: {genero}</p>
    </div>
  );
}
