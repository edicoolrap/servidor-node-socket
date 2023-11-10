const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');


const bands = new Bands();
bands.addBand(new Band('La Etnnia'));
bands.addBand(new Band('Tres Coronas'));
bands.addBand(new Band('Gotas de Rap'));
bands.addBand(new Band('Estilo Bajo'));

//Mensajes de Sockets
io.on('connection', client => {
    client.emit('active-bands', bands.getBands());

    console.log('Cliente Conectado')
    client.on('disconnect', () => { 
        console.log('Cliente Desconectado'); 
    });
  
    client.on('mensaje', (payload) => {
        console.log('Todo en orden', payload);
        io.emit('mensaje', {admin: 'Bienvenido al Servidor Web'});
    });

    client.on('vote-band', (payload) => {
       bands.voteBand(payload.id);
       io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name)
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
     });

     client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
     });

});