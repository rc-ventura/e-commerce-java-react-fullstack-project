package com.ufsc.file.upload.util.DTO;




public record UserDTO (String fullName, String login, String password) {

    // private String nome;
    // private String login;

    // public UserDTO convert(User user) {
    //     BeanUtils.copyProperties(user, this, "id", "password");
    //     return this;

    // }

    // public List<UserDTO> convertList(List<User> listUser) {
    //     UserDTO userDTO = new UserDTO();
    //     List<UserDTO> userDTOList = new ArrayList<>();
    //     listUser.forEach((user -> {
    //         userDTOList.add(userDTO.convert(user));
    //     }));
    //     return userDTOList;
    // }
    
}
