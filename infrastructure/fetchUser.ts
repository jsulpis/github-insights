import httpGet from "lib/httpGet";
import User from "models/User";
import { UserDTO } from "./UserDTO";

export default function fetchUser(): Promise<User> {
  return httpGet("https://api.github.com/users/jsulpis").then(
    (userDto: UserDTO) => userDto.toModel()
  );
}
