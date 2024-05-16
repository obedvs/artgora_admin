import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, Card, Metric, TextInput } from "@tremor/react"
import { RiArrowGoBackLine, RiArticleLine, RiCalendarEventFill, RiCalendarLine, RiMapPin2Line, RiTimeLine } from "@remixicon/react"
import { apiURL } from "../../config/apiurl";

const AgregarEvento = () => {

  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    // Enviar archivo con la información del formulario
    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('imagen', data.imagen[0]);
    formData.append('descripcion', data.descripcion);
    formData.append('lugar', data.lugar);

    formData.append('fechaInicio', data.fechaInicio);
    formData.append('fechaFin', data.fechaFin);
    formData.append('horaInicio', data.horaInicio);
    formData.append('horaFin', data.horaFin);
    formData.append('editor', userName);

    await axios.post(apiURL + '/events', formData)
      .then(res => {
      if (res.status === 201) {
          toast.success(`Se ha agregado el evento: ${data.titulo} correctamente.`);
          navigate('/dashboard/eventos');
      }
      })
      .catch(err => {
        toast.error(err.response.data.message || 'Error al agregar el evento.');
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
      <Metric className='mb-4 text-center'>Agregar Evento</Metric>
      <Card className='w-full p-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className='grid grid-cols-1 gap-4'>
            <TextInput type="text" {...register('titulo', { required: true })} placeholder="Título o Nombre del evento" className='form-input w-full' icon={RiCalendarLine} error={errors.titulo} errorMessage='El Título o Nombre es Requerido.'/>
            <label htmlFor="image" id="dropcontainer"
            onDragOver={(e) => e.preventDefault()} onDrop={(e) => {handleDrop(e)}} onDragEnter={(e) => {e.currentTarget.classList.add('bg-grayscale-200')}} onDragLeave={(e) => {e.currentTarget.classList.remove('bg-grayscale-200')}}
            className={`rounded-[30px] border-tremor-border text-grayscale-500 bg-tremor-background hover:bg-tremor-background-muted relative flex flex-col items-center justify-center gap-2 p-4 transition-colors border-2 border-dashed cursor-pointer ${errors.perfil && '!border-red-500'}`}
            >
                <span className="text-grayscale-500 text-lg font-bold text-center">Suelta la Imagen Aquí</span>
                o
                <input {...register('imagen', { required: true })} type="file" id="image" accept=".png, .jpg, .jpeg" multiple={false} className="image-input"
                />
            </label>
            { errors.perfil && <p className='text-sm text-red-500'>La Imagen del evento es Requerida.</p> }
            <TextInput {...register('descripcion', { required: true })} placeholder="Descripción..." className='form-input w-full' icon={RiArticleLine} error={errors.descripcion} errorMessage='La Descripción es Requerida.' />
            <TextInput type="text" {...register('lugar')} placeholder="Lugar del Evento" className='form-input w-full' icon={RiMapPin2Line} />
            
            <div className='grid grid-cols-2 gap-4'>
              <span>Fecha de Inicio:</span>
              <span>Fecha de Fin (Opcional):</span>
              <TextInput type="date" {...register('fechaInicio', { required: true })} placeholder="Fecha de Inicio" className='form-input w-full' icon={RiCalendarEventFill} error={errors.fechaInicio} errorMessage='La Fecha de Inicio es Requerida.' />
              <TextInput type="date" {...register('fechaFin')} placeholder="Fecha de Fin" className='form-input w-full' icon={RiCalendarEventFill} />
            </div>
            
            <div className='grid grid-cols-2 gap-4'>
              <span>Hora de Inicio:</span>
              <span>Hora de Fin (Opcional):</span>
              <TextInput type="time" {...register('horaInicio', { required: true })} placeholder="Hora de Inicio" className='form-input w-full' icon={RiTimeLine} error={errors.horaInicio} errorMessage='La Hora de Inicio es Requerida.' />
              <TextInput type="time" {...register('horaFin')} placeholder="Hora de Fin" className='form-input w-full' icon={RiTimeLine} />
            </div>
            <div className='flex items-center justify-between'>
              <Button type="submit" icon={RiCalendarEventFill} variant='primary' className='w-28'>Agregar</Button>
              <Link to='/dashboard/eventos'>
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

export default AgregarEvento;