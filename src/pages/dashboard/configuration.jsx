import axios from 'axios';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
// import { useNavigate } from 'react-router-dom';
import { Button, Card, Metric, TextInput, Title } from '@tremor/react';
import { RiKey2Fill, RiLockLine } from '@remixicon/react';
import { apiURL } from '../../config/apiurl';

const DashboardConfiguration = () => {

    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    
    const onSubmit = async (data) => {
        if(data.password !== data.repassword) {
            toast.error('Las contraseñas no coinciden.')
        } else {
            // TODO: Hide real url
            await axios.patch(apiURL + userId, {
                email: userEmail,
                password: data.password,
                oldPassword: data.oldPassword
            }).then(res => {
                if (res.status === 200) {
                    toast.success('La contraseña ha sido cambiada exitosamente.');
                }
            }).catch(err => {
                    toast.error(err.response.data.message || 'Error al cambiar la contraseña.');
            })
        }
    }
    
    return (
        <section className='w-full h-full p-8'>
            <Metric className='mb-4 text-center'>Configuración</Metric>
            <Card className='md:w-1/2 w-full p-4'>
                <Title className='mb-2 text-center'>Cambiar Contraseña</Title>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center w-full bg-transparent">

                    <div className="text-grayscale-500 mb-1 cursor-default">
                        <span className="font-medium">Contraseña Anterior</span>
                    </div>
                    <TextInput className="form-input w-full"
                    type='password' {...register('oldPassword', { required: true })} placeholder='Contraseña Anterior'
                    error={errors.oldPassword} errorMessage='La Contraseña Anterior es Requerida.' icon={RiLockLine}/>
                    
                    <div className="text-grayscale-500 mt-4 mb-1 cursor-default">
                        <span className="font-medium">Nueva Contraseña</span>
                    </div>
                    <TextInput className="form-input w-full"
                    type='password' {...register('password', { required: true })} placeholder='Nueva Contraseña'
                    error={errors.password} errorMessage='La Nueva Contraseña es Requerida.' icon={RiLockLine}/>

                    <div className="text-grayscale-500 mt-4 mb-1 cursor-default">
                        <span className="font-medium">Confirma Nueva Contraseña</span>
                    </div>
                    <TextInput className="form-input w-full"
                    type='password' {...register('repassword', { required: true })} placeholder='Confirma Nueva Contraseña'
                    error={errors.repassword} errorMessage='La Confirmación de la Contraseña es Requerida.' icon={RiLockLine}/>
                    
                    <Button className='bg-grayscale-500 hover:bg-grayscale-400 border-grayscale-500 hover:border-grayscale-500 mt-8' icon={RiKey2Fill} variant='primary' type='submit'>Cambiar Contraseña</Button>
                </form>
            </Card>
        </section>
    )
}

export default DashboardConfiguration;