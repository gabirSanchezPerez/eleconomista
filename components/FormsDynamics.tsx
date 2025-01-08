"use client";
import React, { useState } from "react";
import FieldPalette from "./FieldPalette";
import DroppableArea from "./DroppableArea";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemProps, ItemTypes } from "@/types/ItemTypes";
import { setForm } from "@/app/services/formService";
import Swal from "sweetalert2";

const FormsDynamics = () => {
  const [formElements, setFormElements] = useState<ItemProps[]>([]);

  const addElement = (element: ItemProps) => {
    console.log(formElements, element);
    setFormElements([
      ...formElements,
      { ...element, name_id: `${element.name_id}-${formElements.length}` },
    ]);
  };

  const fieldTypes: ItemProps[] = [
    {
      name_id: ItemTypes.TEXT_FIELD,
      type: ItemTypes.TEXT_FIELD,
      label: "Campo: Texto",
    },
    {
      name_id: ItemTypes.EMAIL,
      type: ItemTypes.EMAIL,
      label: "Campo: Correo electrónico",
    },
    {
      name_id: ItemTypes.PASSWORD,
      type: ItemTypes.PASSWORD,
      label: "Campo: Contraseña",
    },
    {
      name_id: ItemTypes.TEXTAREA,
      type: ItemTypes.TEXTAREA,
      label: "Campo: Área de Texto",
    },
    {
      name_id: ItemTypes.SELECT,
      type: ItemTypes.SELECT,
      label: "Campo: Selección",
    },
    {
      name_id: ItemTypes.CHECKBOX,
      type: ItemTypes.CHECKBOX,
      label: "Campo: Multiple selección",
    },
    {
      name_id: ItemTypes.RADIO,
      type: ItemTypes.RADIO,
      label: "Campo: Única selección",
    },
    { name_id: ItemTypes.DATE, type: ItemTypes.DATE, label: "Campo: Fecha" },
    { name_id: ItemTypes.FILE, type: ItemTypes.FILE, label: "Campo: Archivo" },
  ];

  const sendDataToAPI = async () => {
    try {
      console.log("sendDataToAPI", formElements);
      const response = await setForm(formElements);
      console.log("sendDataToAPI", response);
      const { status } = response;
      if (status === 200) {
        Swal.fire({
          title: "Formulario enviado exitosamente.",
          icon: "success",
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: true,
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        setFormElements([]);
      } else {
        // msgError(message, "Error creando el registro");
        Swal.fire({
          title: "Error al enviar el formulario.",
          icon: "error",
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: true,
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con la API.");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h2 className="text-center py-6 font-bold">Formulario Dinámico</h2>
      <div className="grid grid-cols-5 gap-2 mx-4">
        <div className=" p-4 col-span-2 border border-gray-400 rounded-lg">
          <h3 className="text-center font-bold">Lista de campos</h3>
          {fieldTypes.map((element) => (
            <FieldPalette
              key={element.name_id}
              name_id={element.name_id}
              type={element.type}
              label={element.label}
              options={element.options}
            />
          ))}
        </div>
        <div className=" p-4 col-span-3">
          <h3 className="text-lg text-center font-bold">
            Construye tu formulario
          </h3>
          <p className="text-sm ">* El nombre del campo no se debe repetir</p>
          <p className="text-sm ">
            * Las opciones de los campos Selección no se debe repetir
          </p>
          <DroppableArea formElements={formElements} addElement={addElement} />
          {formElements.length !== 0 && (
            <div className="flex justify-end">
              <button
                onClick={() => sendDataToAPI()}
                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 self-center mt-4"
              >
                Enviar Formulario
              </button>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default FormsDynamics;
