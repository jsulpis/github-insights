import httpGet from "lib/httpGet";
import User from "models/User";
import UserDTO from "./dto/UserDTO";

export default function fetchUser(username: string): Promise<User> {
  return httpGet(`https://api.github.com/users/${username}`)
    .then(payload => new UserDTO(payload))
    .then((userDto: UserDTO) => userDto.toModel());
}
