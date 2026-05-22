import { useForm, useFieldArray } from 'react-hook-form';
import ErrorMessage from './ui/error-message';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { friendsContext } from '../context/friends-context';

function NewFriendForm({ friendData }) {
  if (friendData) {
    const recalculateStructure = []; // para sacar los datos de un objeto en el edit se usa el for in, posteriormente se regresa a un arreglo con .push

    for (let network in friendData.socialnetworks) {
      recalculateStructure.push({
        key: network,
        value: friendData.socialnetworks[network],
      });
    }

    friendData = {
      ...friendData,
      hobbies: friendData.hobbies?.map((h) => {
        // para sacar los datos de un arreglo se uso el map que devuelve un arreglo
        return { value: h };
      }),
      socialNetworks: [...recalculateStructure],
    };
  }

  console.log('FRIEND DATA', friendData);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...friendData,
    } ?? {
      hobbies: [{ value: '' }],
      socialNetworks: [{ key: '', value: '' }],
    },
  });

  const { closeModal, fetchAllFriends, mode } = useContext(friendsContext);

  const hobbiesField = useFieldArray({ control, name: 'hobbies' });
  const socialsField = useFieldArray({ control, name: 'socialNetworks' });

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      hobbies: data.hobbies.map((h) => h.value).filter(Boolean),
      socialnetworks: data.socialNetworks.reduce((acc, { key, value }) => {
        if (key.trim()) acc[key.trim()] = value;
        return acc;
      }, {}),
    };

    const endPointUrl =
      mode === 'edit'
        ? 'http://localhost:3000/api/friends/' + friendData.id
        : 'http://localhost:3000/api/friends';

    const response = await fetch(endPointUrl, {
      method: mode === 'edit' ? 'PUT' : 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const beResponse = await response.json();
    if (response.status === 200 || response.status === 201) {
      toast.success(beResponse.message);
      closeModal();
      fetchAllFriends();
    } else {
      toast.error(beResponse.message);
    }
  });

  return (
    <form
      className='grid grid-cols-2 items-center h-full text-sky-600'
      onSubmit={onSubmit}
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor='bubblepic '>Profile Picture</label>
        <input
          className='border rounded-lg w-60 border-sky-600 '
          type='text'
          name='bubblepic'
          {...register('bubblepic')}
        />

        <label htmlFor='friendname'>Name</label>
        <input
          className='border rounded-lg w-60  border-sky-600 px-2 '
          type='text'
          name='friendname'
          {...register('friendname', {
            required: {
              value: true,
              message: 'Name is required',
            },
            minLength: {
              value: 3,
              message: 'Name must have 3 characters at least',
            },
          })}
          placeholder='Michito'
        />
        {errors.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}

        <label htmlFor='fatherlastname'>Father Last Name</label>
        <input
          name='fatherlastname'
          className='border rounded-lg w-60  border-sky-600 px-2'
          type='text'
          name='fatherlastname'
          {...register('fatherlastname', {
            required: {
              value: true,
              message: 'Father Lastname is required',
            },

            minLength: {
              value: 3,
              message: 'Father must have 3 characters at least',
            },
          })}
          placeholder='Cruz'
        />
        {errors.fatherLastName && (
          <ErrorMessage>{errors.fatherLastName?.message}</ErrorMessage>
        )}

        <label htmlFor='motherlastname'>Mother Last Name</label>
        <input
          className='border rounded-lg  w-60  border-sky-600 px-2 '
          type='text'
          name='motherlastname'
          {...register('motherlastname', {
            required: { value: true, message: 'motherLastName is required' },
            minLength: {
              value: 3,
              message: 'Mother lastName must have 3 characters at least',
            },
          })}
          placeholder='López'
        />
        {errors.motherlastname && (
          <ErrorMessage>{errors.motherlastname?.message} </ErrorMessage>
        )}

        <label htmlFor='birthday'>Birthdate</label>
        <input
          name='birthday'
          className='border  rounded-lg w-60  border-sky-600 px-2 cursor-pointer'
          type='date'
          {...register('birthday', {
            required: {
              value: true,
              message: 'Birthdate is required',
            },
            // validate: (value) => {
            //   const birthDate = new Date(value);
            //   const currentDate = new Date();
            //   const edad = currentDate.getFullYear() - birthDate.getFullYear();
            //   if (edad >= 18) {
            //     return true;
            //   } else {
            //     return 'Debe ser mayor de 18 años';
            //   }
            // },
          })}
        />
        {errors.birthday && (
          <ErrorMessage>{errors.birthday?.message}</ErrorMessage>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='phonenumber'>Phone</label>
        <input
          name='phonenumber'
          className='border rounded-lg w-60  border-sky-600 px-2 '
          type='text'
          {...register('phonenumber', {
            required: {
              value: true,
              message: 'Phone Number is required',
            },
            minLength: {
              value: 10,
              message: 'Mother Lastname must have 10 characters at least',
            },
          })}
          placeholder='7235846573'
        />
        {errors.phoneNumber && (
          <ErrorMessage> {errors.phoneNumber?.message} </ErrorMessage>
        )}
        <label htmlFor='horoscopesign'>Horoscope</label>
        <select
          name='horoscopesign'
          id='horoscopesign'
          className='border rounded-lg w-60 border-sky-600 px-2 py-1 bg-white'
          {...register('horoscopesign', {
            required: {
              value: true,
              message: 'Horoscope sign is required',
            },
          })}
        >
          <option value=''>-- Select your sign --</option>
          <option value='Aries'>♈ Aries</option>
          <option value='Tauro'>♉ Tauro</option>
          <option value='Géminis'>♊ Géminis</option>
          <option value='Cáncer'>♋ Cáncer</option>
          <option value='Leo'>♌ Leo</option>
          <option value='Virgo'>♍ Virgo</option>
          <option value='Libra'>♎ Libra</option>
          <option value='Escorpio'>♏ Escorpio</option>
          <option value='Sagitario'>♐ Sagitario</option>
          <option value='Capricornio'>♑ Capricornio</option>
          <option value='Acuario'>♒ Acuario</option>
          <option value='Piscis'>♓ Piscis</option>
        </select>
        {errors.horoscopesign && (
          <ErrorMessage> {errors.horoscopesign?.message}</ErrorMessage>
        )}
        <label>Hobbies</label>
        {hobbiesField.fields.map((field, i) => (
          <div key={field.id}>
            <div className='flex gap-2'>
              <input
                name='hobbies'
                className='border rounded-lg w-60 border-sky-600 px-2'
                placeholder='ej. programar'
                {...register(`hobbies.${i}.value`, {
                  required: { value: true, message: 'Hobby is required' },
                  minLength: { value: 3, message: 'At least 3 characters' },
                })}
              />
              {hobbiesField.fields.length > 1 && (
                <button
                  className='hover:text-orange-600 cursor-pointer'
                  type='button'
                  onClick={() => hobbiesField.remove(i)}
                >
                  ✕
                </button>
              )}
            </div>
            <div>
              {errors.hobbies && (
                <ErrorMessage>{errors.hobbies[i]?.value.message}</ErrorMessage>
              )}
            </div>
          </div>
        ))}

        <button
          type='button'
          className='text-sm text-sky-400 text-left  hover:text-sky-600'
          onClick={() => hobbiesField.append({ value: '' })}
        >
          + agregar hobby
        </button>
        {errors.hobbies && (
          <ErrorMessage> {errors.hobbies?.message} </ErrorMessage>
        )}

        <label>Social Networks</label>
        {socialsField.fields.map((field, i) => (
          <div key={field.id} className='flex gap-2 items-center'>
            <input
              name='socialnetworks'
              className='border rounded-lg w-28 border-sky-600 px-2'
              placeholder='instagram'
              {...register(`socialNetworks.${i}.key`)}
            />
            <span>:</span>
            <input
              className='border rounded-lg w-28 border-sky-600 '
              placeholder='@usuario'
              {...register(`socialNetworks.${i}.value`)}
            />
            {socialsField.fields.length > 1 && (
              <button
                className='cursor-pointer hover:text-orange-600'
                type='button'
                onClick={() => socialsField.remove(i)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type='button'
          className='text-sm text-sky-400 text-left hover:text-sky-600 cursor-pointer'
          onClick={() => socialsField.append({ key: '', value: '' })}
        >
          + agregar red social
        </button>

        {errors.socialnetworks && (
          <ErrorMessage> {errors.socialnetworks?.message} </ErrorMessage>
        )}
        <div className='flex justify-center w-60'>
          <button
            className='border rounded-lg w-20 bg-sky-600 text-sky-50 hover:bg-sky-300 px-2'
            type='submit'
          >
            send
          </button>
        </div>
      </div>
    </form>
  );
}
export default NewFriendForm;
