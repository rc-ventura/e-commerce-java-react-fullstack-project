
package com.ufsc.file.upload.models;

import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;


/**
 *
 * @author RC_Ventura
 */
@Entity
public class FileStorage  {

  @Id
  @GeneratedValue (strategy = GenerationType.UUID )
  private String id;
  
  private String name; 
  private String type;
  
  @Lob
  private byte []data;
 
  private Long size;

  
  //relacionamentos
 @OneToOne(mappedBy = "fileStorage" , cascade = CascadeType.REMOVE )
 private Produto produto;

  public FileStorage() {}
  
  public FileStorage( String id , String name, String type, byte[] data, Long size) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.data = data;
        this.size = size;
    }
  
  

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    
    
    
    @Override
    public int hashCode() {
        int hash = 7;
        hash = 31 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final FileStorage other = (FileStorage) obj;
        return Objects.equals(this.id, other.id);
    }

    
    
  
  
  
    
}
