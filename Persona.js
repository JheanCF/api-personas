class Persona {
    constructor(idpersona,nombres ,apellidos ,cedula ,correo ,edad ,genero ,ciudad , pais ,cursos ,telefono ,fecha_registro ) {
        this.idpersona = idpersona;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.cedula = cedula;
        this.correo = correo;
        this.edad = edad;
        this.genero = genero;
        this.ciudad = ciudad;
        this.pais = pais;
        this.cursos = cursos;
        this.telefono = telefono;
        this.fecha_registro = fecha_registro;
    }
}

module.exports = Persona;
