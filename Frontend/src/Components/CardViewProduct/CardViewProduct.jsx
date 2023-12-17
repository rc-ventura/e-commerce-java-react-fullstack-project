import Card from 'react-bootstrap/Card';

function CardViewProduct({product}) {
  
  const noImage = `/no-image-resize.jpeg`
  
  
  return (
    <Card className='mx-auto mb-2' style={{ width: 'auto' }}>      
        
      <Card.Body>
      
      <Card.Img 
       variant="top" 
       style={{maxWidth: '60%', height: 'auto'}}

       src={product.fileStorage ?
       (`data:${product.fileStorage.type};base64,
       ${product.fileStorage.data}`) : (noImage)} 
          alt='image product'
           />
       
        <ul className='list-group list-group-flush'>
                                    <hr></hr>
                                    <li className='list-group-item  mb-2'>
                                        <b className='bold-text'>Id:</b>
                                         {product.id}
                                    </li>

                                    <li className='list-group-item mb-2'>
                                        <b className='bold-text'>Name:</b>
                                        {product.nome}
                                    </li>

                                    <li className='list-group-item mb-2'>
                                        <b className='bold-text'>Price:</b>
                                         ${product.preco} 
                                    </li>

                                    <li className='list-group-item mb-2'>
                                        <b className='bold-text'>Quantity:</b>
                                         {product.qtd} 
                                    </li>

                                    <li className='list-group-item mb-2'>
                                        <b className='bold-text'>Categoria:</b>
                                         {product.categoria.nome} 
                                    </li>
                                </ul>
      </Card.Body>
    </Card>
    
  );
}

export default CardViewProduct;