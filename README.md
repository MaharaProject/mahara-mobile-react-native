# Mahara Mobile

Mahara Mobile is built using TypeScript, Redux, LinguiJS, and React/React Native.
It uses Metro, the JavaScript bundler for React Native to join the code and all its dependencies together.

**For community contributions head over to <https://github.com/MaharaProject/mahara-mobile-react-native/>**

## Setup

This project uses React Native. For first time set up, inside the `/MaharaMobile` folder, run:

 ```bash
 npm install && npm start
 ```

To start project run the below. You will additionally need a device (real or virtual), and run either the Android or iOS commands below to view the app. Note you will also need an Apple device to do iOS testing and deployment.

To generate and run Android:

```bash
npm run android
```

To generate and run iOS:

```bash
npm run ios
```

## Translations

We are using linguiJS for translation <https://lingui.js.org/>

Follow documentation on how to wrap strings so they get picked up then run:

```bash
# update catalog
npm run extract
# update translations
npm run compile # then refresh environment

To extract the strings into a PO file under /locales.
```

## Troubleshooting

See [GitLab Wiki page](https://gitlab.wgtn.cat-it.co.nz/elearning/mahara-mobile-react-native/-/wikis/home) for some specific troubleshooting team members might have run into.

## Architecture

Source files are in /src

/actions -- actions for Redux (interaction with store) and all API calls

/assets -- fonts, images, etc

/components -- generally try to keep components for display, and pass through logic via props from container (screen) -> component, with only some exceptions

/models -- typescript models, for typing custom objects/parts

/navigations -- for specifying navigation for the app

/reducers -- for receiving actions to update state, separated by function

/screens -- screens/pages for the app - these contain the bulk of the logic and in lieu of routes

/store -- where the store (global state) is configured

/utils -- reusable helpers

## Copyright notice

Copyright (C) 2019-2021 Catalyst IT and others; see:
<https://wiki.mahara.org/wiki/Contributors>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3 or later of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

Additional permission under GNU GPL version 3 section 7:

If you modify this program, or any covered work, by linking or
combining it with the OpenSSL project's OpenSSL library (or a
modified version of that library), containing parts covered by the
terms of the OpenSSL or SSLeay licenses, the Mahara copyright holders
grant you additional permission to convey the resulting work.
