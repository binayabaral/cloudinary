import React, { useState } from 'react';

interface AddUserFormProps {
  setShouldFetchUsers: (shouldFetchUsers: boolean) => void;
}

const AddUserForm = (props: AddUserFormProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
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
      setIsSubmitting(true);
      await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setPreviewSource(null);
      props.setShouldFetchUsers(true);
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
      </div>
      <div className='form-group'>
        <label htmlFor='image'>Image</label>
        <input type='file' className='form-control' id='image' name='image' onChange={handleFileInputChange} />
      </div>
      <div className='form-group'>
        <button type='submit' disabled={isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
