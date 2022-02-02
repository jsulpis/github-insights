<h1 align="center">GitHub Insights</h1>
<h3 align="center">Insights into a GitHub profile</h3>
<p align="center">
  <a href="https://github.com/jsulpis/github-insights/actions/workflows/build.yml">
    <img alt="CI" src="https://github.com/jsulpis/github-insights/actions/workflows/build.yml/badge.svg" />
  </a>
  <a href="https://sonarcloud.io/dashboard?id=github-stats">
		<img alt="Quality Gate Status" src="https://sonarcloud.io/api/project_badges/measure?project=github-stats&metric=alert_status" />
	</a>
  <a href="https://sonarcloud.io/dashboard?id=github-stats">
		<img alt="Coverage" src="https://sonarcloud.io/api/project_badges/measure?project=github-stats&metric=coverage" />
	</a>
  <a href="http://makeapullrequest.com">
		<img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
	</a>
</p>

<a align="center" href="https://github-insights.vercel.app">
  <img class="repo-preview" src="https://raw.githubusercontent.com/jsulpis/github-insights/master/preview.png" alt="Screenshot of the application"/>
</a>

## Installation

Clone the repository and install the dependencies:

```shell
git clone https://github.com/jsulpis/github-insights.git && cd github-insights && npm i
```

## Usage

### Setup

You will need a GitHub OAuth token to query the GraphQL endpoint. See the [documentation](https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql) for more details. Then put your token in the GITHUB_API_TOKEN variable in a .env file.

### Development

Serve with hot reload at localhost:3000

```
npm run dev
```

### Build

Build for production: next.js automatically generates a mix of static HTML pages when possible, and lambda functions for server-side rendered pages. This is supported out-of-the-box by Vercel.

```
npm run build
```

Serve the production build with SSR:

```
npm start
```

See package.json for other scripts.

## License

Released under the [MIT](https://github.com/jsulpis/github-insights/blob/master/LICENSE) license.
