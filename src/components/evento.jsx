import { RiDeleteBinLine, RiEdit2Line } from "@remixicon/react";
import { Button, Card, Subtitle } from "@tremor/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { apiURL } from "../config/apiurl";

const Evento = ({evento}) => {

    const handleDelete = () => {
        Swal.fire({
            title: "¿Estás seguro/a de eliminar este Evento?",
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
                    await axios.delete(apiURL + '/events/protecteddeleteroute/delete/' + evento._id);
                    Swal.fire("Evento Eliminado", "", "success").then(() => window.location.reload());
                } catch (error) {
                    toast.error(error.response.data.message || 'Error al eliminar el Evento.');
                }
            }
        });
    }

    return (
        <Card className='flex items-center justify-between p-2 mt-2'>
            <div className="flex items-center w-full">
                <img src={evento.imagen} alt={evento.titulo} className="size-32 object-cover"/>
                <Subtitle className='overflow-ellipsis ml-2 overflow-hidden'>{evento.titulo}</Subtitle>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <Link to={`editar/${evento._id}`}>
                    <Button className='w-28' icon={RiEdit2Line} variant='primary'>Editar</Button>
                </Link>
                <Button className='hover:bg-red-400 hover:border-red-500 w-28 bg-red-500 border-red-500' icon={RiDeleteBinLine} variant='primary' onClick={handleDelete} >Eliminar</Button>
            </div>
        </Card>
    )
}

export default Evento;