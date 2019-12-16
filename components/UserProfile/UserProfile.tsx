import Repository from "models/Repository";
import User from "models/User";
import React from "react";
import { Card, CardBody, CardFooter } from "reactstrap";
import "./UserProfile.scss";

interface UserProfileProps {
  user: User;
  repos: Repository[];
}

function UserProfile(props: UserProfileProps) {
  const user = props.user;
  const repos = props.repos;
  const totalStars = repos.reduce((acc, current) => acc + current.stars, 0);
  const totalForks = repos.reduce((acc, current) => acc + current.forks, 0);
  const languages = repos
    .map(repo => repo.language)
    .filter(language => !!language)
    .reduce((acc: string[], lang) => {
      if (!acc.includes(lang)) {
        acc.push(lang);
      }
      return acc;
    }, []);

  return (
    <Card className="card-user">
      <div className="image">
        <img alt="background" src="https://picsum.photos/900" />
      </div>
      <CardBody>
        <div className="author">
          <img
            alt="profile_picture"
            className="avatar border-gray"
            src={user.avatarUrl}
          />
          <h5 className="fullname">{user.name}</h5>
          <a className="username" href={user.profileUrl}>
            @{user.username}
          </a>
          <a
            className="company"
            href={"https://github.com/" + user.company.slice(1)}
          >
            {user.company}
          </a>
          <p className="location">{user.location}</p>
          <a className="website" href={user.website}>
            {user.website}
          </a>
        </div>
        <p className="description text-center">{user.bio}</p>
      </CardBody>
      <CardFooter>
        <hr />
        <div className="figures">
          <span className="followers">{user.followers} Followers</span>
          <span className="repos">{repos.length} Repos</span>
          <span className="stars">{totalStars} Total Stars</span>
          <span className="forks">{totalForks} Total Forks</span>
          <span className="languages">{languages.length} Languages</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default UserProfile;
