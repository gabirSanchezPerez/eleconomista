"use client";
import { useState, useEffect } from "react";
import { getForm } from "@/app/services/formService";
import { type Fomrs, type Filters } from "@/types/forms";
import Swal from "sweetalert2";

const Administrator = () => {
  const [forms, setForms] = useState<Fomrs[]>([]);
  const [filters, setFilters] = useState<Filters>({
    date: "",
    user: "",
    hasFile: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar formularios
  const fetchForms = async () => {
    Swal.fire({
      title: "Un momento por favor",
      icon: "info",
      showConfirmButton: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setLoading(true);
    setError("");

    try {
      const response = await getForm(filters);
      setForms(response.forms);
    } catch (err) {
      setError("Error al cargar los formularios.");
    } finally {
      setLoading(false);
      Swal.close();
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // Manejar cambios en filtros
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Enviar filtros
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchForms();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Panel Administrativo - Formularios
      </h1>

      <form
        onSubmit={handleFilterSubmit}
        className="mb-6 bg-white p-4 shadow rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fecha:
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Usuario:
            </label>
            <input
              type="text"
              name="user"
              placeholder="Nombre del usuario"
              value={filters.user}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Con archivos adjuntos:
            </label>
            <select
              name="hasFile"
              value={filters.hasFile}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Todos</option>
              <option value="1">Sí</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Aplicar Filtros
        </button>
      </form>

      {loading && <p className="text-blue-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Usuario</th>
              <th className="px-4 py-2 border">Correo</th>
              <th className="px-4 py-2 border">Archivo</th>
              <th className="px-4 py-2 border">Fecha de Envío</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id} className="text-gray-800">
                <td className="px-4 py-2 border">{form.id}</td>
                <td className="px-4 py-2 border">{form.name}</td>
                <td className="px-4 py-2 border">{form.user.name}</td>
                <td className="px-4 py-2 border">{form.user.email}</td>
                <td className="px-4 py-2 border">
                  {form.hasFile ? "Sí" : "No"}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(form.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Administrator;
