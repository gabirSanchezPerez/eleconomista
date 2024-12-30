import { ItemProps } from '@/types/ItemTypes';
import React, { FC } from 'react';

const FormElement: FC<ItemProps> = ({ id, type, label, options = [] }) => {
    const renderElement = () => {
        const id = `form-element-${label.replace(/\s+/g, '-').toLowerCase()}`; // Generar un ID único basado en el label.

        switch (type) {
            case 'text':
            case 'number':
            case 'email':
            case 'password':
            case 'date':
                return (
                    <div className="mb-4">
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}:</label>
                        <input
                            id={id}
                            type={type}
                            placeholder={label}
                            className="block w-full rounded-md border border-gray-500 shadow-sm focus:border-gray-700 focus:ring-gray-500 text-sm p-2 "
                        />
                    </div>
                );
            case 'textarea':
                return (
                    <div className="mb-4">
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                        <textarea
                            id={id}
                            placeholder={label}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-sm border p-2"
                        />
                    </div>
                );
            case 'select':
                return (
                    <div className="mb-4">
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                        <select
                            id={id}
                            className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        >
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="mb-4 ">
                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                        <div className='flex flex-row flex-wrap gap-2'>
                            {options.map((option) => (
                            <div key={option} className="flex items-center mb-2">
                                <input
                                    id={`${id}-${option}`}
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    value={option}
                                />
                                <label htmlFor={`${id}-${option}`} className="ml-2 text-sm text-gray-700">{option}</label>
                            </div>
                        ))}
                        </div>
                        
                    </div>
                );
            case 'radio':
                return (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                        <div className='flex flex-row flex-wrap gap-2'>
                            {options.map((option) => (
                            <div key={option} className="flex items-center mb-2">
                                <input
                                    id={`${id}-${option}`}
                                    type="radio"
                                    name={id}
                                    value={option}
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <label htmlFor={`${id}-${option}`} className="ml-2 text-sm text-gray-700">
                                    {option}
                                </label>
                            </div>
                        ))}
                        </div>
                        
                    </div>
                );
            case 'file':
            case 'image':
                return (
                    <div className="mb-4">
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                        <input
                            id={id}
                            type={type}
                            className="mt-1 block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 text-sm "
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return <>{renderElement()}</>;
};

export default FormElement;
