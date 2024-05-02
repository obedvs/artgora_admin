import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, Card, Metric, Subtitle, TextInput, Title } from "@tremor/react";
import { RiArrowGoBackLine, RiArticleLine, RiFileSettingsLine, RiImageEditLine, RiImageLine, RiRuler2Line } from "@remixicon/react"
import { apiURL } from "../../config/apiurl";

const EditarImagen = () => {

    const { imagenId } = useParams();

    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');

    const [imagen, setImagen] = useState({});

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: async () => (await axios.get(apiURL + '/imagenes/' + imagenId)
            .then(res => {
                setImagen(res.data);
                return res.data;
            })
        )
    })
    
    const onSubmit = async (data) => {
        // Enviar archivo con la información del formulario
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        if (data.imagenNew[0]) formData.append('imagen', data.imagenNew[0]);
        formData.append('descripcion', data.descripcion);
        formData.append('ficha', data.ficha);
        formData.append('medidas', data.medidas);
        formData.append('editor', userName);
        
        await axios.patch(apiURL + '/imagenes/protectedupdateroute/update/' + imagenId, formData)
        .then(res => {
        if (res.status === 200) {
            toast.success(`Se ha actualizado la imagen: ${data.nombre} correctamente.`);
            navigate(`/dashboard/imagenes/galeria/${imagen.expositorId}/${imagen.expositorNombre}`);
        }
        })
        .catch(err => {
            toast.error(err.response.data.message || 'Error al Actualizar Imagen.');
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
            <Metric className='mb-4 text-center'>Actualizar Imagen de la Galería de {imagen.expositorNombre}</Metric>
            <Card className='w-full p-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                <div className='grid grid-cols-1 gap-4'>
                    <TextInput type="text" {...register('nombre')} placeholder="Nombre de la Obra o Descripción Simple" className='form-input w-full' icon={RiImageLine} error={errors.nombre} errorMessage='El Nombre de la Obra o la Descripción Simple es Requerido.'/>
                    <div className='md:flex-row flex flex-col items-center w-full gap-4'>
                        <div className="flex flex-col justify-around items-center rounded-[30px] border-tremor-border border-2 min-w-[164px] size-[164px]">
                            <Title className="text-center">Imagen Actual</Title>
                            <img src={imagen.imagen} alt={imagen.nombre} className="size-28 object-contain"/>
                        </div>
                        <label htmlFor="image" id="dropcontainer"
                        onDragOver={(e) => e.preventDefault()} onDrop={(e) => {handleDrop(e)}} onDragEnter={(e) => {e.currentTarget.classList.add('bg-grayscale-200')}} onDragLeave={(e) => {e.currentTarget.classList.remove('bg-grayscale-200')}}
                        className={`rounded-3xl w-full border-tremor-border text-grayscale-500 bg-tremor-background hover:bg-tremor-background-muted relative flex flex-col items-center justify-center gap-2 p-4 transition-colors border-2 border-dashed cursor-pointer ${errors.imagen && '!border-red-500'}`}
                        >
                            <span className="text-grayscale-500 text-lg font-bold text-center">Suelta la Imagen Aquí</span>
                            o
                            <input {...register('imagenNew', { required: false })} type="file" id="image" accept=".png, .jpg, .jpeg" multiple={false} className="image-input"
                            />
                        </label>
                    </div>
                    <TextInput type="text" {...register('descripcion')} placeholder="Descripción (Opcional)" className='form-input w-full' icon={RiArticleLine}/>
                    <div className="rounded-3xl border-tremor-border flex flex-col items-center w-full gap-2 p-4 border-2">
                        <Title className="text-center">Información Adicional</Title>
                        <Subtitle className="text-center">Agrega información adicional sobre la imagen.</Subtitle>
                        <TextInput type="text" {...register('ficha')} placeholder="Ficha Técnica (Opcional)" className='form-input w-full' icon={RiFileSettingsLine}/>
                        <TextInput type="text" {...register('medidas', { pattern: /\d+\s*(?:cm|mm|m|in|ft)\s*x\s*\d+\s*(?:cm|mm|m|in|ft)/g })} placeholder="Medidas (Opcional) Ejemplo: 40cm x 40cm" className='form-input w-full' icon={RiRuler2Line} error={errors.medidas} errorMessage="Las Medidas Deben ser en un Formato Idéntico a: 40cm x 40cm, se aceptan mm, cm, m, in y ft."/>
                    </div>
                    <div className='flex items-center justify-between'>
                        <Button type="submit" icon={RiImageEditLine} variant='primary' className='w-28'>Editar</Button>
                        <Link to={`/dashboard/imagenes/galeria/${imagen.expositorId}/${imagen.expositorNombre}`}>
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

export default EditarImagen