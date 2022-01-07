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
  backgroundPictureSeed?: string;
}

export const UserProfile: FC<UserProfileProps> = ({
  user,
  repos,
  backgroundPictureSeed = new Date().getMilliseconds.toString()
}) => {
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
      <div
        className={"image " + styles.image}
        style={{
          backgroundImage: `url('https://picsum.photos/seed/${backgroundPictureSeed}/800/130')`
        }}
      ></div>
      <CardBody>
        <div className="author">
          <img
            alt="profile_picture"
            className="avatar border-gray"
            src={user.avatarUrl}
          />
          <h1 className={styles.fullname}>{user.name}</h1>
          <a className={styles.username} href={user.profileUrl}>
            @{user.username}
          </a>
          <p className={styles.company}>{user.company}</p>
          <p className={styles.location}>{user.location}</p>
          <a className={styles.website} href={userWebsite}>
            {user.website}
          </a>
        </div>
        <p className="card-description text-center">{user.bio}</p>
      </CardBody>
      <CardFooter>
        <hr />
        <div className={styles.figures}>
          <div>
            <div>
              <FontAwesomeIcon icon={faUsers} />
              <span className={styles.followers}>{user.followers}</span>
            </div>
            <p>Followers</p>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faLanguage} />
              <span className={styles.languages}>{languages.length}</span>
            </div>
            <p>Main languages</p>
            <InfoTooltip>
              Number of distinct primary languages in the 100 latest public repositories
              owned by the user, excluding forked repositories.
            </InfoTooltip>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faCode} />
              <span className={styles.repos}>{user.repos}</span>
            </div>
            <p>Public Repos</p>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faStar} />
              <span className={styles.stars}>{totalStars}</span>
            </div>
            <p>Total Stars</p>
            <InfoTooltip>
              Total number of stars in the 100 latest public repositories owned by the
              user, excluding forked repositories.
            </InfoTooltip>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faCodeBranch} />
              <span className={styles.forks}>{totalForks}</span>
            </div>
            <p>Total Forks</p>
            <InfoTooltip>
              Total number of forks in the 100 latest public repositories owned by the
              user, excluding forked repositories.
            </InfoTooltip>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
