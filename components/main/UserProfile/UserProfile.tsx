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
  const totalStars = repos.reduce(
    (acc, current) => acc + (current.starCount || 0),
    0
  );
  const totalForks = repos.reduce((acc, current) => acc + current.forkCount, 0);
  const languages = repos
    .map(repo => (repo.primaryLanguage ? repo.primaryLanguage.name : null))
    .filter(language => !!language)
    .reduce((acc: string[], lang) => {
      if (!acc.includes(lang)) {
        acc.push(lang);
      }
      return acc;
    }, []);
  let userWebsite = user.website;
  if (!!userWebsite && !userWebsite.startsWith("http")) {
    userWebsite = "https://" + userWebsite;
  }

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
          <h1 className="fullname">{user.name}</h1>
          <a className="username" href={user.profileUrl}>
            @{user.username}
          </a>
          <p className="company">{user.company}</p>
          <p className="location">{user.location}</p>
          <a className="website" href={userWebsite}>
            {user.website}
          </a>
        </div>
        <p className="card-category description text-center">{user.bio}</p>
        {user.repos > 100 && (
          <p className="message-many-repos text-warning">
            <strong>Note:</strong> Only the latest 100 repos were used for the
            following stats.
          </p>
        )}
      </CardBody>
      <CardFooter>
        <hr />
        <div className="figures">
          <div>
            <div>
              <i className="fas fa-users" />
              <span className="followers">{user.followers}</span>
            </div>
            <p>Followers</p>
          </div>
          <div>
            <div>
              <i className="fas fa-language" />
              <span className="languages">{languages.length}</span>
            </div>
            <p>Main languages</p>
          </div>
          <div>
            <div>
              <i className="fas fa-code" />
              <span className="repos">{user.repos}</span>
            </div>
            <p>Repos</p>
          </div>
          <div>
            <div>
              <i className="fas fa-star" />
              <span className="stars">{totalStars}</span>
            </div>
            <p>Total Stars</p>
          </div>
          <div>
            <div>
              <i className="fas fa-code-branch" />
              <span className="forks">{totalForks}</span>
            </div>
            <p>Total Forks</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default UserProfile;
