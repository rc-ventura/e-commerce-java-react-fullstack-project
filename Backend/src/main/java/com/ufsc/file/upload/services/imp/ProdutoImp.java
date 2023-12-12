package com.ufsc.file.upload.services.imp;

import com.ufsc.file.upload.exceptions.EntityNotFoundException;
import com.ufsc.file.upload.models.FileStorage;
import com.ufsc.file.upload.models.Produto;
import com.ufsc.file.upload.repositories.FileStorageRepository;
import com.ufsc.file.upload.repositories.ProdutoRepository;
import java.util.List;
import java.util.NoSuchElementException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProdutoImp {
	
	@Autowired
	private ProdutoRepository produtoRepository; 
	
        @Autowired
        private FileStorageRepository fileStorageRepository;
	
        
	public Produto update(Long id, Produto produto) {
		try{
                    Produto produtoEntity = produtoRepository.getReferenceById(id);
        
		
		produtoEntity.setNome(produto.getNome());
		produtoEntity.setPreco(produto.getPreco());
		produtoEntity.setQtd(produto.getQtd());
        produtoEntity.setFileStorage(produto.getFileStorage());
        produtoEntity.setCategoria(produto.getCategoria());
        
		
		return produtoRepository.save(produtoEntity);		
	}catch (Exception e){
            throw new EntityNotFoundException(id);
        }
        }

	
	
	public void deleteById(Long id) {
            if(!produtoRepository.existsById(id)){
            throw new EntityNotFoundException(id);
        }
            produtoRepository.deleteById(id);
	}
	
	
        
	public Produto save(Produto produto) {
		return produtoRepository.save(produto);
	}
	
	public List<Produto> findAll(){
		return produtoRepository.findAll();
	}

	public Produto findById(Long id) {		
		try {
			return produtoRepository.findById(id).get();
		} catch(NoSuchElementException e) {
			throw new EntityNotFoundException(id);
		}
	}

    public Produto removeFiles(Long id_produto, String id_file) {
         
         Produto produto = produtoRepository.findById(id_produto).get();
         FileStorage fileStorage = fileStorageRepository.findById(id_file).get();
         
         produto.setFileStorage(fileStorage);
         produtoRepository.save(produto);
         return produto;
     }

    public Produto addFiles(Long id_produto, String id_file) {
       
        Produto produto = produtoRepository.findById(id_produto).get();
         FileStorage fileStorage = fileStorageRepository.findById(id_file).get();
      
         produto.setFileStorage(fileStorage);
         produtoRepository.save(produto);
         return produto;
        

}

    }
    

    
    