import React, {useState, useEffect} from "react"
import {db} from '../firebase'
import { collection,doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const Formulario = () =>{

    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [precio, setPrecio] = useState('');
    const [almacenamiento, setAlmacenamiento] = useState('');
    const [ram, setRam] = useState('');
    const [tamaño, setTamaño] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [id, setId] = useState(0);
    const [listaCelulares, setListaCelulares] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(()=>{
        const obtenerDatos = async()=>{
            try{
               await onSnapshot(collection(db,'frutas'), (query) =>{
                    setListaCelulares(query.docs.map((doc) => ({...doc.data(), id:doc.id})))
               }) 
            }catch(error){
               console.log(error)
            }
        }
            obtenerDatos();
    }, [])

    const guardarCelular = async (e)=>{
        e.preventDefault();
        try{
            const data = await addDoc(collection(db,'frutas'),{
               marcaC: marca,
               modeloC:modelo, 
               precioC: precio,
               almacenamientoC:almacenamiento,
               ramC: ram,
               tamañoC:tamaño,
               descripcionC:descripcion 
            })
            setListaCelulares(
                [...listaCelulares, {
                    marcaC: marca,
                    modeloC:modelo, 
                    precioC: precio,
                    almacenamientoC:almacenamiento,
                    ramC: ram,
                    tamañoC:tamaño,
                    descripcionC:descripcion,
                    id: data.id
                }]
            )
            setMarca('')
            setModelo('')
            setPrecio('')
            setAlmacenamiento('')
            setRam('')
            setTamaño('')
            setDescripcion('')
        }catch(error){
            console.log(error)
        }
    }

    const eliminar = async id=>{
        try {
            await deleteDoc(doc(db, 'frutas', id))
        } catch (error) {
            console.log(error)
        }
    }

    const editar = item =>{
        setMarca(item.marcaC)
        setModelo(item.modeloC)
        setPrecio(item.precioC)
        setAlmacenamiento(item.almacenamientoC)
        setRam(item.ramC)
        setTamaño(item.tamañoC)
        setDescripcion(item.descripcionC)
        setId(item.id)
        setModoEdicion(true)
    }

    const editarCelular = async e =>{
        e.preventDefault();
        try {
            const docRef = doc(db, 'frutas', id);
            await updateDoc(docRef,{
                marcaC: marca,
                modeloC:modelo, 
                precioC: precio,
                almacenamientoC:almacenamiento,
                ramC: ram,
                tamañoC:tamaño,
                descripcionC:descripcion,
            })

            const nuevoArray = listaCelulares.map(
                item => item.id === id ? {
                    id:id, 
                    marcaC: marca,
                    modeloC:modelo, 
                    precioC: precio,
                    almacenamientoC:almacenamiento,
                    ramC: ram,
                    tamañoC:tamaño,
                    descripcionC:descripcion,
                }: item
            )

            setListaCelulares(nuevoArray)
            setMarca('')
            setModelo('')
            setPrecio('')
            setAlmacenamiento('')
            setRam('')
            setTamaño('')
            setDescripcion('')
            setId('')
            setModoEdicion(false)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = () =>{
        setModoEdicion(false)
        setMarca('')
        setModelo('')
        setPrecio('')
        setAlmacenamiento('')
        setRam('')
        setTamaño('')
        setDescripcion('')
        setId('')
    }

    return (
        <div className="container mt-5">
            <h1 className="text-cent">CRUD DESARROLLO WEB I</h1>
            <hr/>
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Listado de Celulares</h4>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Marca</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Almacenamiento</th>
                            <th scope="col">Ram</th>
                            <th scope="col">Tamaño</th>
                            <th scope="col">Descripcion</th>
                            <th></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            listaCelulares.map(item => (
                                <tr>
                                <td>{item.marcaC}</td>
                                <td>{item.modeloC}</td>
                                <td>{item.precioC}</td>
                                <td>{item.almacenamientoC}</td>
                                <td>{item.ramC}</td>
                                <td>{item.tamañoC}</td>
                                <td>{item.descripcionC}</td>
                                <td><button className="btn btn-danger btn-sm fload-end mx-2" onClick={()=>eliminar(item.id)}>Eliminar</button></td>
                                <td><button className="btn btn-warning btn-sm fload-end" onClick={()=>editar(item)}>Editar</button></td>
                                </tr>
                            ))
                        }  
                        </tbody>
                    </table>
                </div>
                <div className="col-4">
                    <h4 className="text-center">{modoEdicion ? 'Editar Celular': 'Agregar Celular'}</h4>
                    <form onSubmit={modoEdicion ? editarCelular: guardarCelular}>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese Marca" value={marca} onChange={(e)=>setMarca(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese Modelo" value={modelo} onChange={(e)=>setModelo(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese Precio" value={precio} onChange={(e)=>setPrecio(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese Almacenamiento" value={almacenamiento} onChange={(e)=>setAlmacenamiento(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese Ram" value={ram} onChange={(e)=>setRam(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese Tamaño" value={tamaño} onChange={(e)=>setTamaño(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese descripcion" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
                        {
                            modoEdicion ?
                            (
                                <>
                                <button className="btn btn-primary btn-block" on="submit">Editar</button>
                                <button className="btn btn-dark btn-block mx-2" onClick={()=>cancelar()}>Cancelar</button>
                                </>
                            )
                            :
                            <button className="btn btn-primary btn-block" on="submit">Agregar</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario

