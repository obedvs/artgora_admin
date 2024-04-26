import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Button, Card, Subtitle} from "@tremor/react";
import { RiDeleteBinLine, RiImageEditLine } from "@remixicon/react";
import { apiURL } from "../config/apiurl";

const ImageCard = ({imagen}) => {

    const handleDelete = () => {
        Swal.fire({
            title: "¿Estás seguro/a de eliminar esta Imagen?",
            text: "No podrás revertir esto.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, Eliminar",
            confirmButtonColor: "#d33",
            cancelButtonText: "No, Cancelar",
            cancelButtonColor: "#3085d6",
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(apiURL + '/imagenes/' + imagen._id);
                    Swal.fire("Imagen Eliminada", "", "success").then(() => window.location.reload());
                } catch (error) {
                    toast.error(error.response.data.message || 'Error al eliminar el expositor.');
                }
            }
        });
    }

    return (
        <Card className='flex items-center justify-between p-2 mt-2'>
            <div className="flex flex-col items-center justify-center w-full">
                <img src={imagen.imagen} alt={imagen.nombre} className="aspect-square object-contain w-3/5"/>
                <Subtitle className='my-2 text-center'>Título: {imagen.nombre}</Subtitle>
                <Link to={`/dashboard/imagenes/editar/${imagen._id}`}>
                    <Button icon={RiImageEditLine} variant='primary'>Editar Imagen</Button>
                </Link>
                <Button className='hover:bg-red-400 hover:border-red-500 w-28 mt-2 bg-red-500 border-red-500' icon={RiDeleteBinLine} variant='primary' onClick={handleDelete} >Eliminar</Button>
            </div>
        </Card>
    )
}

export default ImageCard;