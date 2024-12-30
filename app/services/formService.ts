import { ItemProps } from '@/types/ItemTypes';
import { instanceAXIOSBack } from './requestConfig';

export const setForm = async (formElements: ItemProps[]) => {
    const response = await instanceAXIOSBack.post('/forms', formElements);
    
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
    const response = await instanceAXIOSBack.get('/forms');
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