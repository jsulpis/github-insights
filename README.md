<h1 align="center">GitHub Insights</h1>
<h3 align="center">Insights into a GitHub profile</h3>
<p align="center">
	<a href="https://travis-ci.org/jsulpis/github-insights">
		<img alt="Build Status" src="https://travis-ci.org/jsulpis/github-insights.svg?branch=master" />
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
  <img class="repo-preview" src="https://raw.githubusercontent.com/jsulpis/github-insights/master/preview.png" alt="Screenshot image"/>
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

Serve with hot reload at localhost:3000.

```
npm run dev
```

### Build

Build for production: next.js automatically renders static HTML pages when possible. Then if you deploy on Zeit Now you can have both statically rendered pages and server-side rendered pages (as lambdas functions).

```
npm run build
```

Launch a server for server-side rendering (after building the application):

```
npm start
```

Generate a fully static project with pre-rendered pages to put directly on a server or any static website hosting platform. Note that you lose the possibility to have server-side rendered pages. With Zeit Now you should not have to run this command.

```
npm run export
```

## License

Released under the [MIT](https://github.com/jsulpis/github-insights/blob/master/LICENSE) license.
