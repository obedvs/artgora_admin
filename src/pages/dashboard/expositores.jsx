import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Callout, Card, Metric, TextInput } from "@tremor/react";
import { RiErrorWarningLine, RiSearchLine, RiUserAddLine } from "@remixicon/react";
import { apiURL } from "../../config/apiurl";
import { Loading } from "../../components/loading";

const Expositor = lazy(() => import('../../components/expositor'));


const Expositores = () => {

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
            <Metric className='mb-4 text-center'>Expositores</Metric>
            <Card className='w-full p-4'>
                <div className="flex items-center justify-around mb-2">
                    <form className="w-full">
                    <TextInput className="form-input w-full" icon={RiSearchLine} placeholder="Buscar Expositor..." onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
                    </form>
                    <Link to='agregar'>
                        <Button className='ml-2 bg-grayscale-500 hover:bg-grayscale-400 border-grayscale-500 hover:border-grayscale-500 h-[54px] pl-6 sm:pl-4' icon={RiUserAddLine} variant='primary'><span className="sm:inline-block hidden">Nuevo Expositor</span></Button>
                    </Link>
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

export default Expositores;