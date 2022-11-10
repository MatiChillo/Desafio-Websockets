const router = require('express').Router();

const cont = require('../storage/productos');

router.get('/api/products', async (_req, res, next) => {

    try {

        const allProducts = await cont.getAll();
        
        res.status(200).send( allProducts );

    } catch (error) {
        
        next( error );

    }

});


router.get('/api/products/:id', async (req, res, next) => {

    try {

        const id = req.params.id;

        const oneProduct = await cont.getById( id );

        if ( oneProduct ) {

            res.status(200).send( oneProduct );
            
        } else {

            res.status(500).json({

                success: false,
                error: "producto no encontrado"

            });

        }
        

    } catch (error) {
        
        next( error );

    }

});

router.post('/api/products', async (req, res, next) => {

    try {

        const product = req.body;

        const saveProduct = await cont.save( product );
        
        res.status(200).json( { saveProduct } );

    } catch (error) {
        
        next( error );

    }

});


router.put('/api/products/:id', async (req, res, next) => {

    try {

        const id = req.params.id;
        
        const change = req.body;

        const updating = await cont.putById( id, change );

        if ( updating ) {

            res.status(200).json({

                update: updating
    
            });
           
        } else {

            res.status(500).json({

                success: false,
                error: "producto no encontrado"

            });

        }        

    } catch (error) {
        
        next( error );

    }

});

router.delete('/api/products/:id', async (req, res, next) => {

    try {
        
        const id = req.params.id;

        const deleteProduct = await cont.deleteById( id );

        if ( deleteProduct ) {

            res.status(200).json({

                products: deleteProduct
    
            });

        } else {

            res.status(500).json({

                success: false,
                error: "producto no encontrado"

            });

        }

       

    } catch (error) {
        
        next( error );

    }

});

router.get('/', async (_req, res, next) => {

    try {

        res.render('formulario', { products: await cont.getAll() });

    } catch (error) {
        
        next( error );

    }

});

// router.post('/productos', async (req, res, next) => {

//     try {

//         const { name, price, photo } = req.body;
  
//         await cont.save( { name, price, photo } );
    
//         res.redirect('/');

//     } catch (error) {
        
//         next( error );

//     }

// });

router.get('/productos', async (_req, res, next) => {

    try {

        res.render( 'productos', { products: await cont.getAll() } );

    } catch (error) {
        
        next( error );

    }

});


module.exports = router;