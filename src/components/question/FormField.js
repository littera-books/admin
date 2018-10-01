import React from 'react';

const FormField = field => (
  <div>
    <label style={{ marginRight: '1rem' }} htmlFor={field.name}>
      {field.label}
    </label>
    <input
      style={{ width: '18rem' }}
      type={field.type}
      name={field.name}
      {...field.input}
      required
    />
  </div>
);

export default FormField;
