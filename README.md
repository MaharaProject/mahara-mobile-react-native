# Mahara Mobile

Mahara Mobile is built using TypeScript, Redux, LinguiJS, and React/React Native.
It uses Metro, the JavaScript bundler for React Native to join the code and all its dependencies together.

Our **main codebase** lives at [git.mahara.org](https://git.mahara.org/mahara-mobile/mahara-mobile-react-native)

## Developer area

Please see our [wiki](https://git.mahara.org/mahara-mobile/mahara-mobile-react-native/-/wikis/home) for information about our updates, contributing, translating, testing, and more.

## Translations

We are using [linguiJS](https://lingui.js.org) for translation.

Follow the instructions in our wiki for [steps on how to add translations](https://git.mahara.org/mahara-mobile/mahara-mobile-react-native/-/wikis/Translation-strings) to the app.

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
