package com.ufsc.file.upload.util.DTO;

import com.ufsc.file.upload.models.Role;

public record UserRegisterDTO (String login, String password, Role role) {

}
