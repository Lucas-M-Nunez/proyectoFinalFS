import CardPelicula from "./CardPelicula";

export default function Cards() {
    return (
        <div className="cards">
            <CardPelicula nombre="El Padrino" año={1972} genero="Crimen, Drama" />
            <CardPelicula nombre="Spiderman No way Home" año={2021} genero="Acción, Aventura" />
            <CardPelicula nombre="Avengers: Doomsday" año={2026} genero="Acción, Aventura" />
        </div>
    );
};
