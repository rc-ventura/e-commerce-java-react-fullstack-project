
package com.ufsc.file.upload.services;

import org.springframework.core.io.Resource;

/**
 *
 * @author RC_Ventura
 * 
 */
public interface FileDownloadService {
    
      public Resource getFileAsResource(String fileCode);

    
}
