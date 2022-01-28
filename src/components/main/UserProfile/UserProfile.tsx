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
import { FC } from "react";
import { Card, CardBody, CardFooter } from "reactstrap";
import { InfoTooltip } from "../InfoTooltip/InfoTooltip";
import styles from "./UserProfile.module.scss";

interface UserProfileProps {
  user: User;
  repos: RepositoryOwned[];
}

export const UserProfile: FC<UserProfileProps> = ({ user = {}, repos = [] }) => {
  const backgroundPictureSeed = user.username + new Date().getMinutes().toString();
  const totalStars = repos.reduce((acc, current) => acc + (current.starCount || 0), 0);
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
    <Card className={"card-user " + styles.profile}>
      <img
        className={"image " + styles.image}
        src={`https://picsum.photos/seed/${backgroundPictureSeed}/800/130`}
      ></img>
      <CardBody>
        <div className="author">
          <img alt="profile picture" className="avatar border-gray" src={user.avatarUrl} />
          <h1 aria-label="full name" className={styles.fullname}>
            {user.name}
          </h1>
          <a aria-label="github profile" className={styles.username} href={user.profileUrl}>
            @{user.username}
          </a>
          <p aria-label="company" className={styles.company}>
            {user.company}
          </p>
          <p aria-label="location" className={styles.location}>
            {user.location}
          </p>
          {user.website && (
            <a aria-label="website" className={styles.website} href={userWebsite}>
              {user.website}
            </a>
          )}
        </div>
        <p aria-label="description" className="card-description text-center">
          {user.bio}
        </p>
      </CardBody>
      <CardFooter>
        <hr />
        <div className={styles.figures}>
          <div>
            <div>
              <FontAwesomeIcon icon={faUsers} />
              <span aria-labelledby="followers" className={styles.followers}>
                {user.followers}
              </span>
            </div>
            <p id="followers">Followers</p>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faLanguage} />
              <span aria-labelledby="languages" className={styles.languages}>
                {languages.length}
              </span>
            </div>
            <p id="languages">Main languages</p>
            <InfoTooltip id="languages">
              Number of distinct primary languages in the 100 latest public repositories owned by
              the user, excluding forked repositories.
            </InfoTooltip>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faCode} />
              <span aria-labelledby="public-repos" className={styles.repos}>
                {user.repos}
              </span>
            </div>
            <p id="public-repos">Public Repos</p>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faStar} />
              <span aria-labelledby="total-stars" className={styles.stars}>
                {totalStars}
              </span>
            </div>
            <p id="total-stars">Total Stars</p>
            <InfoTooltip id="stars">
              Total number of stars in the 100 latest public repositories owned by the user,
              excluding forked repositories.
            </InfoTooltip>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faCodeBranch} />
              <span aria-labelledby="total-forks" className={styles.forks}>
                {totalForks}
              </span>
            </div>
            <p id="total-forks">Total Forks</p>
            <InfoTooltip id="forks">
              Total number of forks in the 100 latest public repositories owned by the user,
              excluding forked repositories.
            </InfoTooltip>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
