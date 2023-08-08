import { Buscador } from "./buscador";
import { Titulo } from "./titulo";

export function Contenedor() {
  return (
    <div className="bg-gray-100 p-20 rounded-lg shadow-md shadow-black">
      <Titulo />
      <Buscador />
    </div>
  );
}
