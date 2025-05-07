import Image from 'next/image';

function Ubicacion() {
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/imagene_principal.jpg')" }}
    >
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg text-center w-4/5">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC68dRtYpTlN7-buBFvB1D5f4WeEAK0bQ8&q=-34.590799,-68.403217`}
          width="100%"
          height="400"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default Ubicacion;