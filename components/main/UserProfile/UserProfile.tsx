import {
  faCode,
  faCodeBranch,
  faLanguage,
  faStar,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RepositoryOwned } from "models/Repository";
import User from "models/User";
import React from "react";
import { Card, CardBody, CardFooter } from "reactstrap";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import "./UserProfile.scss";

interface UserProfileProps {
  user: User;
  repos: RepositoryOwned[];
  backgroundPictureSeed?: string;
}

function UserProfile(props: UserProfileProps) {
  const { user, repos } = props;
  const backgroundPictureSeed =
    props.backgroundPictureSeed || new Date().getMilliseconds.toString();
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
        <img
          alt="background"
          src={`https://picsum.photos/seed/${backgroundPictureSeed}/800/130`}
        />
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
        <p className="card-category text-center">{user.bio}</p>
      </CardBody>
      <CardFooter>
        <hr />
        <div className="figures">
          <div>
            <div>
              <FontAwesomeIcon icon={faUsers} />
              <span className="followers">{user.followers}</span>
            </div>
            <p>Followers</p>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faLanguage} />
              <span className="languages">{languages.length}</span>
            </div>
            <p>Main languages</p>
            <InfoTooltip>
              Number of distinct primary languages in the 100 latest public
              repositories owned by the user, excluding forked repositories.
            </InfoTooltip>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faCode} />
              <span className="repos">{user.repos}</span>
            </div>
            <p>Public Repos</p>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faStar} />
              <span className="stars">{totalStars}</span>
            </div>
            <p>Total Stars</p>
            <InfoTooltip>
              Total number of stars in the 100 latest public repositories owned
              by the user, excluding forked repositories.
            </InfoTooltip>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faCodeBranch} />
              <span className="forks">{totalForks}</span>
            </div>
            <p>Total Forks</p>
            <InfoTooltip>
              Total number of forks in the 100 latest public repositories owned
              by the user, excluding forked repositories.
            </InfoTooltip>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default UserProfile;
