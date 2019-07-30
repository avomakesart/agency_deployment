const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    })
 }

 exports.agregarTestimonial = async (req, res) => {
    // validar campos
    let {nombre, correo, mensaje} = req.body;

    let errores = [];
    if (!nombre) {
        errores.push({'mensaje' : 'Agrega tu Nombre'})
    }
    if (!correo) {
        errores.push({'correo' : 'Agrega un Correo Electrónico'})
    }
    if (!mensaje) {
        errores.push({'mensaje' : 'Agrega un Mensaje'})
    }

    // revisar por errores
    if (errores.length > 0) {
        // muestra la vista de errores
         const testimoniales = await Testimonial.findAll()
         res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
        })   
    } else {
        // almacena en la BD
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error));
    }
    
}