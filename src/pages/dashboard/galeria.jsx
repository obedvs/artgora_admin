import React, { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import { Button, Callout, Card, Metric, TextInput } from "@tremor/react";
import { RiErrorWarningLine, RiImageAddLine, RiSearchLine } from "@remixicon/react";
import { apiURL } from "../../config/apiurl";
import { Loading } from "../../components/loading";
import { Link, useParams } from "react-router-dom";

const Imagen = lazy(() => import('../../components/imageCard.jsx'));


const Galeria = () => {

    const { expositorId, expositorName } = useParams();

    const [imagenes, setImagenes] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        
        axios.get( apiURL + '/imagenes/expositor/' + expositorId, { cancelToken: cancelToken.token })
            .then(res => {
                setImagenes(res.data.reverse());
                setIsLoading(false);
            })
            .catch (err => {
                if (axios.isCancel(err)) {
                    return;
                } else {
                    console.error(err);
                }
            })

        return () => {
            cancelToken.cancel();
        }
    }, []);

    const imagenesFiltradas = imagenes ? imagenes.filter(u => u.nombre && u.nombre.toLowerCase().includes(searchText.toLowerCase())) : [];
    const elementosRenderizados = imagenesFiltradas.map((imagen) => <Suspense fallback={<Loading />}><Imagen imagen={imagen} key={imagen._id}/></Suspense>);

    return (
        <section className='flex flex-col items-center w-full h-full p-2'>
            <Metric className='mb-4 text-center'>Galería de {expositorName}</Metric>
            <Card className='w-full p-4'>
                <div className="flex items-center justify-around mb-2">
                    <form className="w-full">
                    <TextInput className="form-input w-full" icon={RiSearchLine} placeholder="Buscar Imagen en Galería..." onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
                    </form>
                    <Link to={`/dashboard/imagenes/agregar/${expositorId}/${expositorName}`}>
                        <Button className='ml-2 bg-grayscale-500 hover:bg-grayscale-400 border-grayscale-500 hover:border-grayscale-500 h-[54px] pl-6 sm:pl-4' icon={RiImageAddLine} variant='primary'><span className="sm:inline-block hidden">Agregar Imagen</span></Button>
                    </Link>
                </div>
                <div className="w-full">
                {isloading ? <Loading /> : imagenesFiltradas.length > 0 ? (
                    <div className='md:grid lg:grid-cols-3 grid-cols-2 gap-2'>
                        {React.Children.toArray(elementosRenderizados)}
                    </div>
                ) : (
                    <Callout icon={RiErrorWarningLine} title="No se han agregado imágenes o no se encuentran imágenes con el nombre:" color='neutral'>{searchText}</Callout>
                )}
                </div>
            </Card>
        </section>
    )
}

export default Galeria;