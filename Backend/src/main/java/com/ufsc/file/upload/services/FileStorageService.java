
package com.ufsc.file.upload.services;

import com.ufsc.file.upload.models.FileStorage;
import java.util.stream.Stream;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author RC_Ventura
 * 
 */

public interface FileStorageService {

  // public  String deleteById(String id);
    
   public void init();
    
  
    
  // public Resource loadAsResource (String filename);
   
   //public Path load(String filename);

   //public Stream<Path> loadAll();
   
    public void deleteAll();
   
    public FileStorage store( MultipartFile multipartFile);
   
     public FileStorage update(String id, MultipartFile multipartFile) ;
		
     
     public String deleteById(String id) ;
           
public Stream <FileStorage> listUploadedFilesAll() ;	
		
	

	public FileStorage findById(String id) ;		
		
   
   
    
    
}
