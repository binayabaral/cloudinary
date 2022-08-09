import React, { useState } from 'react';

const AddUserForms = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file: File) => {
    const reader = new FileReader(); // File => Base64 Encoded string
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !previewSource) {
      return;
    }

    const formData = {
      name,
      email,
      fileString: previewSource
    };

    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className='column' onSubmit={handleSubmit}>
      {previewSource && (
        <div className='display-img'>
          <img src={previewSource as string} alt='Selected' />
        </div>
      )}
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          className='form-control'
          id='name'
          placeholder='Enter name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          className='form-control'
          id='email'
          placeholder='Enter email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className='form-group'>
          <label htmlFor='image'>Image</label>
          <input type='file' className='form-control' id='image' name='image' onChange={handleFileInputChange} />
        </div>
        <div className='form-group'>
          <button type='submit'>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default AddUserForms;