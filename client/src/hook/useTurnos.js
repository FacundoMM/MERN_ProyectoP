import axios from "axios";

class useTurnos {
    constructor(){
        this.instance = axios.create({
            baseURL: "http://localhost:8000/api/turnos",
            withCredentials: true,
        })
    }

    turnos(){
        return this.instance.get()
    }

    allDetalle(){
        return this.instance.get('../detalles')
    }

    detalles(id){
        return this.instance.get(`/${id}/detalles`)
    }

    adquirir(turnoId, detalleId, gmail){
        return this.instance.put(`/${turnoId}/detalles/${detalleId}`, {'user': gmail})
    }
    
    newTurnos(values){
        return this.instance.post("", values)
    }

    newDetalle(id, values){
        return this.instance.post(`/${id}/detalles`, values)
    }

    deleteTurno(id){
        return this.instance.delete(`/${id}`)
    }
}

export default useTurnos;