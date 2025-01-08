export const ItemTypes = {
  TEXT_FIELD: 'text',
  TEXTAREA: 'textarea',
  NUMBER: 'number',
  EMAIL: 'email',
  PASSWORD: 'password',
  DATE: 'date',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  FILE: 'file',
};

export interface ItemProps {
  name_id: string;
  type: string;
  label: string;
  options?: string[]; // Para tipos como 'select' o 'radio' y check.
}