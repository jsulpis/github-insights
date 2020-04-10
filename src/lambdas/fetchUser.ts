import httpGet from "lib/httpGet";
import User from "models/User";
import UserDTO from "./dto/UserDTO";

export default function fetchUser(username: string): Promise<User> {
  const headers = {
    Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`
  };
  return httpGet(`https://api.github.com/users/${username}`, headers)
    .then(payload => new UserDTO(payload))
    .then((userDto: UserDTO) => userDto.toModel());
}
