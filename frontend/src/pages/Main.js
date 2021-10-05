import { useState } from 'react'

const Main =()=>{
    const [type, setType]= useState('all')

    return(
        <main className='mainContain'>
            <div>aca van las op vemos </div>
            <div>aca va el cuadrado con todas las tarjeta seguro un scroll y te mando por props q mandarte</div>
        </main>
    )
}
export default Main