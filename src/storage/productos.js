const fs = require('fs');

class Contenedor {

    constructor ( archivo ) {

        this.archivo = archivo;

    }

    async save( object ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            let lastId;

            if ( dataToJson != "" ) {

                lastId = dataToJson[ dataToJson.length - 1 ].id;

            } else { 

                lastId = 0;

            }

            object.id = lastId + 1;

            dataToJson.push( object );

            await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( dataToJson, null, 2 ) );

            return object;
            
        } catch (error) {

            console.log(error);
            
        }

    }

    async getById( id ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            const objectToFind = dataToJson.find(element => {
    
                return element.id == id;
              
            });

            if ( objectToFind != undefined ) {

                return objectToFind;

            } else {

                return null;

            }
            
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

    async putById( id, change ) {

        let data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

        data = JSON.parse( data );

        let product = await cont.getById( id );

        if ( product ) {

            product = {

                ...product,
                ...change

            };

            data = data.map( prod => {

                if ( prod.id == product.id ) {

                    prod = product;

                }

                return prod;

            });

            data = JSON.stringify( data, null, 2 );

            await fs.promises.writeFile( `./${this.archivo}`, data );

            return product;

        } else {

            return null;
        
        }



    }

    async deleteById( id ) {

        const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

        const dataToJson = JSON.parse( data );

        let product = dataToJson.find( prod => prod.id == id );

        if ( product ) {

            const objectToFind = dataToJson.filter(element => 
        
                element.id != id
                
            );

            await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( objectToFind, null, 2 ) );

            return objectToFind;

        } else {

            return null;

        }      

    }

    async deleteAll() {

        await fs.promises.writeFile( `./${this.archivo}`, "[]" );

    }

}

const cont = new Contenedor( './src/storage/productos.txt' );

//cont.save( { 'tittle': 'Libro', 'price': 500, 'thumbnail': 'https://asd.com/2.png' } );

//cont.getById( 3 );

//cont.getAll();

//cont.deleteById( 2 );

//cont.deleteAll();

module.exports = cont;