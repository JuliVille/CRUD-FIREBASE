import React, {useState, useEffect} from "react"
import {db} from '../firebase'
import { collection,doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import './crud.css';

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
        <div className="container mt-5" > 
            <h1 className="text-cent">CRUD DESARROLLO WEB I</h1>
            <hr/>
            <div className="row" >
            <div className="fondo col-2 mt-5"></div>
                <div className=" col-7" >
                    <h4 className="listado text-center mt-3" >Listado de Celulares</h4>
                    <table className="table  table-hover table-sm table-bordered table-dark">
                        <thead>
                            <tr>
                            <th scope="col">Marca</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Almacena</th>
                            <th scope="col">Ram</th>
                            <th scope="col">Tamaño</th>
                            <th scope="col">Descripcion</th>
                            <th colSpan="2">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            listaCelulares.map(item => (
                                <tr key={item.id}>
                                <td>{item.marcaC}</td>
                                <td>{item.modeloC}</td>
                                <td><span>$</span>{item.precioC}</td>
                                <td>{item.almacenamientoC}<span>gb</span></td>
                                <td>{item.ramC}<span>GB</span></td>
                                <td>{item.tamañoC}<span> pulgadas</span></td>
                                <td>{item.descripcionC}</td>
                                <td><button className="btn btn-danger btn-sm fload-end" onClick={()=>eliminar(item.id)}>Eliminar</button></td>
                                <td><button className="btn btn-success btn-sm fload-end" onClick={()=>editar(item)}>Editar</button></td>
                                </tr>
                            ))
                        }  
                        </tbody>
                    </table>
                </div>
                <div className="col-3">
                    <h4 className="text-center">{modoEdicion ? 'Editar Celular': 'Agregar Celular'}</h4>
                    <form onSubmit={modoEdicion ? editarCelular: guardarCelular} className="row g-2">
                        <div className="col-6 "><input type="text" className="form-control" placeholder="Ingrese Marca" value={marca} onChange={(e)=>setMarca(e.target.value)} required/></div>
                        <div className="col-6"><input type="text" className="form-control" placeholder="Ingrese Modelo" value={modelo} onChange={(e)=>setModelo(e.target.value)} required/></div>                      
                        <div className="input-group ">
                            <span className="input-group-text">$</span>
                            <input type="number" className="form-control" placeholder="Ingrese Precio" value={precio} onChange={(e)=>setPrecio(e.target.value)} required/>
                        </div>
                        <div className="input-group ">
                            <input type="number" className="form-control" placeholder="Ingrese Almacenamiento" value={almacenamiento} onChange={(e)=>setAlmacenamiento(e.target.value)} required/>
                            <span className="input-group-text" >gb</span >
                        </div>
                        <div className="input-group ">
                            <input type="number" className="form-control" placeholder="Ingrese Ram" value={ram} onChange={(e)=>setRam(e.target.value)} required/>
                            <span className="input-group-text" >GB</span >
                        </div>
                        <div className="input-group ">
                            <input type="number" className="form-control" placeholder="Ingrese Tamaño" value={tamaño} onChange={(e)=>setTamaño(e.target.value)} required/>
                            <span className="input-group-text" >pulgadas</span >
                        </div>
                        <div className="col-12"><textarea type="text" className="form-control" placeholder="Ingrese descripcion" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)} required></textarea></div>
                        {
                            modoEdicion ?
                            (
                                <>
                                <button className="btn btn-success btn-block" on="submit">Editar</button>
                                <button className="btn btn-dark btn-block" onClick={()=>cancelar()}>Cancelar</button>
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

/*
{<img src="https://picsum.photos/200/300" alt="" />}
*/