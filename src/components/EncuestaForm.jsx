import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EncuestaForm = () => {
  // const history = useHistory(); // Obtén el objeto history
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number:'',
    start_date: '',
    preferred_language: '',
    how_found: '',
    newsletter_subscription: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 
      const response = await axios.post('https://agus-nazer-henry-form.onrender.com/api/encuestas', formData);
      if (response.status === 201) {
        
        console.log('Respuesta creada con éxito');
        alert('Respuesta creada con éxito')
        
        navigate('/encuestas');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      
    }
  };
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Completa la encuesta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre completo:
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
            onChange={handleChange}
            value={formData.full_name}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2">
            Numero de telefono:
          </label>
          <input
            type="string"
            id="phone_number"
            name="phone_number"
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
            onChange={handleChange}
            value={formData.phone_number}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="start_date" className="block text-gray-700 text-sm font-bold mb-2">
            Fecha de inicio:
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
            onChange={handleChange}
            value={formData.start_date}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="preferred_language" className="block text-gray-700 text-sm font-bold mb-2">
            Idioma preferido:
          </label>
          <select
            id="preferred_language"
            name="preferred_language"
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
            onChange={handleChange}
            value={formData.preferred_language}
            required
          >
            <option value="">Selecciona un idioma</option>
            <option value="Inglés">Inglés</option>
            <option value="Español">Español</option>
            <option value="Francés">Francés</option>
            <option value="Alemán">Alemán</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">¿Cómo nos encontraste?</label>
          <div>
            <label className="inline-flex items-center mt-2">
              <input
                type="radio"
                name="how_found"
                value="friends"
                className="form-radio text-indigo-600"
                onChange={handleChange}
                checked={formData.how_found === 'friends'}
              />
              <span className="ml-2">Amigos</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input
                type="radio"
                name="how_found"
                value="online_search"
                className="form-radio text-indigo-600"
                onChange={handleChange}
                checked={formData.how_found === 'online_search'}
              />
              <span className="ml-2">Búsqueda en línea</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input
                type="radio"
                name="how_found"
                value="advertisement"
                className="form-radio text-indigo-600"
                onChange={handleChange}
                checked={formData.how_found === 'advertisement'}
              />
              <span className="ml-2">Publicidad</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold">
            ¿Desea recibir nuestro boletín informativo?
          </label>
          <label className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              name="newsletter_subscription"
              className="form-checkbox text-indigo-600"
              onChange={handleChange}
              checked={formData.newsletter_subscription}
            />
            <span className="ml-2">Sí, deseo recibirlo</span>
          </label>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EncuestaForm;
