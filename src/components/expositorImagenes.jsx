import { RiGalleryLine } from "@remixicon/react";
import { Button, Card, Subtitle} from "@tremor/react";
import { Link } from "react-router-dom";

const ExpositorImagenes = ({expositor}) => {

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
                <Link to={`galeria/${expositor._id}/${expositor.nombre}`}>
                    <Button icon={RiGalleryLine} variant='primary'>Ver Galería</Button>
                </Link>
            </div>
        </Card>
    )
}

export default ExpositorImagenes;