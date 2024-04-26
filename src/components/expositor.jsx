import { RiDeleteBinLine, RiEdit2Line } from "@remixicon/react";
import { Button, Card, Subtitle } from "@tremor/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Expositor = ({expositor}) => {

    const handleDelete = () => {
        Swal.fire({
            title: "¿Estás seguro/a de eliminar este Expositor?",
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
                    await axios.delete(apiURL + '/artists/' + expositor._id);
                    Swal.fire("Expositor Eliminado", "", "success").then(() => window.location.reload());
                } catch (error) {
                    toast.error(error.response.data.message || 'Error al eliminar el expositor.');
                }
            }
        });
    }

    return (
        <Card className='flex items-center justify-between p-2 mt-2'>
            <div className="flex items-center w-full">
                <img src={expositor.perfil} alt={expositor.nombre} className="object-cover w-12 h-12 rounded-full"/>
                {/* <div className="ml-2 leading-3"> */}
                    <Subtitle className='overflow-ellipsis ml-2 overflow-hidden'>{expositor.nombre}</Subtitle>
                    {/* <p className='text-sm'>{expositor.sobreNombre}</p> */}
                {/* </div> */}
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <Link to={`editar/${expositor._id}`}>
                    <Button className='w-28' icon={RiEdit2Line} variant='primary'>Editar</Button>
                </Link>
                <Button className='hover:bg-red-400 hover:border-red-500 w-28 bg-red-500 border-red-500' icon={RiDeleteBinLine} variant='primary' onClick={handleDelete} >Eliminar</Button>
            </div>
        </Card>
    )
}

export default Expositor;