
package com.ufsc.file.upload.exceptions;

/**
 *
 * @author RC_Ventura
 */
public class EntityNotFoundException extends RuntimeException {
    
    public EntityNotFoundException (Long id) {
        super( "could not found the entity with id" + " " + id );
    }


    
}
