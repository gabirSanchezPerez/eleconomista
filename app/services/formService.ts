import { ItemProps } from '@/types/ItemTypes';
import { instanceAXIOSBack, instanceAXIOSBackFiles } from './requestConfig';

export const setForm = async (formElements: ItemProps[]) => {
  //await instanceAXIOSBack.get(`/sanctum/csrf-cookie`);
  const response = await instanceAXIOSBack.post('/api/forms', formElements);

  return response.data;
};

/**
 * 
 * const result = await instanceAXIOSBack.post("/usuarios", values);
          const { status, message, data } = result.data;
          if (status === 200) {
            msgSuccess("Registro creado");
            router.replace(`/usuarios/${data.id}/`);
            
          } else {
            msgError(message, "Error creando el registro");
          }
 */

export const getForm = async () => {
  //await instanceAXIOSBack.get(`/sanctum/csrf-cookie`);
  const response = await instanceAXIOSBack.get('/api/forms');
  return response.data;
};

/**
 * onst result = await instanceAXIOSBack.get(`/usuarios?p=${pagina}&pp=${xpagina}&s=${search}`);
 * if (result.data.status === "error") {
      setUsers([]);
      setTotal(0);
    } else {
      setUsers(result.data.data);
      setTotal(result.data.total);
    }
    setCargando(false);
 */