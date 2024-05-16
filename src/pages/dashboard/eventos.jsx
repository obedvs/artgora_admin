import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Callout, Card, Metric, TextInput } from "@tremor/react";
import { RiCalendarScheduleLine, RiErrorWarningLine, RiSearchLine, RiUserAddLine } from "@remixicon/react";
import { apiURL } from "../../config/apiurl.jsx";
import { Loading } from "../../components/loading.jsx";

const Evento = lazy(() => import('../../components/evento.jsx'));


const Eventos = () => {

    const [eventos, setEventos] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        
        axios.get( apiURL + '/events', { cancelToken: cancelToken.token })
            .then(res => {
                setEventos(res.data.reverse());
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

    const eventosFiltrados = eventos ? eventos.filter(u => u.titulo && u.titulo.toLowerCase().includes(searchText.toLowerCase())) : [];
    const elementosRenderizados = eventosFiltrados.map((evento) => <Suspense fallback={<Loading />}><Evento evento={evento} key={evento._id}/></Suspense>);

    return (
        <section className='flex flex-col items-center w-full h-full p-2'>
            <Metric className='mb-4 text-center'>Eventos</Metric>
            <Card className='w-full p-4'>
                <div className="flex items-center justify-around mb-2">
                    <form className="w-full">
                    <TextInput className="form-input w-full" icon={RiSearchLine} placeholder="Buscar Evento..." onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
                    </form>
                    <Link to='agregar'>
                        <Button className='ml-2 bg-grayscale-500 hover:bg-grayscale-400 border-grayscale-500 hover:border-grayscale-500 h-[54px] pl-6 sm:pl-4' icon={RiCalendarScheduleLine} variant='primary'><span className="sm:inline-block hidden">Nuevo Evento</span></Button>
                    </Link>
                </div>
                <div className="w-full">
                {isloading ? <Loading /> : eventosFiltrados.length > 0 ? (
                    <div className='md:grid grid-cols-2 gap-2'>
                        {React.Children.toArray(elementosRenderizados)}
                    </div>
                ) : (
                    <Callout icon={RiErrorWarningLine} title="No se encuentran eventos con el título:" color='neutral'>{searchText}</Callout>
                )}
                </div>
            </Card>
        </section>
    )
}

export default Eventos;