import axios from 'axios';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Metric, TextInput, Title } from '@tremor/react';
import { RiLockLine, RiLoginBoxLine, RiMailLine } from '@remixicon/react';
import { apiURL } from '../../config/apiurl';

const Login = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    // TODO: Hide real url
    await axios.post(apiURL + '/auth/signin', {
      email: data.email,
      password: data.password
    }).then(res => {
      if (res.status === 200) {
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('userName', res.data.nombre);
        localStorage.setItem('userEmail', res.data.email);
        navigate('/dashboard/inicio');
      }
    }).catch(err => {
        toast.error(err.response?.data.message || 'Error al iniciar sesión.');
    })
  }

  return (
    <section id='login' className="place-items-center bg-gradient-to-tr from-grayscale-100 to-grayscale-500 grid w-full h-screen">
      <Card className="lg:w-1/3 md:w-1/2 sm:w-3/4 bg-grayscale-100/50 backdrop-blur sm:h-auto w-full h-full p-8 shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="sm:h-auto flex flex-col justify-center w-full h-full bg-transparent">
        <Metric className="text-grayscale-500 mb-4 text-2xl font-bold text-center">¡Hola administrador/a!</Metric>
        <Title className="text-grayscale-500 mb-4 text-xl font-semibold">Inicia sesión para comenzar.</Title>
        <div className="text-grayscale-500 mb-1 cursor-default">
          <span className="text-base font-medium">Correo Electrónico</span>
        </div>
        <TextInput className="form-input w-full"
          type='email' {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} placeholder='Correo Electrónico'
          error={errors.email} errorMessage='El Correo Electrónico es Requerido.' icon={RiMailLine}/>
        <div className="text-grayscale-500 mt-2 mb-1 cursor-default">
          <span className="text-base font-medium">Contraseña</span>
        </div>
        <TextInput className="form-input w-full"
          type='password' {...register('password', { required: true })} placeholder='Contraseña'
          error={errors.password} errorMessage='La Contraseña es Requerida.' icon={RiLockLine}/>
        <Button className='bg-grayscale-500 hover:bg-grayscale-400 border-grayscale-500 hover:border-grayscale-500 mt-4' icon={RiLoginBoxLine} variant='primary' type='submit'>
          Iniciar Sesión
        </Button>
      </form>
      </Card>
    </section>
  )
}

export default Login