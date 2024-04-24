import { RiAlertLine, RiCheckboxCircleLine } from "@remixicon/react"
import { Callout, Card, Metric, Subtitle, Text, Title } from "@tremor/react"

export const Dashboard = () => {
  return (
    <section className='flex flex-col items-center w-full h-full p-4'>
      <Metric className='mb-4 text-center'>ArtGora Dashboard</Metric>
      <article className="size-full flex flex-col items-center justify-center">
        <Card className='max-w-xl p-4'>
            <Title className='mb-2 text-center'>Bienvenido/a</Title>
            <Subtitle className='mb-2 text-center'>¡Hola! Administrador/a de ArtGora, la plataforma de gestión de contenido de la galería de arte.</Subtitle>
            <Text className='text-center'>Desde aquí podrás gestionar los artistas, grupos e imágenes de la galería, y tus configuraciones de seguridad.</Text>
        </Card>
        <Callout className='max-w-xl p-4 mt-4' title="¿Cuál es tu función principal?" icon={RiCheckboxCircleLine}>
          Como administrador/a de ArtGora, tu función principal es la de gestionar el contenido de la galería de arte. Puedes añadir, editar y eliminar artistas, grupos e imágenes. También puedes cambiar tu contraseña en la sección de configuración.
        </Callout>
        <Callout className='max-w-xl p-4 mt-4' title="¿Qué debes hacer si encuentras un error?" color='yellow' icon={RiAlertLine}>
          Si encuentras un error en la plataforma, por favor, contacta con el equipo de desarrollo ó soporte técnico de ArtGora para que puedan solucionarlo lo antes posible en el correo electrónico: <a className="font-semibold" href="mailto:artgora.main@gmail.com">artgora.main@gmail.com</a>.
        </Callout>
      </article>
    </section>
  )
}

export default Dashboard