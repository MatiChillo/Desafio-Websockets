const fs = require('fs');

class Contenedor {

    constructor ( archivo ) {

        this.archivo = archivo;

    }

    async save( object ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            dataToJson.push( object );

            await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( dataToJson, null, 2 ) );

            return object;
            
        } catch (error) {

            console.log(error);
            
        }

    }

    async getAll() {

        let array = [];

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            dataToJson.forEach(element => {
                
                array.push( element );

            });

            return array;
            
        } catch (error) {
            
            console.log(error);

        }

    }

}

const contMessage = new Contenedor( './src/storage/mensajes.txt' );

//cont.save( { 'tittle': 'Libro', 'price': 500, 'thumbnail': 'https://asd.com/2.png' } );

//cont.getById( 3 );

//cont.getAll();

//cont.deleteById( 2 );

//cont.deleteAll();

module.exports = contMessage;