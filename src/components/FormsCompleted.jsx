import  { useState, useEffect } from 'react';
import axios from 'axios';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function FormsCompleted() {
  const [encuestas, setEncuestas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    full_name: '',
    phone_number: '',
    start_date: '',
    preferred_language: '',
    how_found: '',
    newsletter_subscription: false,
  });

  useEffect(() => {
    // get para traer las respuestas
    const respuestasEncuestas = async () => {
      try {
        const response = await axios.get('https://agus-nazer-henry-form.onrender.com/api/respuestas');
        setEncuestas(response.data); // Actualiza el estado con las encuestas obtenidas
      } catch (error) {
        console.error('Error al obtener encuestas:', error);
      }
    };
    respuestasEncuestas();
  }, []);

  
  // manejo de cambios en los inputs
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedValues({
      ...editedValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // upodate de la respuesta
  const handleUpdate = async (e) => {
    e.preventDefault();
    // actualizo la repuesta de la API
    try {
      const response = await axios.put(`https://agus-nazer-henry-form.onrender.com/api/respuestas/${editedValues._id}`, editedValues);
      // Actualiza la respuesta en la lista de encuestas
      const updatedEncuestas = encuestas.map((encuesta) =>
        encuesta._id === response.data._id ? response.data : encuesta
      );
      setEncuestas(updatedEncuestas);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar respuesta:', error);
    }
  };
// borro encuesta
  const handleDelete = async (id) => {
    try {
      // Realiza una solicitud DELETE al servidor para eliminar la respuesta de encuesta
      await axios.delete(`https://agus-nazer-henry-form.onrender.com/api/respuestas/${id}`);
  
      // Actualiza la lista de encuestas después de eliminar una
      const updatedEncuestas = encuestas.filter((encuesta) => encuesta._id !== id);
      setEncuestas(updatedEncuestas);
    } catch (error) {
      console.error('Error al eliminar respuesta de encuesta:', error);
    }
  };
  

  return (
    <div className="bg-gradient-to-r from-gray-400 via-gray-200 to-gray-100 min-h-screen p-4">
     {/* <img src="../../src/assets/images/encuesta.jpeg" alt="" /> */}
      <div className="m-2 relative">
        <Link to="/">
          <BsArrowLeftCircle className="text-4xl absolute top-0 left-0 text-white" />
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Encuestas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {encuestas.map((encuesta) => (
          <div
            key={encuesta._id}
            className="bg-white bg-opacity-70 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-indigo-500 text-white p-4">
              <h3 className="text-lg font-semibold">{encuesta.full_name}</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-2">Phone: {encuesta.phone_number}</p>
              <p className="text-gray-600 mb-2">Start date: {encuesta.start_date}</p>
              <p className="text-gray-600 mb-2">Preferred language: {encuesta.preferred_language}</p>
              <p className="text-gray-600 mb-2">How found: {encuesta.how_found}</p>
              <p className="text-gray-600">
                Did you subscribe to the newsletter? {encuesta.newsletter_subscription ? 'Yes' : 'No'}
              </p>
              
              <button
      onClick={() => handleDelete(encuesta._id)} // Llamo a la función handleDelete con el ID de la encuesta
      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 mt-2 mr-2"
    >
      Eliminar
    </button>
              {!isEditing && (
                <button
                  onClick={() => {
                    // seteoo (actualizo los valores de la encuesttta)
                    setEditedValues(encuesta);
                    setIsEditing(true);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700"
                >
                  Editar
                </button>
              )}
            </div>
            {isEditing && encuesta._id === editedValues._id && (
              <div className="bg-white bg-opacity-70 rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold">Editar Respuesta</h3>
                <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                    <label htmlFor="full_name" className="block text-gray-700 text-sm font-bold mb-2">
                      Nombre completo:
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                      onChange={handleEditChange}
                      value={editedValues.full_name }
                      
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="full_name" className="block text-gray-700 text-sm font-bold mb-2">
                      Numero de telefono:
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      name="phone_number"
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                      onChange={handleEditChange}
                      value={editedValues.phone_number }
                      
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="full_name" className="block text-gray-700 text-sm font-bold mb-2">
                      Start date:
                    </label>
                    <input
                      type="text"
                      id="start_date"
                      name="start_date"
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                      onChange={handleEditChange}
                      value={editedValues.start_date }
                      
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="full_name" className="block text-gray-700 text-sm font-bold mb-2">
                      Language:
                    </label>
                    <input
                      type="text"
                      id="preferred_language"
                      name="preferred_language"
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                      onChange={handleEditChange}
                      value={editedValues.preferred_language }
                      
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="full_name" className="block text-gray-700 text-sm font-bold mb-2">
                      How found?:
                    </label>
                    <input
                      type="text"
                      id="how_found"
                      name="how_found"
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                      onChange={handleEditChange}
                      value={editedValues.how_found }
                      
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="full_name" className="block text-gray-700 text-sm font-bold mb-2">
                      Newsletter:
                    </label>
                    <input
                      type="text"
                      id="newsletter_subscription"
                      name="newsletter_subscription"
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                      onChange={handleEditChange}
                      value={editedValues.newsletter_subscription }
                      
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormsCompleted;
