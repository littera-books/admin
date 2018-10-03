import React from 'react';

const FormField = field => (
  <div>
    <label htmlFor={field.name}>{field.label}</label>
    <input
      style={{ width: '18rem', margin: '0 0.5rem' }}
      type={field.type}
      name={field.name}
      {...field.input}
      required
    />
  </div>
);

export default FormField;
