import { useState } from "react";
import axios from "axios";

export function Buscador() {
  const [inputValue, setInputValue] = useState("");
  const [descarga,setdescarga] = useState(true);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDownload = () => {
    setdescarga(false)
    const apiUrl = "http://localhost:3000/descargar-musica";
    axios
      .get(apiUrl, { params: { url: inputValue }, responseType: "blob" })
      .then((response) => {
        if (response.status === 200) {
          const blob = new Blob([response.data], { type: "audio/mpeg" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "audio.mp3"; // Nombre del archivo a descargar
          a.click();
          setdescarga(true)
        } else {
          throw new Error("Error al descargar el audio desde la API.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Ingrese el link del video a convertir"
        className="w-96 text-center border border-solid border-2 border-black py-2 mb-3"
        value={inputValue}
        onChange={handleInputChange}
      />
      { descarga ? 
        <button
        className="bg-blue-500 text-white w-36 p-2"
        onClick={handleDownload}
      >
        Bajar música
      </button>
      :<div>Descargando...</div>
}
    </div>
  );
}







