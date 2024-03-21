# volto-favboard

[![Releases](https://img.shields.io/github/v/release/eea/volto-favboard)](https://github.com/eea/volto-favboard/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-favboard%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-favboard/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-favboard-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-favboard-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-favboard-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-favboard-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-favboard-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-favboard-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-favboard-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-favboard-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-favboard%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-favboard/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-favboard-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-favboard-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-favboard-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-favboard-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-favboard-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-favboard-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-favboard-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-favboard-develop)


[Volto](https://github.com/plone/volto) add-on

## Features

![favboards](https://github.com/eea/volto-favboard/assets/20109479/4ecb805c-c1c7-4ea0-a4f4-826ddb35de31)


## Getting started

### Try volto-favboard with Docker

      git clone https://github.com/eea/volto-favboard.git
      cd volto-favboard
      make
      make start

Go to http://localhost:3000

### Add volto-favboard to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-favboard"
   ],

   "dependencies": {
       "@eeacms/volto-favboard": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-favboard
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-favboard/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-favboard/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-favboard/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
 (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-addon-template/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
