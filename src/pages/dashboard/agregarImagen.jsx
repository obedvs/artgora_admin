import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RiArrowGoBackLine, RiArticleLine, RiFileSettingsLine, RiImageAddLine, RiImageLine, RiRuler2Line } from "@remixicon/react"
import { Button, Card, Metric, Subtitle, TextInput, Title } from "@tremor/react";
import { apiURL } from "../../config/apiurl";
import { toast } from "sonner";
import axios from "axios";

const AgregarImagen = () => {

    const { expositorId, expositorName } = useParams();

    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');

    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const onSubmit = async (data) => {
        // Enviar archivo con la información del formulario
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('imagen', data.imagen[0]);
        formData.append('descripcion', data.descripcion);
        formData.append('ficha', data.ficha);
        formData.append('medidas', data.medidas);
        formData.append('expositorNombre', expositorName);
        formData.append('expositorId', expositorId);
        formData.append('editor', userName);
        
        await axios.post(apiURL + '/imagenes/', formData)
        .then(res => {
        if (res.status === 201) {
            toast.success(`Se ha agregado la imagen del expositor: ${expositorName} correctamente.`);
            navigate(`/dashboard/imagenes/galeria/${expositorId}/${expositorName}`);
        }
        })
        .catch(err => {
            toast.error(err.response.data.message || 'Error al Agregar Imagen.');
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
            <Metric className='mb-4 text-center'>Agregar Imagen a Galería de {expositorName}</Metric>
            <Card className='w-full p-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                <div className='grid grid-cols-1 gap-4'>
                    <TextInput type="text" {...register('nombre', { required: true })} placeholder="Nombre de la Obra o Descripción Simple" className='form-input w-full' icon={RiImageLine} error={errors.nombre} errorMessage='El Nombre de la Obra o la Descripción Simple es Requerido.'/>
                    <label htmlFor="image" id="dropcontainer"
                    onDragOver={(e) => e.preventDefault()} onDrop={(e) => {handleDrop(e)}} onDragEnter={(e) => {e.currentTarget.classList.add('bg-grayscale-200')}} onDragLeave={(e) => {e.currentTarget.classList.remove('bg-grayscale-200')}}
                    className={`rounded-3xl border-tremor-border text-grayscale-500 bg-tremor-background hover:bg-tremor-background-muted relative flex flex-col items-center justify-center gap-2 p-4 transition-colors border-2 border-dashed cursor-pointer ${errors.imagen && '!border-red-500'}`}
                    >
                        <span className="text-grayscale-500 text-lg font-bold text-center">Suelta la Imagen Aquí</span>
                        o
                        <input {...register('imagen', { required: true })} type="file" id="image" accept=".png, .jpg, .jpeg" multiple={false} className="image-input"
                        />
                    </label>
                    { errors.imagen && <p className='text-sm text-red-500'>La Imagen es Requerida.</p> }
                    <TextInput type="text" {...register('descripcion')} placeholder="Descripción (Opcional)" className='form-input w-full' icon={RiArticleLine}/>
                    <div className="rounded-3xl border-tremor-border flex flex-col items-center w-full gap-2 p-4 border-2">
                        <Title className="text-center">Información Adicional</Title>
                        <Subtitle className="text-center">Agrega información adicional sobre la imagen.</Subtitle>
                        <TextInput type="text" {...register('ficha')} placeholder="Ficha Técnica (Opcional)" className='form-input w-full' icon={RiFileSettingsLine}/>
                        <TextInput type="text" {...register('medidas', { pattern: /\d+\s*(?:cm|mm|m|in|ft)\s*x\s*\d+\s*(?:cm|mm|m|in|ft)/g })} placeholder="Medidas (Opcional) Ejemplo: 40cm x 40cm" className='form-input w-full' icon={RiRuler2Line} error={errors.medidas} errorMessage="Las Medidas Deben ser en un Formato Idéntico a: 40cm x 40cm, se aceptan mm, cm, m, in y ft."/>
                    </div>
                    <div className='flex items-center justify-between'>
                        <Button type="submit" icon={RiImageAddLine} variant='primary' className='w-28'>Agregar</Button>
                        <Link to={`/dashboard/imagenes/galeria/${expositorId}/${expositorName}`}>
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

export default AgregarImagen