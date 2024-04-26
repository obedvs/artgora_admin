import React, { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import { Callout, Card, Metric, TextInput } from "@tremor/react";
import { RiErrorWarningLine, RiSearchLine } from "@remixicon/react";
import { apiURL } from "../../config/apiurl";
import { Loading } from "../../components/loading";

const Expositor = lazy(() => import('../../components/expositorImagenes.jsx'));


const Imagenes = () => {

    const [expositores, setExpositores] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        
        axios.get( apiURL + '/artists', { cancelToken: cancelToken.token })
            .then(res => {
                setExpositores(res.data.reverse());
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

    const expositoresFiltrados = expositores ? expositores.filter(u => u.nombre && u.nombre.toLowerCase().includes(searchText.toLowerCase())) : [];
    const elementosRenderizados = expositoresFiltrados.map((expositor) => <Suspense fallback={<Loading />}><Expositor expositor={expositor} key={expositor._id}/></Suspense>);

    return (
        <section className='flex flex-col items-center w-full h-full p-2'>
            <Metric className='mb-4 text-center'>Imágenes de Expositores</Metric>
            <Card className='w-full p-4'>
                <div className="flex items-center justify-around mb-2">
                    <form className="w-full">
                    <TextInput className="form-input w-full" icon={RiSearchLine} placeholder="Buscar Expositor..." onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
                    </form>
                </div>
                <div className="w-full">
                {isloading ? <Loading /> : expositoresFiltrados.length > 0 ? (
                    <div className='md:grid lg:grid-cols-3 grid-cols-2 gap-2'>
                        {React.Children.toArray(elementosRenderizados)}
                    </div>
                ) : (
                    <Callout icon={RiErrorWarningLine} title="No se encuentran expositores con el nombre:" color='neutral'>{searchText}</Callout>
                )}
                </div>
            </Card>
        </section>
    )
}

export default Imagenes;