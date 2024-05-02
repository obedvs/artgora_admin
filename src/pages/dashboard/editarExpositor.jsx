import { RiArrowGoBackLine, RiArticleLine, RiInstagramLine, RiMailLine, RiUserFollowLine, RiUserLine, RiUserStarLine } from "@remixicon/react";
import { Button, Card, Metric, TextInput, Textarea, Title } from "@tremor/react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiURL } from "../../config/apiurl";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

const EditarExpositor = () => {

    const { expositorId } = useParams();
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');
    
    const [expositor, setExpositor] = useState({});

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: async () => (await axios.get(apiURL + '/artists/protectedupdateroute/update/' + expositorId)
            .then(res => {
                setExpositor(res.data);
                return res.data;
            })
        )
    })
    
    const onSubmit = async (data) => {
        // Enviar archivo con la información del formulario
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        if (data.perfilNew[0]) formData.append('perfil', data.perfilNew[0]);
        formData.append('sobreNombre', data.sobreNombre);
        formData.append('descripcion', data.descripcion);
        formData.append('instagram', data.instagram);
        formData.append('email', data.email);
        formData.append('editor', userName);

        await axios.patch(apiURL + '/artists/' + expositorId, formData)
            .then(res => {
            if (res.status === 200) {
                toast.success(`Se ha actualizado el expositor: ${data.nombre} correctamente.`);
                navigate('/dashboard/expositores');
            }
            })
            .catch(err => {
            toast.error(err.response.data.message || 'Error al actualizar el expositor.');
            });
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const image = e.dataTransfer.files;
        if (image.length > 1) {
            toast.warning("Solo puedes subir una imagen a la vez.");
            return;
        } else if (image[0].type !== 'image/png' && image[0].type !== 'image/jpg' && image[0].type !== 'image/jpeg') {
            toast.warning("Solo puedes subir imágenes en formato PNG, JPG o JPEG.");
            return;
        } else {
            const imageInput = document.getElementById('image');
            imageInput.files = image;
            e.currentTarget.classList.remove('bg-grayscale-200');
        }
    }

    return (
        <section className='flex flex-col items-center w-full h-full p-2'>
        <Metric className='mb-4 text-center'>Actualizar Expositor</Metric>
        <Card className='w-full p-4'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <div className='grid grid-cols-1 gap-4'>
                <TextInput type="text" {...register('nombre')} placeholder="Nombre Completo" className='form-input w-full' icon={RiUserLine} error={errors.nombre} errorMessage='El Nombre Completo es Requerido.'/>
                <div className='md:flex-row flex flex-col items-center w-full gap-4'>
                    <div className="flex flex-col justify-around items-center rounded-[30px] border-tremor-border border-2 min-w-[164px] size-[164px]">
                        <Title className="text-center">Foto de Perfil Actual</Title>
                        <img src={expositor.perfil} alt={expositor.nombre} className="size-20 object-cover rounded-full"/>
                    </div>
                    <label htmlFor="image" id="dropcontainer"
                    onDragOver={(e) => e.preventDefault()} onDrop={(e) => {handleDrop(e)}} onDragEnter={(e) => {e.currentTarget.classList.add('bg-grayscale-200')}} onDragLeave={(e) => {e.currentTarget.classList.remove('bg-grayscale-200')}}
                    className='rounded-[30px] w-full border-tremor-border text-grayscale-500 bg-tremor-background hover:bg-tremor-background-muted relative flex flex-col items-center justify-center gap-2 p-4 transition-colors border-2 border-dashed cursor-pointer'
                    >
                        <span className="text-grayscale-500 text-lg font-bold text-center">Suelta la Nueva Foto de Perfil (Opcional)</span>
                        o
                        <input {...register('perfilNew', { required: false })} type="file" id="image" accept=".png, .jpg, .jpeg" multiple={false} className="image-input"
                        />
                    </label>
                </div>
                <TextInput {...register('descripcion')} icon={RiArticleLine} placeholder="Descripción..." className='form-input w-full' error={errors.descripcion} errorMessage='La Descripción es Requerida.' />
                <TextInput type="text" {...register('sobreNombre')} placeholder="Sobre Nombre (Opcional)" className='form-input w-full' icon={RiUserStarLine} />
                <TextInput type="url" {...register('instagram')} placeholder="Instagram (Opcional)" className='form-input w-full' icon={RiInstagramLine} />
                <TextInput type="email" {...register('email', { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g } )} placeholder="Correo Electrónico (Opcional)" className='form-input w-full' icon={RiMailLine} />
                <div className='flex items-center justify-between'>
                <Button type="submit" icon={RiUserFollowLine} variant='primary' className='w-28'>Editar</Button>
                <Link to='/dashboard/expositores'>
                    <Button
                    className='w-28 hover:bg-red-400 hover:border-red-500 bg-red-500 border-red-500'
                    icon={RiArrowGoBackLine}
                    variant='primary'
                    >
                    Regresar
                    </Button>
                </Link>
                </div>
            </div>
            </form>
        </Card>
        </section>
    )
}

export default EditarExpositor;